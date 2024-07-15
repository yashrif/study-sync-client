import { Dispatch, forwardRef, SetStateAction } from "react";

import { FormHandle } from "@/app/dashboard/types/form-handle";
import { Quiz } from "@/types";
import Heading from "../_components/Heading";
import McqsList from "./McqList";
import { useQuizContext } from "@/hooks/useQuizContext";

const Details = forwardRef<
  FormHandle,
  React.FormHTMLAttributes<HTMLFormElement>
>((_, ref) => {
  Details.displayName = "Quiz Details";

  const {
    state: {
      quiz: { title },
    },
  } = useQuizContext();

  return (
    <div className="flex flex-col gap-8 h-full">
      <Heading title={title} />

      <McqsList ref={ref} />
    </div>
  );
});

export default Details;
