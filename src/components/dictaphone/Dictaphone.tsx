"use client";

import "@babel/polyfill";
import {
  IconMicrophone,
  IconMicrophoneOff,
  IconSquareFilled,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

import IconButton from "@/components/button/IconButton";

type Props = {
  setTranscript: Dispatch<SetStateAction<string>>;
};

const DictaphoneComponent: React.FC<Props> = ({ setTranscript }) => {
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
        className="size-9 rounded-full pointer-events-none"
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
      className="size-9 rounded-full"
      iconClassName={listening ? "size-4 fill-white" : "size-6 stroke-primary"}
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
