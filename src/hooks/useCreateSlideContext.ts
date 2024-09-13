import { useContext } from "react";

import { CreateSlideContext } from "@/context/CreateSlideContext";
import { CreateSlideContextProps } from "@/types";

export const useCreateSlideContext = (): CreateSlideContextProps => {
  const context = useContext(CreateSlideContext);
  if (context === undefined) {
    throw new Error(
      "useCreateSlideContext must be used within an CreateSlideProvider"
    );
  }
  return context;
};
