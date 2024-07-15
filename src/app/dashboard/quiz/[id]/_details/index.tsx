import { useQuizContext } from "@/hooks/useQuizContext";
import Heading from "../_components/Heading";
import McqsList from "./McqList";

const Details: React.FC = () => {
  const {
    state: {
      quiz: { title },
    },
  } = useQuizContext();

  return (
    <div className="flex flex-col gap-8 h-full">
      <Heading title={title} />
      <McqsList />
    </div>
  );
};

export default Details;
