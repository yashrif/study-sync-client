"use client";

import { IconMessageChatbot } from "@tabler/icons-react";
import { useState } from "react";

import IconButton from "@/components/button/IconButton";
import ChatBotInput from "./ChatInput";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
