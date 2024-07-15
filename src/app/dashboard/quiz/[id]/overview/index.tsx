"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { quizDetails } from "@/assets/data/dashboard/quiz";
import { Quiz, Difficulty as TDifficulty } from "@/types";
import Heading from "../components/Heading";
import Property from "../components/Property";
import Editable from "./editable";
import { DURATION_PER_CQ, DURATION_PER_MCQ } from "@/utils/constants";

type Props = {
  data: Quiz;
  setData: Dispatch<SetStateAction<Quiz | undefined>>;
};

const Overview: React.FC<Props> = (props) => {
  const [difficulty, setDifficulty] = useState<TDifficulty>(TDifficulty.MEDIUM);
  const difficultyValue = useMemo(() => {
    switch (difficulty) {
      case TDifficulty.EASY:
        return 0.5;
      case TDifficulty.MEDIUM:
        return 1;
      case TDifficulty.HARD:
        return 1.5;
      default:
        return 1;
    }
  }, [difficulty]);

  const { data } = props;
  const { mcq, cq, questions, duration } = quizDetails.properties.fields;

  return (
    <div className="fixed w-[280px] flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Heading
          title={quizDetails.overview.title}
          Icon={quizDetails.overview.Icon}
        />
        <div>
          <quizDetails.overview.descriptionIcon className="float-left size-[18px] text-yellow-500 mr-2 mt-0.5 align-middle" />
          <p className="text-description">{quizDetails.overview.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Editable
          {...props}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
        <div className="flex flex-col gap-4">
          <Heading
            title={quizDetails.properties.title}
            Icon={quizDetails.properties.Icon}
            size="sm"
          />
          <div className="flex flex-col gap-2">
            {[
              { ...mcq, value: data.mcqs?.length || 0 },
              { ...cq, value: data.cqs?.length || 0 },
              {
                ...questions,
                value: (data.mcqs?.length || 0) + (data.cqs?.length || 0),
              },
              {
                ...duration,
                value: `${Math.round(((data.mcqs?.length || 0) * DURATION_PER_MCQ + (data.cqs?.length || 0) * DURATION_PER_CQ) / difficultyValue)}m`,
              },
            ].map((field) => {
              return (
                <div
                  key={field.title}
                  className="flex gap-16 justify-between items-center text-medium"
                >
                  <Property title={field.title} Icon={field.Icon} />
                  <span className="text-medium text-text-200 capitalize">
                    {`${field.value}`.toLocaleLowerCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
