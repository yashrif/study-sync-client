import {
  IconArrowsSort,
  IconFolderPlus,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import { Button, Column } from "@allTypes";
import { MixerVertical } from "@icons";

export const home = {
  title: "Hello, Yashrif",
  description: "Manage all your documents here!",
};

export const create = {
  title: "Add your documents",
  description: "Drag and drop your files here to start uploading.",
};

export const navbarButtons: {
  upload: Button;
  addFolder: Button;
  sort: Button;
  view: Button;
  delete: Button;
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
};

export const search = {
  key: "name",
  placeholder: "Search by name",
};

export const columnConfig: {
  columns: Column[];
  actions: Button[];
} = {
  columns: [
    {
      accessorKey: "name",
      title: "Name",
      formatter: (name) => {
        return name as string;
      },
      linkKey: "id",
    },
    {
      accessorKey: "type",
      title: "Type",
      formatter: (type) => {
        return type as string;
      },
    },
    {
      accessorKey: "createDate",
      title: "Create Date",
      formatter: (date) => {
        return new Date(date).toLocaleDateString();
      },
    },
  ],
  actions: [
    {
      title: "View",
      onClick: () => console.log("View"),
    },
    {
      title: "Delete",
      onClick: () => console.log("Delete"),
    },
  ],
};
