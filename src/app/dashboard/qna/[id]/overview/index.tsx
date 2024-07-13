"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { Difficulty, Qna } from "@/types";
import Properties from "./Properties";
import Settings from "./Settings";

type Props = {
  data: Qna;
  setData: Dispatch<SetStateAction<Qna | undefined>>;
};

const Overview: React.FC<Props> = (props) => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const difficultyValue = useMemo(() => {
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
  }, [difficulty]);

  return (
    <div className="flex flex-col gap-12">
      <Properties
        difficulty={difficulty}
        difficultyValue={difficultyValue}
        {...props}
      />
      <Settings
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        {...props}
      />
    </div>
  );
};

export default Overview;
