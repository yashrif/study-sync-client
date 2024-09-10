import { IconPlayerPlayFilled, IconSquareFilled } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Difficulty, QuizActionType, QuizTypes } from "@/types";
import Heading from "../../_components/Heading";
import { calculateDuration } from "../difficultyValue";

const Timer = () => {
  const { checkQueryString } = useQueryString();

  const isMcqs = checkQueryString(queryParams.types.key, QuizTypes.MCQ);
  const isCqs = checkQueryString(queryParams.types.key, QuizTypes.CQ);

  const {
    state: { quiz, formRef, isTimerActive },
    dispatch,
  } = useQuizContext();
  const difficulty = useQueryString().getQueryString(
    queryParams.difficulty.name
  ) as Difficulty;

  const [seconds, setSeconds] = useState(0);

  const duration = useMemo(() => {
    return {
      minutes: Math.floor(seconds / 60),
      seconds: seconds % 60,
    };
  }, [seconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isTimerActive) {
      if (seconds === 0) {
        formRef.current?.submit();
        dispatch({
          type: QuizActionType.SET_IS_TIMER_ACTIVE,
          payload: false,
        });
      }
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [dispatch, formRef, isTimerActive, seconds]);

  const resetTimer = useCallback(() => {
    setSeconds(
      calculateDuration({
        difficulty,
        cqs: isCqs ? quiz.cqs?.length || 0 : 0,
        mcqs: isMcqs ? quiz.mcqs?.length || 0 : 0,
      })
    );
  }, [difficulty, isCqs, isMcqs, quiz.cqs?.length, quiz.mcqs?.length]);

  useEffect(() => {
    if (!isTimerActive) resetTimer();
  }, [isTimerActive, resetTimer]);

  return (
    <Heading
      title={quizDetails.timer.title}
      Icon={quizDetails.timer.Icon}
      size="sm"
      collapsible
    >
      <div className="w-full flex gap-4 justify-center items-center px-8 py-4 ring-2 ring-inset ring-secondary rounded-xl">
        <div className="text-2xl font-secondary text-secondary font-semibold flex gap-0.5 items-center">
          <span>{toTwoDigits(duration.minutes)}</span>
          <span>:</span>
          <span>{toTwoDigits(duration.seconds)}</span>
        </div>

        {seconds === 0 || isTimerActive ? (
          <IconSquareFilled
            className="fill-destructive size-6 cursor-pointer"
            onClick={() => {
              resetTimer();
              formRef.current?.clear();
              dispatch({
                type: QuizActionType.SET_IS_TIMER_ACTIVE,
                payload: false,
              });
            }}
          />
        ) : (
          <IconPlayerPlayFilled
            className="fill-secondary size-6 cursor-pointer"
            onClick={() => {
              formRef.current?.clear();
              dispatch({
                type: QuizActionType.SET_IS_TIMER_ACTIVE,
                payload: true,
              });
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
