import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Choices, McqIntermediate } from "@/types";
import { RadioGroup } from "@components/ui/radio-group";
import { getKeyByValue } from "@utils/getKeyByValue";
import { useMemo } from "react";
import { CustomRadioGroupItem } from "./CustomRadioGroupItem";

type Props = {
  mcq: McqIntermediate;
  order: number;
  form: UseFormReturn<
    {
      [x: string]: string | null | undefined;
    },
    any,
    undefined
  >;
  isDisabled?: boolean;
};

const Mcq: React.FC<Props> = ({ mcq, order, form, isDisabled }) => {
  const {
    state: { isShowResults },
  } = useQuizContext();

  const isCorrect = useMemo(
    () =>
      (
        getKeyByValue(
          Choices,
          mcq.answers
            .map((answer, index) => (answer ? index : null))
            .filter((x) => x !== null)[0]
        ) || ""
      ).localeCompare(form.getValues(mcq.id) as string) === 0,
    [form, mcq.answers, mcq.id]
  );

  return (
    <FormField
      key={mcq.id}
      control={form.control}
      name={mcq.id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-6">
          <FormLabel className="grid grid-cols-[40px,1fr] gap-x-10 items-center">
            <div
              className={`size-10 flex items-center justify-center rounded-full ${
                form.formState.errors[mcq.id]
                  ? "ring-destructive"
                  : isShowResults
                    ? isCorrect
                      ? "bg-success ring-success"
                      : form.getValues(mcq.id)
                        ? "bg-destructive ring-destructive"
                        : "ring-destructive"
                    : "ring-primary bg-transparent"
              } ring-2 ring-inset`}
            >
              <span
                className={`text-large ${
                  form.formState.errors[mcq.id]
                    ? "text-destructive"
                    : isShowResults
                      ? form.getValues(mcq.id)
                        ? "text-white"
                        : "text-destructive"
                      : "text-primary"
                } font-secondary font-semibold`}
              >
                {order}
              </span>
            </div>
            <h6 className="text-wrap">{mcq.question}</h6>
          </FormLabel>
          <FormControl>
            <RadioGroup
              value={field?.value || ""}
              onValueChange={field?.onChange}
              defaultValue={field?.value || ""}
              className="flex flex-col gap-3 !mt-0"
              disabled={isDisabled}
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
                    />
                  </FormControl>
                  <FormLabel className="text-base font-normal text-text-200 !mt-0">
                    {choice}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default Mcq;
