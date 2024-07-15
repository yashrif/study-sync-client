import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Choices, McqIntermediate } from "@/types";
import { RadioGroup } from "@components/ui/radio-group";
import { getKeyByValue } from "@utils/getKeyByValue";
import { CustomRadioGroupItem } from "./CustomRadioGroupItem";

type Props = {
  mcq: McqIntermediate;
  order: number;
  form: UseFormReturn<
    {
      [x: string]: string;
    },
    any,
    undefined
  >;
  showResults: boolean;
};

const Mcq: React.FC<Props> = ({ mcq, order, form, showResults }) => {
  return (
    <FormField
      key={mcq.id}
      control={form.control}
      name={mcq.id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-6">
          <FormLabel className="grid grid-cols-[40px,1fr] gap-x-10 items-center">
            <div className="size-10 flex items-center justify-center rounded-full ring-2 ring-primary ring-inset">
              <span className="text-large text-primary font-secondary font-semibold">
                {order}
              </span>
            </div>
            <h6 className="text-wrap">{mcq.question}</h6>
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-3"
            >
              {mcq.choices.map((choice, index) => (
                <FormItem
                  key={`${mcq.id}-${index}`}
                  className="flex gap-10 items-center"
                >
                  <FormControl>
                    <CustomRadioGroupItem
                      value={Object.values(Choices)[index].toString()}
                      answer={
                        getKeyByValue(
                          Choices,
                          mcq.answers
                            .map((answer, index) => (answer ? index : null))
                            .filter((x) => x !== null)[0]
                        ) || ""
                      }
                      showResult={showResults}
                    />
                  </FormControl>
                  <FormLabel className="text-base text-text-200">
                    {choice}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Mcq;
