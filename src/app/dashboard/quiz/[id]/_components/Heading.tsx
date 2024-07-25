import { Icon } from "@/types";
import { IconChevronCompactDown, IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";
import { boolean } from "zod";

type Props = {
  title: string | null;
  Icon?: Icon;
  size?: "sm" | "md";
  children?: React.ReactNode;
  collapsible?: boolean;
};

const Heading: React.FC<Props> = ({
  title,
  Icon,
  size = "md",
  children,
  collapsible = false,
}) => {
  const [isExpended, setIsExtended] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`group flex gap-16 items-center justify-between ${collapsible ? "cursor-pointer" : ""}`}
        onClick={() => {
          setIsExtended(!isExpended);
        }}
      >
        <div className="flex gap-2 items-center text-primary">
          {Icon && (
            <Icon
              className={`${size === "md" ? "size-6" : "size-[18px]"} stroke-[2.5]`}
            />
          )}
          {size === "md" ? (
            <h3 className="text-primary">{title}</h3>
          ) : (
            <h6 className="text-primary">{title}</h6>
          )}
        </div>
        {collapsible && (
          <IconChevronDown
            className={`${size === "sm" ? "size-[18px]" : "size-6"} text-primary group-hover:scale-125 transition-all duration-300
              ${isExpended ? "rotate-0" : "rotate-180"}
              `}
          />
        )}
      </div>
      {isExpended && children}
    </div>
  );
};

export default Heading;
