import { Difficulty } from "@/types";
import { DURATION_PER_CQ, DURATION_PER_MCQ } from "@/utils/constants";

export const difficultyValue = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 0.5;
    case Difficulty.MEDIUM:
      return 1;
    case Difficulty.HARD:
      return 1.5;
    default:
      return 1;
  }
};

type DurationProps = {
  difficulty: Difficulty;
  mcqs: number;
  cqs: number;
};

export const calculateDuration = ({ difficulty, cqs, mcqs }: DurationProps) => {
  return Math.round(
    ((mcqs * DURATION_PER_MCQ + cqs * DURATION_PER_CQ) * 60) /
      difficultyValue(difficulty)
  );
};
