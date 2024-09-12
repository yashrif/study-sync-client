"use client";

import { IconSend2, IconX } from "@tabler/icons-react";
import { useState } from "react";

import studySyncAI from "@/api/studySyncAI";
import { queryFile } from "@/assets/data/api/ai";
import { actions } from "@/assets/data/dashboard/study";
import IconButton from "@/components/button/IconButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { UploadsActionType } from "@/types";
import { Status } from "@/types/status";

const ChatAI = () => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [text, setText] = useState<string>("");
  const {
    state: { selectedText, currentStudy },
    dispatch,
  } = useUploadsContext();

  const submitChat = async (instruction: string) => {
    setStatus(Status.PENDING);
    try {
      const response = await studySyncAI.post(queryFile, {
        query: instruction,
        fileId: currentStudy,
      });
      if (response.status == 200) {
        setStatus(Status.SUCCESS);
        dispatch({
          type: UploadsActionType.SET_CHAT_RESPONSE,
          payload: response.data,
        });
        dispatch({
          type: UploadsActionType.SET_SHOW_RESPONSE,
          payload: true,
        });
      }
    } catch (err) {
      setStatus(Status.ERROR);
    } finally {
      setStatus(Status.IDLE);
    }
  };

  return (
    <Card className="bg-transparent backdrop-blur-md flex-1 space-y-2 max-w-4xl  mb-2 shadow-xl mx-12 pt-6">
      <CardContent className="flex flex-col gap-4">
        {!selectedText ? (
          <Textarea
            className="p-2 text-md bg-transparent backdrop-blur-3xl"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        ) : (
          <ScrollArea className="max-h-48 overflow-auto bg-transparent backdrop-blur-3xl">
            <p className="text-md pt-8">“{selectedText}”</p>
            <Button
              size="icon"
              variant={"outline"}
              className="absolute right-0 top-0 size-6 rounded-full ring-destructive hover:bg-destructive/20"
              onClick={() => {
                dispatch({
                  type: UploadsActionType.SET_SELECTED_TEXT,
                  payload: "",
                });
              }}
            >
              <IconX className="size-4 stroke-destructive" />
            </Button>
          </ScrollArea>
        )}

        <div className="flex justify-between">
          <div className="flex gap-x-4">
            {actions.map((item) => (
              <button
                onClick={() => submitChat(item.instruction + selectedText)}
                key={item.name}
                className={`text-[15px] nav-links px-0.5 ${
                  selectedText
                    ? "text-primary"
                    : "text-muted-foreground pointer-events-none"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {!selectedText && (
            <IconButton
              Icon={IconSend2}
              onClick={() => submitChat(text)}
              className="size-9 rounded-full"
              status={status}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatAI;
