import { Icon } from "@allTypes";

export type Link = {
  title: string;
  href: string;
};

export type IconLink = Link & {
  Icon: Icon;
};
