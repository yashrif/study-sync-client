"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormHandle } from "@/app/dashboard/types/form-handle";
import { Form } from "@/components/ui/form";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Choices, McqIntermediate, QuizActionType } from "@/types";
import Mcq from "./components/Mcq";

const McqsList = forwardRef<
  FormHandle,
  React.FormHTMLAttributes<HTMLFormElement>
>((_, ref) => {
  const {
    state: {
      quiz: { mcqs: data },
    },
    dispatch,
  } = useQuizContext();

  const mcqs = data?.slice(0, 3);
  McqsList.displayName = "List of MCQs";

  const formRef = useRef<HTMLFormElement>(null);
  useImperativeHandle(ref, () => ({
    submit: () => {
      if (formRef.current) formRef.current.requestSubmit();
    },
    clear: () => {
      if (formRef.current) formRef.current.reset();
      dispatch({
        type: QuizActionType.SET_IS_SHOW_RESULTS,
        payload: false,
      });

      form.reset(initialState(mcqs || []));
    },
  }));

  const FormSchema = generateFormSchema(mcqs || []);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    let points = 0;

    mcqs?.forEach((mcq) => {
      if (mcq.answers[Choices[data[mcq.id] as keyof typeof Choices]]) points++;
    });

    dispatch({
      type: QuizActionType.SET_POINTS,
      payload: points,
    });
    dispatch({
      type: QuizActionType.SET_IS_SHOW_RESULTS,
      payload: true,
    });
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-16"
      >
        {mcqs?.map((mcq, index) => (
          <Mcq key={mcq.id} mcq={mcq} form={form} order={index + 1} />
        ))}
      </form>
    </Form>
  );
});

export default McqsList;

const initialState = (mcqs: McqIntermediate[]) => ({
  ...mcqs.reduce((acc: { [key: string]: any }, mcq) => {
    acc[mcq.id] = "";
    return acc;
  }, {}),
});

const generateFormSchema = (data: McqIntermediate[]) => {
  let fields: { [x: string]: z.ZodEnum<[string, ...string[]]> } = {};

  data.forEach((mcq) => {
    fields[mcq.id] = z.enum(
      [...(Object.values(Choices) as [string, ...string[]])],
      {
        required_error: "You need to chose one option.",
      }
    );
  });

  return z.object(fields);
};
