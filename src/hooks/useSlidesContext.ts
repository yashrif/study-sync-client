import { useContext } from "react";

import { SlidesContext } from "@/context/SlidesContext";
import { SlidesContextProps } from "@/types";

export const useSlidesContext = (): SlidesContextProps => {
  const context = useContext(SlidesContext);
  if (context === undefined) {
    throw new Error("useSlidesContext must be used within an SlidesProvider");
  }
  return context;
};
