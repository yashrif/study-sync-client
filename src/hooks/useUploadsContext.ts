import { useContext } from "react";

import { UploadsContext } from "@/context/UploadsContext";
import { UploadsContextProps } from "@/types";

export const useUploadsContext = (): UploadsContextProps => {
  const context = useContext(UploadsContext);
  if (context === undefined) {
    throw new Error("useUploadsContext must be used within an UploadsProvider");
  }
  return context;
};
