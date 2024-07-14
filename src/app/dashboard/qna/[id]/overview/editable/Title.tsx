"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncDB from "@/api/studySyncDB";
import { defaultValues, qnaDetails } from "@/assets/data/dashboard/qna";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Qna } from "@/types";
import { IconChecks } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

const FormSchema = z.object({
  title: z.string().max(60, {
    message: "Title must be more than 60 characters.",
  }),
});

type Props = {
  data: Qna;
  setData: Dispatch<SetStateAction<Qna | undefined>>;
};

const Title: React.FC<Props> = ({ data: qna, setData }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: qna.title || defaultValues.title,
    },
  });

  const {
    formState: { dirtyFields },
    reset,
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await studySyncDB.patch(`/qnas/${qna.id}`, data);
      setData((prev) => ({ ...prev, ...data }) as Qna | undefined);
    } catch (e) {
      console.log(e);
    } finally {
      reset(data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex gap-16 justify-between items-center">
              <FormLabel className="flex gap-2 items-center text-secondary-200">
                <qnaDetails.preferences.fields.title.Icon className="size-[18px] stroke-[2.5]" />
                <span className="text-medium">
                  {qnaDetails.preferences.fields.title.title}
                </span>
              </FormLabel>
              <FormControl className="!m-0">
                <Input
                  variant="underline"
                  placeholder={defaultValues.title}
                  {...field}
                  className="text-medium text-text-200 capitalize border-none p-0 h-auto text-right font-normal placeholder:text-text-200/70 hover:shadow-[0_2px_1px_-1px_hsl(var(--primary))] focus-visible:shadow-[0_2px_1px_-1px_hsl(var(--primary))]"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {dirtyFields?.title && (
          <Button
            type="submit"
            variant={"outline"}
            size={"icon"}
            className="group absolute -right-[8px] p-0.5 translate-x-full top-2/4 -translate-y-2/4 size-auto border-none hover:bg-transparent"
          >
            <IconChecks className="size-5 group-hover:scale-[1.2] group-hover:text-secondary transition-all duration-300" />
          </Button>
        )}
      </form>
    </Form>
  );
};

export default Title;
