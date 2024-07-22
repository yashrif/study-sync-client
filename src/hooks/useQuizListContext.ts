import { useContext } from "react";

import { QuizzesContext } from "@/context/QuizzesContext";
import { QuizzesContextProps } from "@/types";

export const useQuizzesContext = (): QuizzesContextProps => {
  const context = useContext(QuizzesContext);
  if (context === undefined) {
    throw new Error(
      "useQuizzesContext must be used within an QuizListProvider",
    );
  }
  return context;
};
