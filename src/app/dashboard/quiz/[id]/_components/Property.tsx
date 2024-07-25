import { Icon } from "@/types";

type Props = {
  title: string;
  Icon: Icon;
};

const Property: React.FC<Props> = ({ title, Icon }) => {
  return (
    <div className="flex gap-2 items-center text-secondary-200">
      <Icon className="size-[18px] stroke-[2.5]" />
      <span>{title}</span>
    </div>
  );
};

export default Property;
