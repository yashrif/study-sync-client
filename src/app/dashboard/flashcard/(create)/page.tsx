"use client";

import { useEffect } from "react";

import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { QuizTypes, QuizUploadsActionType } from "@/types";

const CreateFlashCard = () => {
  const { dispatch } = useQuizUploadsContext();

  useEffect(() => {
    dispatch({
      type: QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES,
      payload: [QuizTypes.CQ],
    });
    dispatch({
      type: QuizUploadsActionType.SET_IS_FLASHCARD,
      payload: true,
    });
  }, [dispatch]);

  return null;
};

export default CreateFlashCard;
