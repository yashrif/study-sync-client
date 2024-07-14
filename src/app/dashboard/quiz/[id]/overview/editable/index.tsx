import { Dispatch, SetStateAction } from "react";

import { Quiz, Difficulty as TDifficulty } from "@/types";
import Difficulty from "./Difficulty";
import Title from "./Title";
import Heading from "../../components/Heading";
import { quizDetails } from "@/assets/data/dashboard/quiz";

type Props = {
  data: Quiz;
  setData: Dispatch<SetStateAction<Quiz | undefined>>;
  difficulty: TDifficulty;
  setDifficulty: Dispatch<SetStateAction<TDifficulty>>;
};

const Editable: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={quizDetails.preferences.title}
        Icon={quizDetails.preferences.Icon}
        size="sm"
      />
      <div className="flex flex-col gap-2">
        <Title {...props} />
        <Difficulty {...props} />
      </div>
    </div>
  );
};

export default Editable;
