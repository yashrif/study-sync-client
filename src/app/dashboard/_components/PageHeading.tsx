import { IconList } from "@allTypes";

type Props = IconList & {
  className?: string;
  children?: React.ReactNode;
};

const PageHeading: React.FC<Props> = ({
  title,
  description,
  Icon,
  className,
  children,
}) => {
  return (
    <div className="sticky top-0 flex flex-col gap-4 w-full pt-8 pb-8 bg-background z-20">
      <div className={`flex justify-between items-center ${className}`}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2.5 items-center">
            <Icon className="size-[44px] text-primary stroke-[1.75px]" />
            <h1 className="text-primary">{title}</h1>
          </div>
          <p className="text-description">{description}</p>
        </div>
        {children}
      </div>
      <hr className="border-t-0 border-b-2" />
    </div>
  );
};

export default PageHeading;
