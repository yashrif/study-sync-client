"use client";

import IconButton from "@/components/button/IconButton";
import "@babel/polyfill";
import {
  IconInfoCircleFilled,
  IconMicrophone,
  IconMicrophoneOff,
  IconSquareFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "regenerator-runtime/runtime";

const Dictaphone = () => {
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

  if (!isBrowser || !SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="flex items-center gap-2">
        <IconInfoCircleFilled className="size-[18px] fill-destructive" />
        <span className="text-lg font-medium">
          Sorry, your browser does not support speech recognition.
        </span>
      </div>
    );
  }

  return (
    <div>
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
        className="size-10 rounded-full"
        iconClassName={
          listening ? "size-4 fill-white" : "size-6 stroke-primary"
        }
        onClick={() => {
          if (listening) {
            stopListening();
          } else {
            startListening();
          }
        }}
      />
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;
