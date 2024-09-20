"use client";

import { IconMessageChatbot } from "@tabler/icons-react";
import { useCallback, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import IconButton from "@/components/button/IconButton";
import { useFetchData } from "@/hooks/fetchData";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { TopicShallow, UploadShallow } from "@/types";
import ChatBotInput from "./ChatInput";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = useChatBotContext();

  useFetchData<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });
  useFetchData<null, TopicShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.topics), []),
    dispatch,
  });

  return (
    <div className="fixed bottom-8 right-8 flex flex-col-reverse items-end gap-2 z-40">
      <IconButton
        Icon={IconMessageChatbot}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="size-12 rounded-full shadow-lg"
        iconClassName="size-6 stroke-white !text-white"
      />
      {isOpen && (
        <>
          <ChatBotInput />
          {/* <IconButton
            Icon={IconX}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            variant="outline"
            className="size-8 rounded-full"
            iconClassName="size-4 stroke-primary text-primary"
          /> */}
        </>
      )}
    </div>
  );
};

export default ChatBot;
