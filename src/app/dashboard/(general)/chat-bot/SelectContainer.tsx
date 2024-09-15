"use client";

import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select-custom";
import { useChatBotContext } from "@/hooks/ChatBotContext";

type SelectContainerProps = {
  children: React.ReactNode;
  onValueChange: (e: string) => void;
  onOpenChange?: (e: boolean) => void;
};

const SelectContainer: React.FC<SelectContainerProps> = ({
  children,
  onValueChange,
  onOpenChange,
}) => {
  const {
    state: { textareaRef },
  } = useChatBotContext();

  /* ---------------------------- on textarea focus --------------------------- */

  const focusTextArea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [textareaRef]);

  return (
    <Select
      defaultOpen
      onValueChange={(e) => {
        if (onValueChange) {
          onValueChange(e);
        }

        focusTextArea();
      }}
      onOpenChange={(e) => {
        if (onOpenChange) onOpenChange(e);
        focusTextArea();
      }}
    >
      <SelectTrigger
        className="invisible absolute top-0 left-0 max-w-60 z-10 rounded-md animate-in"
        onFocus={() => focusTextArea()}
      >
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  );
};

export default SelectContainer;
