"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { FormHandle } from "@/app/dashboard/types/form-handle";
import { Form } from "@/components/ui/form";
import { Choices, McqIntermediate } from "@/types";
import Mcq from "./components/Mcq";
import _, { set } from "lodash";

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

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  mcqs: McqIntermediate[];
  setPoints: Dispatch<SetStateAction<number | undefined>>;
};

const McqsList = forwardRef<FormHandle, Props>(
  ({ mcqs: data, setPoints }, ref) => {
    const mcqs = data.slice(0, 3);
    McqsList.displayName = "List of MCQs";

    const formRef = useRef<HTMLFormElement>(null);
    useImperativeHandle(ref, () => ({
      submit: () => {
        if (formRef.current) formRef.current.requestSubmit();
      },
      clear: () => {
        if (formRef.current) formRef.current.reset();
        setShowResults(false);
        setPoints(undefined);
        form.reset({});
      },
    }));

    const [showResults, setShowResults] = useState(false);

    const FormSchema = generateFormSchema(mcqs);
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
      let points = 0;

      mcqs.forEach((mcq) => {
        if (mcq.answers[Choices[data[mcq.id] as keyof typeof Choices]])
          points++;
      });

      setShowResults(true);
      setPoints(points);
    };

    console.log("MCQs: ", form.getValues());

    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          {mcqs.map((mcq, index) => (
            <Mcq
              key={mcq.id}
              mcq={mcq}
              form={form}
              order={index + 1}
              showResults={showResults}
            />
          ))}
        </form>
      </Form>
    );
  }
);

export default McqsList;
