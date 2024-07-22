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
import StatusIcon from "@/components/StatusIcon";
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
      [x: string]: string;
    },
    any,
    undefined
  >;
};

const Cq: React.FC<Props> = ({ cq, order, form }) => {
  const { id } = useParams();
  const {
    state: { cqEvaluation, status, isShowResults, quiz },
    dispatch,
  } = useQuizContext();

  const result = useMemo(() => {
    return cqEvaluation[cq.id] || { correctness: -1, comment: "" };
  }, [cqEvaluation, cq.id]);

  const { handler: quizHandler } = useApiHandler<null, Quiz>({
    apiCall: useCallback(
      () => studySyncDB.get(`${dbEndpoints.quizzes}/${id}`),
      [id],
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
      [],
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
                    <StatusIcon
                      status={createStatus}
                      className={`!size-4 hover:scale-[1.2] transition cursor-pointer ${
                        createStatus === Status.PENDING
                          ? "animate-spin duration-1000"
                          : "duration-300"
                      }
                      ${
                        (createStatus === Status.SUCCESS && cq.isFlashcard) ||
                        cq.isFlashcard
                          ? "!text-success stroke-success"
                          : createStatus === Status.ERROR
                            ? "!text-destructive"
                            : "text-primary"
                      }
                    `}
                      Icons={{
                        [Status.IDLE]: cq.isFlashcard
                          ? CheckmarkAnimated
                          : IconCirclePlus2,
                        [Status.SUCCESS]: cq.isFlashcard
                          ? CheckmarkAnimated
                          : IconCirclePlus2,
                      }}
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-small">
                    <div className="flex gap-1.5 items-center text-destructive">
                      {cq.isFlashcard ? (
                        <IconTrash className="size-[15px]" />
                      ) : (
                        <IconSquarePlus2 className="size-[15px]" />
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
