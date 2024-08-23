import {
  IconAdjustmentsHorizontal,
  IconArrowsSort,
  IconCircleX,
  IconDeviceFloppy,
  IconFolderPlus,
  IconSearch,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import { Button } from "@/types";

export const controlBar: {
  upload: Button;
  addFolder: Button;
  sort: Button;
  view: Button;
  delete: Button;
  search: Button;
  save: Button;
  close: Button;
  study: Button;
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
    Icon: IconAdjustmentsHorizontal,
    variant: "outline",
    size: "sm",
  },
  study: {
    title: "Study",
    Icon: IconAdjustmentsHorizontal,
    variant: "outline",
    size: "sm",
  },
  delete: {
    title: "Delete",
    Icon: IconTrash,
    variant: "destructive",
    size: "sm",
  },
  search: {
    title: "Search by name",
    Icon: IconSearch,
    variant: "outline",
    size: "sm",
  },
  save: {
    title: "Save",
    Icon: IconDeviceFloppy,
    variant: "default",
    size: "sm",
  },
  close: {
    title: "Close",
    Icon: IconCircleX,
    variant: "outline",
    size: "sm",
    className: "ring-destructive",
    contentClassName: "text-destructive hover:text-destructive",
    iconClassName: "stroke-destructive",
  },
};
