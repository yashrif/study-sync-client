"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import studySyncDB from "@/api/studySyncDB";
import { serverEndpoints } from "@/assets/data/api";
import { defaultValues, quizDetails } from "@/assets/data/dashboard/quiz";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Quiz } from "@/types";
import { IconChecks } from "@tabler/icons-react";
import Property from "../../_components/Property";

const FormSchema = z.object({
  title: z.string().max(60, {
    message: "Title must be more than 60 characters.",
  }),
});

const Title: React.FC = () => {
  const {
    state: { quiz },
    dispatch,
  } = useQuizContext();
  const { handler } = useApiHandler<{ title: string }, Quiz>({
    apiCall: useCallback(
      (data) =>
        studySyncDB.patch(`${serverEndpoints.quizzes}/${quiz.id}`, data),
      [quiz.id],
    ),
    dispatch,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: defaultValues.title,
    },
    values: {
      title: quiz.title,
    },
  });

  const {
    formState: { dirtyFields },
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      handler({ data });
      toast({
        title: "Updated Successfully",
        description: "Quiz title has been updated successfully.",
        duration: 5000,
      });
    } catch (e) {
      console.log(e);
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
              <FormLabel>
                <Property
                  title={quizDetails.preferences.fields.title.title}
                  Icon={quizDetails.preferences.fields.title.Icon}
                />
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
