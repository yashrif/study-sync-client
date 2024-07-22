import { useContext } from "react";

import { SettingContext } from "@/context/SettingContext";
import { SettingContextProps } from "@/types";

export const useSettingContext = (): SettingContextProps => {
  const context = useContext(SettingContext);
  if (context === undefined) {
    throw new Error("useSettingContext must be used within an SettingProvider");
  }
  return context;
};
