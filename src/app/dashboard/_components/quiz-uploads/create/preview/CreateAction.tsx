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
  Quiz,
  QuizRequestDb,
  QuizUploadsActionType,
  RequestType,
} from "@/types";

const CreateAction: React.FC = () => {
  const { push } = useRouter();
  const [isSaved, setIsSaved] = useState(false);

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
    try {
      const updatedQuiz = {
        ...quiz,
        cqs: quiz.cqs.map((cq) => ({
          ...cq,
          isFlashcard,
        })),
      };
      await handler({ data: updatedQuiz, fetchType: "lazy", isReset: true });

      setIsSaved(true);
    } catch (err) {
      console.log(err);
      setIsSaved(false);
    }
  };

  return (
    <div className="w-full flex justify-end items-center gap-3">
      <IconButton
        iconClassName="stroke-[2.5]"
        {...controlBar.close}
        onClick={() => {
          quizDispatch({
            type: QuizUploadsActionType.SET_QUIZ,
            payload: {} as QuizRequestDb,
          });
        }}
      />
      {!isSaved ? (
        <IconButton
          iconClassName="stroke-[2.5]"
          {...controlBar.save}
          onClick={onSubmit}
          status={status}
        />
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
                  : links.dashboard.quiz.quizDetails(data.id).href
              );
          }}
          type="submit"
        />
      )}
    </div>
  );
};

export default CreateAction;
