import { useContext } from "react";

import { QuizUploadsContext } from "@/context/QuizUploadsContext";
import { QuizUploadsContextProps } from "@/types";

export const useQuizUploadsContext = (): QuizUploadsContextProps => {
  const context = useContext(QuizUploadsContext);
  if (context === undefined) {
    throw new Error(
      "useQuizUploadsContext must be used within an QuizUploadsProvider"
    );
  }
  return context;
};
