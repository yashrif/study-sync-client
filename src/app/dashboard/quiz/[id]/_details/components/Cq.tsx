import { IconCirclePlus2 } from "@tabler/icons-react";
import _ from "lodash";
import { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { CircleCheck } from "@/components/icons";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizContext } from "@/hooks/useQuizContext";
import { CqIntermediate, QuizActionType, Status } from "@/types";

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
    state: { cqEvaluation, status, isShowResults, quiz },
    dispatch,
  } = useQuizContext();

  const result = useMemo(() => {
    return cqEvaluation[cq.id] || { correctness: -1, comment: "" };
  }, [cqEvaluation, cq.id]);

  const {
    state: { status: createStatus },
    dispatch: createDispatch,
  } = useFetchState<{ isFlashcard: boolean }>();

  const { handler } = useApiHandler<
    { isFlashcard: boolean },
    { isFlashcard: boolean }
  >({
    apiCall: useCallback(
      (data, pathVariable) =>
        studySyncDB.patch(`${dbEndpoints.cqs}/${pathVariable}`, data),
      []
    ),
    dispatch: createDispatch,
  });

  return (
    <FormField
      control={form.control}
      name={cq.id}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-6">
          <FormLabel className="grid grid-cols-[40px,1fr,auto] gap-x-10 items-center">
            <div
              className={`size-10 flex items-center justify-center rounded-full
                ${
                  form.formState.errors[cq.id] ||
                  (result.correctness < 50 && result.correctness >= 0)
                    ? "ring-destructive"
                    : "ring-primary"
                }
                ${
                  result.correctness >= 50
                    ? result.correctness >= 80
                      ? "bg-success ring-success"
                      : "bg-blue-500 ring-blue-500"
                    : result.correctness >= 0
                      ? "bg-destructive"
                      : ""
                } ring-2 ring-inset`}
            >
              <span
                className={`text-large ${
                  form.formState.errors[cq.id]
                    ? "text-destructive"
                    : result.correctness <= 50 && result.correctness >= 0
                      ? "text-text-300"
                      : "text-primary"
                }  font-secondary font-semibold`}
              >
                {order}
              </span>
            </div>
            <h6 className="text-wrap">{cq.question}</h6>
            {/* TODO: make it tooltip */}
            {cq.isFlashcard && (
              <CircleCheck
                className="size-[18px] stroke-success hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={async () => {}}
              />
            )}
            {!cq.isFlashcard && (
              <IconCirclePlus2
                className="size-[18px] stroke-primary hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={async () => {
                  try {
                    await handler({
                      data: {
                        isFlashcard: true,
                      },
                      pathVariable: cq.id,
                    });
                    const cqs = _.cloneDeep(quiz.cqs);
                    cqs?.splice(
                      _.findIndex(cqs, (theCq) => theCq.id === cq.id),
                      1
                    );
                    dispatch({
                      type: QuizActionType.SET_QUIZ,
                      payload: {
                        ...quiz,
                        cqs: [...(cqs || []), { ...cq, isFlashcard: true }],
                      },
                    });
                  } catch (e) {
                    console.error(e);
                  }
                }}
              />
            )}
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
