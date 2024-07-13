import { IconList } from "@allTypes";

const PageHeader: React.FC<IconList> = ({ title, description, Icon }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex gap-2.5 items-center">
        <Icon className="size-[44px] text-primary stroke-[1.75px]" />
        <h1 className="text-primary">{title}</h1>
      </div>
      <p className="text-description">{description}</p>
    </div>
  );
};

export default PageHeader;
