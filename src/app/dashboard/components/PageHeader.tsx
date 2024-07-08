import { IconList } from "@allTypes";

const PageHeader: React.FC<IconList> = ({ title, description, Icon }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-1.5 items-center">
        <Icon className="size-[44px] text-text-400 stroke-[1.75px]" />
        <h1 className="text-text-400">{title}</h1>
      </div>
      <p className="text-description">{description}</p>
    </div>
  );
};

export default PageHeader;
