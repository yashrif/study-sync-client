import { qnaDetails } from "@/assets/data/dashboard/qna";
import { Difficulty, Qna } from "@/types";
import { Dispatch, SetStateAction } from "react";
import Heading from "../components/Heading";
import Property from "../components/Property";
import Title from "./Title";

type Props = {
  data: Qna;
  setData: Dispatch<SetStateAction<Qna | undefined>>;
  difficulty: Difficulty;
  difficultyValue: number;
};

const Properties: React.FC<Props> = ({
  data,
  setData,
  difficulty,
  difficultyValue,
}) => {
  const {
    title,
    mcq,
    cq,
    questions,
    duration,
    difficulty: difficultyObj,
  } = qnaDetails.overview.fields;

  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={qnaDetails.overview.title}
        Icon={qnaDetails.overview.Icon}
      />

      <div className="flex flex-col gap-2">
        <Title data={data} setData={setData} />

        {[
          { ...mcq, value: data.mcqs.length },
          { ...questions, value: data.mcqs.length },
          {
            ...duration,
            value: `${Math.round(data.mcqs.length / difficultyValue)}m`,
          },
          { ...difficultyObj, value: difficulty },
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
  );
};

export default Properties;
