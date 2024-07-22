"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/quiz";
import { links } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { QuizResponseServer, Status, UploadSimple } from "@/types";
import { postQuiz } from "@/utils/quizRequest";
import { fileIndexing } from "./fileIndexing";

const FormSchema = z.object({
  types: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: create.quizTypeError.empty,
  }),
});

type Props = {
  table: Table<UploadSimple>;
};

const CreateAction: React.FC<Props> = ({ table }) => {
  const { push } = useRouter();
  const [processStatus, setProcessStatus] = useState(Status.IDLE);
  const {
    state: { status, indexStatus, defaultQuizTypes, isShowCheckbox },
    dispatch,
  } = useQuizUploadsContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      types: defaultQuizTypes,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    let id: string | null = null;
    try {
      setProcessStatus(Status.PENDING);
      const uploads: UploadSimple[] = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);

      const ids: string[] = await Promise.all(
        uploads.map(async (upload) => {
          if (!upload.isIndexed) {
            await fileIndexing({
              data: upload,
              dispatch,
            });
          }
          return upload.id;
        }),
      );

      const response: QuizResponseServer = (
        await studySyncServer.post(serverEndpoints.quizzes, {
          ids,
          types: data.types,
        })
      ).data;

      await postQuiz({ ...response, title: uploads[0].title }).then((res) => {
        id = res.id;
      });
      setProcessStatus(Status.SUCCESS);
    } catch (e) {
      setProcessStatus(Status.ERROR);
    } finally {
      setTimeout(() => {
        if (id) push(links.dashboard.quiz.quizDetails(id).href);
        else setProcessStatus(Status.IDLE);
      }, 2000);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full flex ${isShowCheckbox ? "justify-between" : "justify-center"} items-center gap-16`}
      >
        {isShowCheckbox && (
          <FormField
            control={form.control}
            name="types"
            render={() => (
              <FormItem className="flex items-center gap-8">
                {create.quizType.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="types"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 !mt-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id,
                                      ),
                                    );
                              }}
                              className="size-4"
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-medium">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <IconButton
          title=""
          size="lg"
          className="size-12 p-0 rounded-full"
          Icon={IconArrowRight}
          iconClassName="!size-6 stroke-text-300 text-text-300"
          disabled={
            (table && table.getFilteredSelectedRowModel().rows.length === 0) ||
            Object.values(indexStatus).includes(Status.PENDING) ||
            processStatus === Status.PENDING ||
            status === Status.PENDING
          }
          status={
            Object.values(indexStatus).includes(Status.PENDING)
              ? Status.PENDING
              : processStatus
          }
          type="submit"
          showStatus
        />
      </form>
    </Form>
  );
};

export default CreateAction;
