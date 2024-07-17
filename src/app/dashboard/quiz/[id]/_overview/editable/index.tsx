import { quizDetails } from "@/assets/data/dashboard/quiz";
import Heading from "../../_components/Heading";
import Difficulty from "./Difficulty";
import Title from "./Title";
import Type from "./Type";

const Editable: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <Heading
        title={quizDetails.preferences.title}
        Icon={quizDetails.preferences.Icon}
        size="sm"
      />
      <div className="flex flex-col gap-2">
        <Title />
        <Difficulty />
        <Type />
      </div>
    </div>
  );
};

export default Editable;
