import {
  IconArrowsSort,
  IconFolderPlus,
  IconSearch,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import { MixerVertical } from "@/components/icons";
import { Button } from "@/types";

export const controlBar: {
  upload: Button;
  addFolder: Button;
  sort: Button;
  view: Button;
  delete: Button;
  search: Button;
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
};
