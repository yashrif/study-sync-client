import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconSquareFilled,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Difficulty } from "@/types";
import Heading from "../../_components/Heading";
import { calculateDuration } from "../difficultyValue";

const Timer = () => {
  const {
    state: { quiz, formRef },
  } = useQuizContext();
  const difficulty = useQueryString().getQueryString(
    queryParams.difficulty.name
  ) as Difficulty;

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const duration = useMemo(() => {
    return {
      minutes: Math.floor(seconds / 60),
      seconds: seconds % 60,
    };
  }, [seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive) {
      if (seconds === 0) {
        formRef.current?.submit();
        setIsActive(false);
      }
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [formRef, isActive, seconds]);

  const resetTimer = useCallback(() => {
    setSeconds(
      calculateDuration({
        difficulty,
        cqs: quiz.cqs?.length || 0,
        mcqs: quiz.mcqs?.length || 0,
      })
    );
  }, [difficulty, quiz.cqs?.length, quiz.mcqs?.length]);

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);

  return (
    <Heading
      title={quizDetails.timer.title}
      Icon={quizDetails.timer.Icon}
      size="sm"
      collapsible
    >
      <div className="w-full flex gap-4 justify-center items-center px-8 py-4 ring-2 ring-inset ring-secondary rounded-xl">
        <div className="text-2xl font-secondary text-secondary font-semibold flex gap-0.5 items-center">
          {/* <span>{toTwoDigits(duration.hours)}</span>
          <span>:</span> */}
          <span>{toTwoDigits(duration.minutes)}</span>
          <span>:</span>
          <span>{toTwoDigits(duration.seconds)}</span>
        </div>

        {seconds === 0 ? (
          <IconSquareFilled
            className="fill-secondary size-6 cursor-pointer"
            onClick={() => {
              resetTimer();
              formRef.current?.clear();
            }}
          />
        ) : isActive ? (
          <IconPlayerPauseFilled
            className="fill-secondary size-6 cursor-pointer"
            onClick={() => {
              setIsActive(false);
            }}
          />
        ) : (
          <IconPlayerPlayFilled
            className="fill-secondary size-6 cursor-pointer"
            onClick={() => {
              setIsActive(true);
            }}
          />
        )}
      </div>
    </Heading>
  );
};

export default Timer;

const toTwoDigits = (num: number) => {
  return num.toString().padStart(2, "0");
};
