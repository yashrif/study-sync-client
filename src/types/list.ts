import { Icon } from "@allTypes";

export type List = {
  title: string;
  description: string;
};

export type IconList = List & {
  Icon: Icon;
};
