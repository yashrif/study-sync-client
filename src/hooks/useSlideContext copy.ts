import { useContext } from "react";

import { SlidesContext } from "@/context/SlidesContext";
import { SlidesContextProps } from "@/types";

export const useSlideContext = (): SlidesContextProps => {
  const context = useContext(SlidesContext);
  if (context === undefined) {
    throw new Error("useSlideContext must be used within an SlideProvider");
  }
  return context;
};
