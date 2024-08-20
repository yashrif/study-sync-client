import { useContext } from "react";

import { StudyContextProps } from "@/types/study";
import { StudyContext } from "@/context/StudyContext";

export const useStudyContext = (): StudyContextProps => {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error("useStudyContext must be used within an StudyProvider");
  }
  return context;
};
