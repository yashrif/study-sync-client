import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import { Difficulty } from "@/types";
import { IconSquareFilled } from "@tabler/icons-react";
import { useMemo } from "react";
import Heading from "../../_components/Heading";
import { calculateDuration } from "../difficultyValue";

const Timer = () => {
  const {
    state: { quiz },
  } = useQuizContext();
  const difficulty = useQueryString().getQueryString(
    queryParams.difficulty.name,
  ) as Difficulty;

  const duration = useMemo(() => {
    const duration = calculateDuration({
      difficulty,
      cqs: quiz.cqs?.length || 0,
      mcqs: quiz.mcqs?.length || 0,
    });

    return {
      hours: Math.floor(duration / 60).toLocaleString(),
      minutes: duration % 60,
      seconds: 0,
    };
  }, [difficulty, quiz.cqs?.length, quiz.mcqs?.length]);

  //TODO: Implement timer feature

  //TODO: make all time units double digits
  return (
    <Heading
      title={quizDetails.timer.title}
      Icon={quizDetails.timer.Icon}
      size="sm"
      collapsible
    >
      <div className="w-full flex gap-4 justify-center items-center px-8 py-4 ring-2 ring-inset ring-secondary rounded-xl">
        <div className="text-2xl font-secondary text-secondary font-semibold flex gap-0.5 items-center">
          <span>{duration.hours}</span>
          <span>:</span>
          <span>{duration.minutes}</span>
          <span>:</span>
          <span>{duration.seconds}</span>
        </div>
        {/* TODO: change icons based on play/stop */}
        <IconSquareFilled className="fill-destructive size-6 cursor-pointer" />
      </div>
    </Heading>
  );
};

export default Timer;
