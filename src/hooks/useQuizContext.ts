import { useContext } from "react";

import { QuizContext } from "@/context/QuizContext";
import { QuizContextProps } from "@/types";

export const useQuizContext = (): QuizContextProps => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizContext must be used within an QuizProvider");
  }
  return context;
};
