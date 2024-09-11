import { Difficulty } from "@/types";
import { DURATION_PER_CQ, DURATION_PER_MCQ } from "@/utils/constants";

export const difficultyValue = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 1;
    case Difficulty.MEDIUM:
      return 2;
    case Difficulty.HARD:
      return 3;
    default:
      return 2;
  }
};

type DurationProps = {
  difficulty: Difficulty;
  mcqs: number;
  cqs: number;
};

export const calculateDuration = ({ difficulty, cqs, mcqs }: DurationProps) => {
  return Math.round(
    (mcqs * DURATION_PER_MCQ + cqs * DURATION_PER_CQ) /
      difficultyValue(difficulty)
  );
};
