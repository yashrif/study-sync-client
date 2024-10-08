"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight } from "@tabler/icons-react";
import { Table } from "@tanstack/react-table";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncServer from "@/api/studySyncServer";
import { serverEndpoints } from "@/assets/data/api";
import { create } from "@/assets/data/dashboard/quiz";
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
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import {
  QuizRequestDb,
  QuizRequestServer,
  QuizResponseServer,
  QuizTypes,
  QuizUploadsActionType,
  Status,
  UploadShallow,
} from "@/types";
import { fileIndexing } from "../../../uploads/fileIndexing";

const FormSchema = z.object({
  types: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: create.quizTypeError.empty,
  }),
});

type Props = {
  table: Table<UploadShallow>;
};

const CreateAction: React.FC<Props> = ({ table }) => {
  const {
    state: { status, indexStatus, defaultQuizTypes, isShowCheckbox },
    dispatch,
  } = useQuizUploadsContext();

  const { state, dispatch: serverDispatch } =
    useFetchState<QuizResponseServer>();
  const { handler } = useApiHandler<QuizRequestServer, QuizResponseServer>({
    apiCall: useCallback(
      (data) => studySyncServer.post(serverEndpoints.quizzes, data),
      []
    ),
    dispatch: serverDispatch,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (defaultQuizTypes) form.setValue("types", defaultQuizTypes);
  }, [defaultQuizTypes, form]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      dispatch({
        type: QuizUploadsActionType.SET_QUIZ,
        payload: {} as QuizRequestDb,
      });
      const uploads: UploadShallow[] = table
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
        })
      );

      const response = await handler({
        data: {
          ids,
          types: data.types as QuizTypes[],
        },
        fetchType: "lazy",
        isReset: true,
      });

      if (response)
        dispatch({
          type: QuizUploadsActionType.SET_QUIZ,
          payload: { ...response, title: uploads[0].title, uploads },
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`w-full flex ${isShowCheckbox ? "justify-between" : "justify-center"} gap-16`}
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
                          className="flex flex-row items-center space-x-3 space-y-0 !mt-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                              className="size-5 border-2"
                              disabled={state.status === Status.PENDING}
                            />
                          </FormControl>
                          <FormLabel className="font-normal text-medium text-lg text-primary">
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
          size="lg"
          className="size-12 p-0 rounded-full"
          Icon={IconArrowRight}
          iconClassName="!size-6 stroke-text-300 text-text-300"
          contentType="icon-only"
          disabled={
            (table && table.getFilteredSelectedRowModel().rows.length === 0) ||
            Object.values(indexStatus).includes(Status.PENDING) ||
            state.status === Status.PENDING ||
            status === Status.PENDING
          }
          status={
            Object.values(indexStatus).includes(Status.PENDING)
              ? Status.PENDING
              : state.status
          }
          type="submit"
        />
      </form>
    </Form>
  );
};

export default CreateAction;
