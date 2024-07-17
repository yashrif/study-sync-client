import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CqIntermediate } from "@/types";

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
  return (
    <FormField
      control={form.control}
      name={cq.id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-6">
          <FormLabel className="grid grid-cols-[40px,1fr] gap-x-10 items-center">
            <div
              className={`size-10 flex items-center justify-center rounded-full ${form.formState.errors[cq.id] ? "ring-destructive" : "ring-primary"} ring-2 ring-inset`}
            >
              <span
                className={`text-large ${form.formState.errors[cq.id] ? "text-destructive" : "text-primary"} font-secondary font-semibold`}
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
        </FormItem>
      )}
    />
  );
};

export default Cq;
