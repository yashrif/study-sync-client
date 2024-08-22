"use client";

import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { dbEndpoints } from "@/assets/data/api";
import { controlBar } from "@/assets/data/dashboard/controlBar";
import { links } from "@/assets/data/routes";
import IconButton from "@/components/button/IconButton";
import { useFetchState } from "@/hooks/fetchData";
import { requestHandler, useApiHandler } from "@/hooks/useApiHandler";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import {
  Quiz,
  QuizRequestDb,
  QuizUploadsActionType,
  RequestType,
} from "@/types";

const CreateAction: React.FC = () => {
  const { push } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    state: { quiz, isFlashcard },
    dispatch: quizDispatch,
  } = useQuizUploadsContext();

  const {
    state: { data, status },
    dispatch,
  } = useFetchState<Quiz>();
  const { handler } = useApiHandler<QuizRequestDb, Quiz>({
    apiCall: useCallback(
      (data) =>
        requestHandler<QuizRequestDb>({
          endpoint: dbEndpoints.quizzes,
          requestType: RequestType.POST,
          data,
        }),
      []
    ),
    dispatch,
  });

  if (!quiz) return null;

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
      await handler({ data: updatedQuiz, fetchType: "lazy", isReset: true });
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
        <IconButton {...controlBar.save} onClick={onSubmit} status={status} />
      ) : (
        <IconButton
          size="lg"
          className="size-12 p-0 rounded-full"
          Icon={IconArrowRight}
          iconClassName="!size-6 stroke-text-300 text-text-300"
          status={status}
          onClick={() => {
            if (data)
              push(
                isFlashcard
                  ? links.dashboard.flashcard.review.href
                  : links.dashboard.quiz.details(data.id).href
              );
          }}
          type="submit"
        />
      )}
    </div>
  );
};

export default CreateAction;
