import { Icon, IconProps } from "@tabler/icons-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type Link = {
  title: string;
  href: string;
};

export type IconLink = Link & {
  Icon:
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >
    | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};
