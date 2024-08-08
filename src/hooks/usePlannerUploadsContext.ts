import { useContext } from "react";

import { PlannerUploadsContext } from "@/context/PlannerUploadsContext";
import { PlannerUploadsContextProps } from "@/types";

export const usePlannerUploadsContext = (): PlannerUploadsContextProps => {
  const context = useContext(PlannerUploadsContext);
  if (context === undefined) {
    throw new Error(
      "usePlannerUploadsContext must be used within an PlannerUploadsProvider"
    );
  }
  return context;
};
