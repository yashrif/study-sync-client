"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { controlBar } from "@/assets/data/dashboard/controlBar";
import { links } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { requestHandler, useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import {
  Cq,
  CqRequest,
  Quiz,
  QuizRequestDb,
  QuizUploadsActionType,
  RequestType,
  Status,
} from "@/types";

const CreateAction: React.FC = () => {
  const { push } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    state: { quiz, isFlashcard },
    dispatch: quizDispatch,
  } = useQuizUploadsContext();

  const { state: quizRequestState, dispatch: quizRequestDispatch } =
    useFetchState<Quiz>();
  const { handler: quizRequestHandler } = useApiHandler<QuizRequestDb, Quiz>({
    apiCall: useCallback(
      (data) =>
        requestHandler<QuizRequestDb>({
          endpoint: dbEndpoints.quizzes,
          requestType: RequestType.POST,
          data,
        }),
      []
    ),
    dispatch: quizRequestDispatch,
  });

  const { state: flashcardRequestState, dispatch: flashcardRequestDispatch } =
    useFetchState<Cq>();
  const { handler: flashcardRequestHandler } = useApiHandler<CqRequest, Cq>({
    apiCall: useCallback(
      (data) =>
        requestHandler<CqRequest>({
          endpoint: dbEndpoints.cqs,
          requestType: RequestType.POST,
          data,
        }),
      []
    ),
    dispatch: flashcardRequestDispatch,
  });

  if (!quiz) return null;

  /* -------------------------------- on submit ------------------------------- */

  const onSubmit = async () => {
    setIsProcessing(true);
    try {
      const updatedQuiz = {
        ...quiz,
        cqs: quiz.cqs.map((cq) => ({
          ...cq,
          isFlashcard,
        })),
      };

      if (isFlashcard)
        Promise.all(
          updatedQuiz.cqs.map(async (cq) => {
            await flashcardRequestHandler({
              data: cq,
              fetchType: "lazy",
              isReset: true,
            });
          })
        );
      else
        await quizRequestHandler({
          data: updatedQuiz,
          fetchType: "lazy",
          isReset: true,
        });
    } catch (err) {
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
      console.log(err);
    }
  };

  return (
    <div className="w-full flex justify-end items-center gap-3">
      <IconButton
        {...controlBar.close}
        onClick={() => {
          quizDispatch({
            type: QuizUploadsActionType.SET_QUIZ,
            payload: {} as QuizRequestDb,
          });
        }}
      />
      {!isProcessing ? (
        <IconButton
          {...controlBar.save}
          onClick={onSubmit}
          status={quizRequestState.status}
        />
      ) : (
        <IconButton
          size="lg"
          className="size-12 p-0 rounded-full"
          Icon={IconArrowRight}
          iconClassName="!size-6 stroke-text-300 text-text-300"
          status={(() => {
            switch (true) {
              case quizRequestState.status === Status.IDLE &&
                flashcardRequestState.status === Status.IDLE:
                return Status.IDLE;
              case quizRequestState.status === Status.PENDING ||
                flashcardRequestState.status === Status.PENDING:
                return Status.PENDING;
              case quizRequestState.status === Status.SUCCESS &&
                flashcardRequestState.status === Status.SUCCESS:
                return Status.SUCCESS;
              case quizRequestState.status === Status.ERROR ||
                flashcardRequestState.status === Status.ERROR:
                return Status.ERROR;
              default:
                return Status.IDLE;
            }
          })()}
          onClick={() => {
            if (quizRequestState.data)
              push(
                isFlashcard
                  ? links.dashboard.flashcard.review.href
                  : links.dashboard.quiz.details(quizRequestState.data.id).href
              );
          }}
          type="submit"
        />
      )}
    </div>
  );
};

export default CreateAction;
