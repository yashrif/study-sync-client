import { Dispatch, SetStateAction } from "react";

import { Qna, Difficulty as TDifficulty } from "@/types";
import Difficulty from "./Difficulty";
import Title from "./Title";
import Heading from "../../components/Heading";
import { qnaDetails } from "@/assets/data/dashboard/qna";

type Props = {
  data: Qna;
  setData: Dispatch<SetStateAction<Qna | undefined>>;
  difficulty: TDifficulty;
  setDifficulty: Dispatch<SetStateAction<TDifficulty>>;
};

const Editable: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={qnaDetails.preferences.title}
        Icon={qnaDetails.preferences.Icon}
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
