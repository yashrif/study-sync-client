import { Icon, IconProps } from "@tabler/icons-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type List = {
  title: string;
  description: string;
};

export type IconList = List & {
  Icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};
