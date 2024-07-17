import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useQuizContext } from "@/hooks/useQuizContext";
import { CqIntermediate, Status } from "@/types";
import { useMemo } from "react";

type Props = {
  cq: CqIntermediate;
  order: number;
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
};

const Cq: React.FC<Props> = ({ cq, order, form }) => {
  const {
    state: { cqEvaluation, status, isShowResults },
  } = useQuizContext();

  const result = useMemo(() => {
    return cqEvaluation[cq.id] || { correctness: 0, comment: "" };
  }, [cqEvaluation, cq.id]);

  return (
    <FormField
      control={form.control}
      name={cq.id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-6">
          <FormLabel className="grid grid-cols-[40px,1fr] gap-x-10 items-center">
            <div
              className={`size-10 flex items-center justify-center rounded-full ${form.formState.errors[cq.id] || result.correctness < 50 ? "ring-destructive" : "ring-primary"} ${result.correctness < 50 ? "bg-destructive" : ""} ring-2 ring-inset`}
            >
              <span
                className={`text-large ${form.formState.errors[cq.id] ? "text-destructive" : result.correctness >= 50 ? "text-primary" : "text-text-300"}  font-secondary font-semibold`}
              >
                {order}
              </span>
            </div>
            <h6 className="text-wrap">{cq.question}</h6>
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-[40px_1fr] gap-10 items-center !mt-0">
              <div />
              <Textarea
                placeholder={`Write the answer of the question no. ${order}`}
                className="resize-y text-base text-text placeholder:text-text-200"
                {...field}
              />
            </div>
          </FormControl>
          {isShowResults && status === Status.SUCCESS && (
            <FormDescription className="grid grid-cols-[40px_1fr] gap-10 items-center !mt-0">
              <div />
              <div className="flex flex-col gap-2">
                <p className="text-text-200 text-medium">
                  <span className="text-primary font-medium">
                    Correctness:{" "}
                  </span>
                  {result.correctness}
                </p>
                <p className="text-text-200 text-medium">
                  <span className="text-primary font-medium">Comment: </span>
                  {result.comment}
                </p>
              </div>
            </FormDescription>
          )}
        </FormItem>
      )}
    />
  );
};

export default Cq;
