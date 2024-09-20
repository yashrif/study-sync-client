"use client";

import { IconSend2 } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";

import {
  Commands as ECommands,
  commandLabels,
} from "@/assets/data/dashboard/chatBot";
import IconButton from "@/components/button/IconButton";
import Dictaphone from "@/components/dictaphone";
import { Textarea } from "@/components/ui/textarea";
import { useChatBotContext } from "@/hooks/useChatBotContext";
import { usePath } from "@/hooks/usePath";
import { ChatBotActionType, Status } from "@/types";
import { findFirstSubstring, replace } from "@/utils/string";
import useCommands from "./command-items/useCommands";
import Commands from "./Commands";
import Conversation from "./Conversation";
import { useOnSubmit } from "./on-submit";

const ChatBotInput = () => {
  const { path } = usePath();
  const [text, setText] = useState("");
  const textDivRef = useRef<HTMLDivElement>(null);
  const { commandsLvlInline } = useCommands();

  const {
    state: { selectedUploads, requestStatus, textareaRef },
    dispatch,
  } = useChatBotContext();
  const { onSubmit } = useOnSubmit();

  /* ------------------------------ Update state ------------------------------ */

  useEffect(() => {
    dispatch({
      type: ChatBotActionType.SET_SET_PROMPT,
      payload: setText,
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: ChatBotActionType.SET_PROMPT,
      payload: text,
    });
  }, [dispatch, text]);

  /* ------------------------------ Input overlay ----------------------------- */

  useEffect(() => {
    if (textDivRef.current) {
      textDivRef.current.scrollTop = textDivRef.current.scrollHeight;
      textDivRef.current.scrollLeft = textDivRef.current.scrollWidth;
    }
  }, [text]);

  useEffect(() => {
    if (textareaRef.current && textDivRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      textDivRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [text, textareaRef]);

  const handleScroll = () => {
    if (textDivRef.current && textareaRef.current) {
      textDivRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /* ------------------------------ Auto Resize with min and max height ----------------------------- */

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px";
      if (text === "") {
        textarea.style.height = "40px";
      } else {
        const scrollHeight = textarea.scrollHeight;
        const newHeight = Math.min(Math.max(scrollHeight, 40), 120);
        textarea.style.height = `${newHeight}px`;
      }
    }
  }, [text, textareaRef]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  /* -------------------------------- Variables ------------------------------- */

  const highlightedTextsLvl1 = commandLabels;

  /* --------------------------------- return --------------------------------- */

  return (
    <div className="relative w-[400px] h-[480px] overflow-hidden shadow-lg rounded-md border">
      <div className="absolute inset-0 bg-auth-bg bg-cover object-cover bg-center opacity-25" />
      <div className="relative h-full overflow-hidden grid grid-cols-1 grid-rows-[1fr,auto] gap-2 py-4 bg-white bg-opacity-[0.80] backdrop-blur-md backdrop-saturate-[180%]">
        {/* ------------------------------ Chat history ------------------------------ */}

        <Conversation />

        {/* -------------------------------- Text field ------------------------------- */}

        <div className="px-4 pt-0">
          <div className="overflow-hidden relative">
            <div
              ref={textDivRef}
              className="absolute top-0 left-0 p-2 pr-[70px] border border-transparent leading-[150%] w-full h-full text-sm overflow-hidden pointer-events-none break-words whitespace-pre-wrap"
            >
              {text.length > 1 ? (
                (() => {
                  /* ---------------------- Replace first command string ---------------------- */

                  const modifiedText = replaceLabel(commandsLvlInline(), text);
                  if (text.localeCompare(modifiedText) !== 0)
                    setText(modifiedText);

                  /* ------------------------------ Highlight text ----------------------------- */

                  const styledText = highlightedTextsLvl1
                    .map((item, index) => {
                      const splitText = text
                        .toLowerCase()
                        .split(item.toLowerCase());
                      if (
                        splitText.length > 1 &&
                        ((splitText[1].trim().length <= 0 &&
                          splitText[0].trim().length <= 0) ||
                          (splitText[1].trim().length > 0 &&
                            selectedUploads.length > 0))
                      ) {
                        return (
                          <>
                            {
                              <HighlightBlock
                                labels={commandsLvlInline()}
                                text={text.slice(0, splitText[0].length)}
                              />
                            }
                            <CommandBlock
                              key={index}
                              text={text.slice(
                                splitText[0].length,
                                text.length -
                                  splitText[1].length -
                                  splitText[0].length
                              )}
                            />
                            {
                              <HighlightBlock
                                labels={commandsLvlInline()}
                                text={text.slice(
                                  text.length - splitText[1].length
                                )}
                              />
                            }
                          </>
                        );
                      }
                    })
                    .filter((item) => item);
                  return styledText.length > 0 ? (
                    styledText.pop()
                  ) : (
                    <HighlightBlock labels={commandsLvlInline()} text={text} />
                  );
                })()
              ) : text === ECommands["slash"] ? (
                <CommandBlock text={text} />
              ) : (
                text
              )}
            </div>
            <Textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              onScroll={handleScroll}
              className="relative resize-none w-full min-h-9 max-h-[120px] text-sm rounded-lg border-primary caret-primary text-transparent bg-transparent no-scrollbar z-0 p-2 pr-[70px] leading-[150%] whitespace-pre-wrap"
              disabled={requestStatus === Status.PENDING}
            />

            <div className="absolute right-2 bottom-[7.5px] z-20 flex gap-1 items-center justify-center">
              {/* ------------------------------- Dictaphone ------------------------------- */}

              <Dictaphone className="size-5" setTranscript={setText} />

              {/* ------------------------------ Submit Button ----------------------------- */}

              <IconButton
                Icon={IconSend2}
                onClick={() => onSubmit()}
                className="size-6 hover:bg-transparent"
                iconClassName={`!stroke-primary !text-primary hover:text-primary/75 transition-all duration-300 ${
                  requestStatus === Status.SUCCESS
                    ? "!size-5 !stroke-[4px]"
                    : "!size-6"
                }`}
                variant={"ghost"}
                status={requestStatus}
                disabled={text.length <= 0}
              />
            </div>

            <Commands />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotInput;

/* ---------------------------------- Utils --------------------------------- */

const CommandBlock: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-primary bg-accent rounded-xs">{text}</span>
);

const replaceLabel = (labels: string[], text: string): string => {
  const firstCommand = findFirstSubstring(
    text.toLowerCase(),
    labels.map((item) => item.toLowerCase())
  );

  if (firstCommand.substring) {
    const label = labels.find(
      (item) => item.toLowerCase() === firstCommand.substring
    );
    if (label)
      text = replace(
        text,
        text.slice(
          firstCommand.index,
          firstCommand.index + firstCommand.substring.length
        ),
        label,
        "i"
      );
  }

  return text;
};

type Props = {
  labels: string[];
  text: string;
};

const HighlightBlock: React.FC<Props> = ({ labels, text }) => {
  const command = findFirstSubstring(text, labels);

  if (command.substring) {
    const index = text.search(command.substring);

    if (index !== -1) {
      return (
        <>
          {text.slice(0, index)}
          <CommandBlock
            text={text.slice(index, command.substring.length + index)}
          />
          {text.slice(index + command.substring.length)}
        </>
      );
    }
  }

  return <>{text}</>;
};
