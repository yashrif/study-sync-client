import { useContext } from "react";

import { PlannerContext } from "@/context/PlannerContext";
import { PlannerContextProps } from "@/types";

export const usePlannerContext = (): PlannerContextProps => {
  const context = useContext(PlannerContext);
  if (context === undefined) {
    throw new Error("usePlannerContext must be used within an PlannerProvider");
  }
  return context;
};
