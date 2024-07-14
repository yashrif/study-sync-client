import { Icon } from "@/types";

type Props = {
  title: string | null;
  Icon?: Icon;
  size?: "sm" | "md";
};
const Heading: React.FC<Props> = ({ title, Icon, size = "md" }) => {
  return (
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
  );
};

export default Heading;
