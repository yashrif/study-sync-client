import { Dispatch, SetStateAction } from "react";

import { preview } from "@/assets/data/dashboard/quiz";
import { Input } from "@components/ui/input";

type Props = {
  title: string | undefined;
  setTitle: Dispatch<SetStateAction<string | undefined>>;
};

const Title: React.FC<Props> = ({ title, setTitle }) => {
  return (
    <Input
      type={preview.fields.title.type}
      id={preview.fields.title.id}
      placeholder={preview.fields.title.placeholder}
      required={preview.fields.title.required}
      dimension={"sm"}
      Icon={preview.fields.title.Icon}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="min-w-[320px] w-full rounded-sm border-primary placeholder:text-muted-foreground/70"
    />
  );
};

export default Title;
