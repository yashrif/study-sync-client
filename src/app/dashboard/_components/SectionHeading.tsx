import { IconList } from "@/types";

const SectionHeading: React.FC<IconList> = ({ title, Icon, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-primary">
        <Icon className="size-[30px] stroke-[2.5]" />
        <h2>{title}</h2>
      </div>
      {description && (
        <p className="text-medium text-text-200 max-w-prose">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
