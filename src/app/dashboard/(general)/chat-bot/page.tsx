"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import {
  Commands as ECommands,
  commandLabels,
} from "@/assets/data/dashboard/chatBot";
import IconButton from "@/components/button/IconButton";
import { Badge } from "@/components/ui/badge";
import { AutosizeTextarea } from "@/components/ui/textarea-autosize";
import { useChatBotContext } from "@/hooks/ChatBotContext";
import { useFetchData } from "@/hooks/fetchData";
import { ChatBotActionType, Status, UploadShallow } from "@/types";
import { IconFileTypePdf, IconSend2, IconX } from "@tabler/icons-react";
import Commands from "./Commands";
import { useOnSubmit } from "./onSubmit";

const BADGE_TITLE_MAX_LENGTH = 20;

const ChatBotInput = () => {
  const [text, setText] = useState("");
  const textDivRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { state, dispatch } = useChatBotContext();
  const { onSubmit } = useOnSubmit();

  useFetchData<null, UploadShallow[]>({
    apiCall: useCallback(() => studySyncDB.get(dbEndpoints.uploads), []),
    dispatch,
  });

  const filteredUploads = useMemo(
    () => state.uploads?.filter((item) => state.quiz.ids.includes(item.id)),
    [state.quiz.ids, state.uploads]
  );

  /* ---------------------------------- Utils --------------------------------- */

  const focusTextArea = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (
      !commandLabels.some((command) =>
        text.toLowerCase().includes(command.toLowerCase())
      ) &&
      state.quiz.ids.length > 0
    ) {
      dispatch({
        type: ChatBotActionType.SET_QUIZ_DATA,
        payload: {
          ...state.quiz,
          ids: [],
        },
      });
    }
  }, [dispatch, state.quiz, state.quiz.ids.length, text]);

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
      textDivRef.current.scrollTop = textDivRef.current.scrollHeight;
    }
  }, [text]);

  const handleScroll = () => {
    if (textDivRef.current && textareaRef.current) {
      textDivRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  /* --------------------------------- Component -------------------------------- */

  const CommandBlock: React.FC<{ text: string }> = ({ text }) => (
    <span className="text-primary bg-accent rounded-xs">{text}</span>
  );

  return (
    <div className="m-40 max-w-lg flex flex-col gap-2">
      <div className="flex flex-wrap-reverse gap-x-2 gap-y-1.5">
        {filteredUploads.map((upload) => (
          <Badge
            key={upload.id}
            className="rounded-sm flex items-center gap-1.5"
          >
            <IconFileTypePdf className="stroke-white size-3 stroke-[2.5px]" />
            <span className="whitespace-nowrap">
              {upload.title.length > BADGE_TITLE_MAX_LENGTH
                ? `${upload.title.slice(0, BADGE_TITLE_MAX_LENGTH - 3)}...`
                : upload.title}
            </span>
            <IconX
              className="stroke-white size-3 stroke-[2.5px] hover:scale-125 hover:stroke-[#ffa8a8] cursor-pointer transition-all duration-300"
              onClick={() => {
                dispatch({
                  type: ChatBotActionType.SET_QUIZ_DATA,
                  payload: {
                    ...state.quiz,
                    ids: state.quiz.ids.filter((id) => id !== upload.id),
                  },
                });
              }}
            />
          </Badge>
        ))}
      </div>

      {/* -------------------------------- Text Area ------------------------------- */}

      <div className="overflow-hidden relative">
        <div
          ref={textDivRef}
          className="absolute top-0 left-0 p-2 pr-12 border border-transparent leading-[150%] w-full h-full text-sm overflow-hidden pointer-events-none break-words whitespace-pre-wrap"
        >
          {text.length > 1 ? (
            (() => {
              const highlightedTexts = commandLabels;
              const styledText = highlightedTexts
                .map((item, index) => {
                  const splitText = text
                    .toLowerCase()
                    .split(item.toLowerCase());
                  if (
                    splitText.length > 1 &&
                    (splitText[1].trim().length <= 0 ||
                      (splitText[1].trim().length > 0 &&
                        state.quiz.ids.length > 0))
                  ) {
                    return (
                      <>
                        {text.slice(0, splitText[0].length)}
                        <CommandBlock
                          key={index}
                          text={text.slice(
                            splitText[0].length,
                            text.length -
                              splitText[1].length -
                              splitText[0].length
                          )}
                        />
                        {text.slice(text.length - splitText[1].length)}
                      </>
                    );
                  }
                })
                .filter((item) => item);
              return styledText.length > 0 ? styledText.pop() : text;
            })()
          ) : text === ECommands["slash"] ? (
            <CommandBlock text={text} />
          ) : (
            text
          )}
        </div>
        <AutosizeTextarea
          //@ts-ignore
          ref={textareaRef}
          minHeight={36}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onScroll={handleScroll}
          className="relative w-full h-full text-sm caret-primary text-transparent bg-transparent no-scrollbar z-10 p-2 pr-12 leading-[150%] whitespace-pre-wrap"
          disabled={state.requestStatus === Status.PENDING}
        />

        {/* ------------------------------ Submit Button ----------------------------- */}

        <IconButton
          Icon={IconSend2}
          onClick={() => onSubmit({ text })}
          className="absolute size-6 right-2 bottom-[7.5px] z-20 hover:bg-transparent"
          iconClassName="size-6 text-primary hover:text-primary/75 transition-all duration-300"
          variant={"ghost"}
          status={state.requestStatus}
        />

        <Commands text={text} setText={setText} focusTextArea={focusTextArea} />
      </div>
    </div>
  );
};

export default ChatBotInput;
