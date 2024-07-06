import { MixerVertical } from "@/components/icons";
import { ButtonSize, ButtonVariant } from "@/types";
import { Icon } from "@allTypes";
import {
  IconAdjustments,
  IconArrowsSort,
  IconFolderPlus,
  IconUpload,
} from "@tabler/icons-react";

export const home = {
  title: "Hello, Yashrif",
  description: "Manage all your documents here!",
};

export const create = {
  title: "Add your documents",
  description: "Drag and drop your files here to start uploading.",
};

type NavbarButtonType = {
  title: string;
  Icon: Icon;
  variant: ButtonVariant;
  size: ButtonSize;
};

export const navbarButtons: {
  upload: NavbarButtonType;
  addFolder: NavbarButtonType;
  sort: NavbarButtonType;
  view: NavbarButtonType;
} = {
  upload: {
    title: "Upload",
    Icon: IconUpload,
    variant: "default",
    size: "sm",
  },
  addFolder: {
    title: "Add folder",
    Icon: IconFolderPlus,
    variant: "outline",
    size: "sm",
  },
  sort: {
    title: "Sort",
    Icon: IconArrowsSort,
    variant: "outline",
    size: "sm",
  },
  view: {
    title: "View",
    Icon: MixerVertical,
    variant: "outline",
    size: "sm",
  },
};
