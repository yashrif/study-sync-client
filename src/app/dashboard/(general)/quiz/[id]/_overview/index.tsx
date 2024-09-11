"use client";

import { IconX } from "@tabler/icons-react";

import { queryParams, quizDetails } from "@/assets/data/dashboard/quiz";
import { useQueryString } from "@/hooks/useQueryString";
import { useQuizContext } from "@/hooks/useQuizContext";
import { QuizActionType, Difficulty as TDifficulty } from "@/types";
import Heading from "../_components/Heading";
import Property from "../_components/Property";
import Difficulty from "./components/Difficulty";
import PdfViewer from "./components/pdf";
import Timer from "./components/Timer";
import Title from "./components/Title";
import Type from "./components/Type";
import { calculateDuration } from "./difficultyValue";

const Overview: React.FC = () => {
  const {
    state: { quiz: data },
    dispatch,
  } = useQuizContext();
  const difficulty = useQueryString().getQueryString(
    queryParams.difficulty.name
  ) as TDifficulty;

  const { mcq, cq, questions, duration } = quizDetails.properties.fields;

  return (
    <div className="fixed w-[344px] h-[calc(100%-200px)] flex flex-col gap-8 overflow-y-scroll no-scrollbar pr-16">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-16">
          <Heading
            title={quizDetails.overview.title}
            Icon={quizDetails.overview.Icon}
          />
          {/* TODO: add a relevant icon here */}
          <IconX
            className="size-6 text-destructive/50 hover:scale-110 cursor-pointer transition-all duration-300"
            onClick={() => {
              dispatch({
                type: QuizActionType.SET_IS_SHOW_OVERVIEW,
                payload: false,
              });
            }}
          />
        </div>
        <div>
          <quizDetails.overview.descriptionIcon className="float-left size-[18px] text-yellow-500 mr-2 mt-0.5 align-middle" />
          <p className="text-description">{quizDetails.overview.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Heading
          title={quizDetails.preferences.title}
          Icon={quizDetails.preferences.Icon}
          size="sm"
          collapsible
        >
          <div className="flex flex-col gap-2">
            <Title />
            <Difficulty />
            <Type />
          </div>
        </Heading>
        <Heading
          title={quizDetails.properties.title}
          Icon={quizDetails.properties.Icon}
          collapsible
          size="sm"
        >
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
                value: `${Math.ceil(
                  calculateDuration({
                    difficulty,
                    cqs: data.cqs?.length || 0,
                    mcqs: data.mcqs?.length || 0,
                  }) / 60
                )}m`,
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
        </Heading>
      </div>

      <Timer />

      <PdfViewer />
    </div>
  );
};

export default Overview;
