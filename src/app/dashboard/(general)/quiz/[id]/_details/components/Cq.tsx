import {
  IconCirclePlus2,
  IconSquarePlus2,
  IconTrash,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { CheckmarkAnimated } from "@/components/icons";
import StatusContent from "@/components/StatusContent";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFetchState } from "@/hooks/fetchData";
import { useApiHandler } from "@/hooks/useApiHandler";
import { useQuizContext } from "@/hooks/useQuizContext";
import { CqIntermediate, Quiz, Status } from "@/types";

type Props = {
  cq: CqIntermediate;
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

const Cq: React.FC<Props> = ({ cq, order, form, isDisabled }) => {
  const { id } = useParams();
  const {
    state: { cqEvaluation, status, isShowResults, evaluateStatus },
    dispatch,
  } = useQuizContext();

  const result = useMemo(() => {
    return cqEvaluation[cq.id] || { correctness: -1, comment: "" };
  }, [cqEvaluation, cq.id]);

  const { handler: quizHandler } = useApiHandler<null, Quiz>({
    apiCall: useCallback(
      () => studySyncDB.get(`${dbEndpoints.quizzes}/${id}`),
      [id]
    ),
    dispatch,
  });

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
          <div className="grid grid-cols-[1fr,auto] gap-x-10 items-start">
            <FormLabel className="grid grid-cols-[40px,1fr] gap-x-10 items-center">
              <div
                className={`size-10 flex items-center justify-center rounded-full
                ${
                  form.formState.errors[cq.id] ||
                  (result.correctness < 50 && result.correctness >= 0) ||
                  (!result.correctness &&
                    isShowResults &&
                    evaluateStatus === Status.SUCCESS)
                    ? "ring-destructive"
                    : "ring-primary"
                }
                ${
                  result.correctness
                    ? result.correctness >= 50
                      ? result.correctness >= 80
                        ? "bg-success ring-success"
                        : "bg-orange-500 !ring-orange-500"
                      : result.correctness >= 0
                        ? "bg-destructive"
                        : ""
                    : isShowResults && evaluateStatus === Status.SUCCESS
                      ? "bg-destructive"
                      : ""
                } ring-2 ring-inset`}
              >
                <span
                  className={`text-large ${
                    form.formState.errors[cq.id]
                      ? "text-destructive"
                      : result.correctness
                        ? result.correctness <= 50 && result.correctness >= 0
                          ? "text-white"
                          : result.correctness > 50
                            ? "text-white"
                            : "text-primary"
                        : isShowResults && evaluateStatus === Status.SUCCESS
                          ? "text-white"
                          : "text-primary"
                  }  font-secondary font-semibold`}
                >
                  {order}
                </span>
              </div>
              <h6 className="text-wrap">{cq.question}</h6>
            </FormLabel>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={async () => {
                      await handler({
                        data: {
                          isFlashcard: !cq.isFlashcard,
                        },
                        pathVariable: cq.id,
                      });
                      await quizHandler({ isUpdateStatus: false });
                    }}
                  >
                    <StatusContent
                      status={createStatus}
                      className={`hover:scale-[1.2] transition cursor-pointer ${
                        createStatus === Status.PENDING
                          ? "animate-spin duration-1000"
                          : "duration-300"
                      }
                      `}
                      iconClassName="size-5 stroke-[2.5px]"
                      contents={{
                        [Status.IDLE]: {
                          type: "icon-only",
                          Icon: cq.isFlashcard
                            ? CheckmarkAnimated
                            : IconCirclePlus2,
                          iconClassName: cq.isFlashcard
                            ? "stroke-success"
                            : "stroke-primary",
                        },
                        [Status.SUCCESS]: {
                          type: "icon-only",
                          Icon: cq.isFlashcard
                            ? CheckmarkAnimated
                            : IconCirclePlus2,
                          iconClassName: cq.isFlashcard
                            ? "stroke-success text-success"
                            : "!stroke-primary",
                        },
                      }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-small">
                    <div
                      className={`flex gap-1.5 items-center ${cq.isFlashcard ? "text-destructive" : "text-primary"}`}
                    >
                      {cq.isFlashcard ? (
                        <IconTrash className="size-[14px]" />
                      ) : (
                        <IconSquarePlus2 className="size-[14px]" />
                      )}
                      <span>
                        {cq.isFlashcard
                          ? "Remove flashcard"
                          : "Create flashcard"}
                      </span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormControl>
            <div className="grid grid-cols-[40px_1fr] gap-10 items-center !mt-0">
              <div />
              <Textarea
                placeholder={`Write the answer of the question no. ${order}`}
                className="resize-y text-base text-text placeholder:text-text-200"
                {...field}
                value={field?.value || ""}
                onChange={(e) => {
                  field.onChange(e.target.value);
                }}
                defaultValue={field?.value || ""}
                disabled={isDisabled}
              />
            </div>
          </FormControl>
          {isShowResults &&
            status === Status.SUCCESS &&
            evaluateStatus !== Status.ERROR && (
              <FormDescription className="grid grid-cols-[40px_1fr] gap-10 items-center !mt-0">
                <div />
                <div className="flex flex-col gap-2">
                  <p className="text-text-200 text-medium">
                    <span className="text-primary font-medium">
                      Correctness:{" "}
                    </span>
                    {result.correctness || 0}
                  </p>
                  {result?.comment?.length > 0 && (
                    <p className="text-text-200 text-medium">
                      <span className="text-primary font-medium">
                        Comment:{" "}
                      </span>
                      {result.comment}
                    </p>
                  )}
                </div>
              </FormDescription>
            )}
        </FormItem>
      )}
    />
  );
};

export default Cq;
