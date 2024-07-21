"use client";

import { useEffect } from "react";

import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { QuizTypes, QuizUploadsActionType } from "@/types";
import CreateQuiz from "../../_components/create";
import { create, home } from "@/assets/data/dashboard/flashcard";

const CreateFlashCard = () => {
  const { dispatch } = useQuizUploadsContext();

  useEffect(() => {
    dispatch({
      type: QuizUploadsActionType.SET_IS_SHOW_CHECKBOX,
      payload: false,
    });
    dispatch({
      type: QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES,
      payload: [QuizTypes.CQ],
    });
    dispatch({
      type: QuizUploadsActionType.SET_IS_SHOW_RECENT_QUIZ,
      payload: false,
    });
  }, [dispatch]);

  return <CreateQuiz home={home.create} create={create} />;
};

export default CreateFlashCard;
