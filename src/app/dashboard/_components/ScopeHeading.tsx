import { IconList } from "@/types";

const ScopeHeading: React.FC<IconList> = ({ title, Icon, description }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center text-primary">
        {Icon && <Icon className="size-6 stroke-[2.5]" />}
        <h3 className="text-primary">{title}</h3>
      </div>
      {description && (
        <p className="text-medium text-text-200 max-w-prose">{description}</p>
      )}
    </div>
  );
};

export default ScopeHeading;
