import { useContext } from "react";

import { PlannersContext } from "@/context/PlannersContext";
import { PlannersContextProps } from "@/types";

export const usePlannersContext = (): PlannersContextProps => {
  const context = useContext(PlannersContext);
  if (context === undefined) {
    throw new Error(
      "usePlannersContext must be used within an PlannersProvider"
    );
  }
  return context;
};
