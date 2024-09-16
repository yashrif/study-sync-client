"use client";

import { useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area-custom";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import UploadBadge from "./_components/UploadBadge";

const Conversation: React.FC = () => {
  const {
    state: { conversation, uploads, selectedUploads },
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );

  return (
    <ScrollArea className="h-full pb-0">
      <div className="h-full flex flex-col justify-end px-4">
        <div className="pb-4 flex flex-col gap-4">
          {conversation.map((item, index) => (
            <div
              key={index}
              className={`max-w-[80%] text-foreground py-2 px-4 rounded-lg ${
                item.type === "prompt" ? "self-end bg-accent-300" : "self-start"
              }`}
            >
              {item.data}
            </div>
          ))}
        </div>
        {filteredUploads.length > 0 && (
          <div className="sticky bottom-0 inset-0 pt-2 bg-background flex flex-wrap-reverse gap-x-2 gap-y-1.5">
            {filteredUploads.map((upload) => (
              <UploadBadge key={upload.id} upload={upload} />
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Conversation;
