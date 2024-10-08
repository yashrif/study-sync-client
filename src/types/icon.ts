import { IconProps, Icon as IconType } from "@tabler/icons-react";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type IconAlt =
  | ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >
  | ForwardRefExoticComponent<IconProps & RefAttributes<IconType>>
  | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  | React.FC
  | ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;

export type Icon = React.ComponentType<{ className?: string }>;
