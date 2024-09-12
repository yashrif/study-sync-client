"use client";

import { useEffect } from "react";

import { create, home } from "@/assets/data/dashboard/quiz";
import { useQuizUploadsContext } from "@/hooks/useQuizUploadsContext";
import { QuizTypes, QuizUploadsActionType } from "@/types";
import CreateQuizComponent from "../../../_components/quiz-uploads";

const CreateQuiz = () => {
  const { dispatch } = useQuizUploadsContext();

  useEffect(() => {
    dispatch({
      type: QuizUploadsActionType.SET_IS_SHOW_CHECKBOX,
      payload: true,
    });
    dispatch({
      type: QuizUploadsActionType.SET_DEFAULT_QUIZ_TYPES,
      payload: [QuizTypes.MCQ],
    });
    dispatch({
      type: QuizUploadsActionType.SET_IS_SHOW_RECENT_QUIZ,
      payload: true,
    });
  }, [dispatch]);

  return <CreateQuizComponent home={home.create} create={create} />;
};

export default CreateQuiz;
