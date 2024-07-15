import { Dispatch, forwardRef, SetStateAction } from "react";

import { FormHandle } from "@/app/dashboard/types/form-handle";
import { Quiz } from "@/types";
import Heading from "../components/Heading";
import McqsList from "./McqList";

type Props = React.FormHTMLAttributes<HTMLFormElement> & {
  data: Quiz;
  setPoints: Dispatch<SetStateAction<number | undefined>>;
};

const Details = forwardRef<FormHandle, Props>(({ data, setPoints }, ref) => {
  Details.displayName = "Quiz Details";

  return (
    <div className="flex flex-col gap-8 h-full">
      <Heading title={data.title} />
      {data.mcqs && (
        <McqsList ref={ref} mcqs={data.mcqs} setPoints={setPoints} />
      )}
    </div>
  );
});

export default Details;
