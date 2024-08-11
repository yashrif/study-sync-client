import { Dispatch, SetStateAction } from "react";

import { review } from "@/assets/data/dashboard/planner";
import { Input } from "@/components/ui/input";

type Props = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

const Title: React.FC<Props> = ({ title, setTitle }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex gap-1.5 items-center">
        {review.fields.title.Icon && (
          <review.fields.title.Icon className="size-5 stroke-primary stroke-[2.5px]" />
        )}
        <label
          htmlFor={review.fields.title.id}
          className="text-large font-medium text-primary"
        >
          {review.fields.title.label}
        </label>
      </div>
      <Input
        id={review.fields.title.id}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="min-w-96 max-w-sm"
      />
    </div>
  );
};

export default Title;
