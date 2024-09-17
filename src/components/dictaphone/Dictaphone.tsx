"use client";

import "@babel/polyfill";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconSquareFilled,
} from "@tabler/icons-react";
import { cva } from "class-variance-authority";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

import IconButton from "@/components/button/IconButton";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  iconPadding?: number;
  setTranscript: Dispatch<SetStateAction<string>>;
};

const dictaphoneVariants = cva("size-9 p-0 rounded-full", {
  variants: {
    type: {
      ready: "",
      error: " pointer-events-none",
    },
    variant: {
      default: "",
      ghost: "hover:bg-transparent",
    },
    defaultValues: {
      type: "ready",
      variant: "default",
    },
  },
});

const DictaphoneComponent: React.FC<Props> = ({
  setTranscript,
  className,
  iconPadding,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
  const { transcript, listening } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  useEffect(() => {
    setIsBrowser(typeof window !== "undefined");

    const checkMicrophoneAccess = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setHasMicrophoneAccess(true);
        stream.getTracks().forEach((track) => track.stop());
      } catch (err) {
        setHasMicrophoneAccess(false);
      }
    };

    if (isBrowser) {
      checkMicrophoneAccess();
    }
  }, [isBrowser]);

  useEffect(() => {
    setTranscript(transcript);
  }, [setTranscript, transcript]);

  if (!isBrowser || !SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <IconButton
        contentType="icon-only"
        Icon={IconMicrophoneOff}
        variant={"ghost"}
        className={cn(dictaphoneVariants({ className, type: "error" }))}
        iconClassName="size-6 stroke-destructive"
      />
    );
  }

  return (
    <IconButton
      contentType="icon-only"
      Icon={
        hasMicrophoneAccess
          ? listening
            ? IconSquareFilled
            : IconMicrophone
          : IconMicrophoneOff
      }
      variant={listening ? "default" : "ghost"}
      className={cn(
        dictaphoneVariants({
          className,
          variant: listening ? "default" : "ghost",
        })
      )}
      containerClassName="h-full w-full"
      iconClassName={
        listening
          ? `h-full w-auto fill-white ${iconPadding ? `p-[${iconPadding}px]` : "p-1.5"}`
          : "h-full w-auto stroke-primary hover:stroke-primary/75 transition-all duration-300"
      }
      onClick={() => {
        if (listening) {
          stopListening();
        } else {
          startListening();
        }
      }}
    />
  );
};

export default DictaphoneComponent;
