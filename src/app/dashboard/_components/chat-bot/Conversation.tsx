"use client";

import { IconClearAll, IconMessage } from "@tabler/icons-react";
import _ from "lodash";
import { useMemo } from "react";

import { ScrollArea } from "@/components/ui/scroll-area-custom";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { ChatBotActionType } from "@/types";
import TopicBadge from "./_components/TopicBadge";
import UploadBadge from "./_components/UploadBadge";

const Conversation: React.FC = () => {
  const {
    state: { conversation, uploads, selectedUploads, selectedTopics, topics },
    dispatch,
  } = useChatBotContext();

  const filteredUploads = useMemo(
    () => uploads?.filter((item) => selectedUploads.includes(item.id)),
    [selectedUploads, uploads]
  );
  const filteredTopics = useMemo(
    () =>
      _.unionBy(
        topics?.filter((item) => selectedTopics.includes(item.name)),
        "name"
      ),
    [selectedTopics, topics]
  );

  return (
    <ScrollArea className="h-full pb-0">
      <div className="h-full flex flex-col justify-end px-4">
        <div
          className="pb-4 flex flex-col gap-6"
          style={{
            height: conversation.length > 0 ? "auto" : "100%",
          }}
        >
          {conversation.length > 0 ? (
            conversation.map((item, index) => (
              <div
                key={index}
                className={`max-w-[80%] text-foreground py-2 px-4 rounded-lg ${
                  item.type === "prompt"
                    ? "self-end bg-accent-300"
                    : "self-start"
                }`}
              >
                {item.data}
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center px-8">
              <div className="size-16 bg-accent flex items-center justify-center rounded-full mb-4">
                <IconMessage className="size-8 stroke-primary stroke-2" />
              </div>
              <p className="text-lg text-primary font-medium text-center leading-6 mb-4">
                Start a conversation with the bot by typing in the message box
                below.
              </p>
              <p className="text-base text-center text-muted-foreground">
                Type / to see a list of available commands.
              </p>
            </div>
          )}
        </div>
        {(filteredUploads.length > 0 || filteredTopics.length > 0) && (
          <div className="sticky bottom-0 inset-0 bg-accent/15 backdrop-blur">
            <div className="relative max-h-32 overflow-y-scroll overflow-x-auto no-scrollbar flex flex-wrap-reverse gap-x-2 gap-y-1.5">
              {filteredUploads.map((upload) => (
                <UploadBadge key={upload.id} upload={upload} />
              ))}
              {filteredTopics.map((topic) => (
                <TopicBadge key={topic.id} topic={topic} />
              ))}

              <div className="fixed w-full top-0 right-0 flex items-center justify-end z-50">
                <div
                  className="size-5 rounded-full ring-1 ring-destructive flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    dispatch({
                      type: ChatBotActionType.SET_SELECTED_TOPICS,
                      payload: [],
                    });
                    dispatch({
                      type: ChatBotActionType.SET_SELECTED_UPLOADS,
                      payload: [],
                    });
                  }}
                >
                  <IconClearAll className="size-[14px] text-destructive" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default Conversation;
