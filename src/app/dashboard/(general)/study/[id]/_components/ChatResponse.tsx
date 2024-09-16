"use client";

import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUploadsContext } from "@/hooks/useUploadsContext";
import { UploadsActionType } from "@/types";

const ChatResponse = () => {
  const {
    state: { chatResponse },
    dispatch,
  } = useUploadsContext();

  return (
    <Card className="bg-transparent backdrop-blur-md flex-1 space-y-2 max-w-4xl  mb-2 shadow-xl mx-12 pt-6">
      <CardContent className="flex flex-col space-y-2 items-center">
        <ScrollArea className="max-h-56 overflow-auto w-full">
          <Markdown className="markdown">{chatResponse}</Markdown>
        </ScrollArea>
        <Button
          className="w-48"
          onClick={() => {
            dispatch({
              type: UploadsActionType.SET_SHOW_RESPONSE,
              payload: false,
            });
          }}
        >
          Close
        </Button>
      </CardContent>
    </Card>
  );
};

export default ChatResponse;
