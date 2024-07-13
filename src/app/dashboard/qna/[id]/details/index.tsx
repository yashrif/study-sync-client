import { Qna } from "@/types";
import Heading from "../components/Heading";

type Props = {
  data: Qna;
};

const Details: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6">
      <Heading title={data.title} />
    </div>
  );
};

export default Details;
