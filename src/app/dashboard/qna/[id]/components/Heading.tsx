import { Icon } from "@/types";

type Props = {
  title: string | null;
  Icon?: Icon;
};
const Heading: React.FC<Props> = ({ title, Icon }) => {
  return (
    <div className="flex gap-2 items-center text-primary">
      {Icon && <Icon className="size-5 stroke-[2.5]" />}
      <h6 className="text-primary">{title}</h6>
    </div>
  );
};

export default Heading;
