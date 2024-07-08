import {
  IconArrowsSort,
  IconFileUpload,
  IconFolderPlus,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import { Button, Column, IconList } from "@allTypes";
import { MixerVertical } from "@icons";

export const home: IconList = {
  title: "Uploads",
  Icon: IconFileUpload,
  description: "Manage all your uploads here!",
};

export const create = {
  title: "Add your file",
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
  key: "title",
  placeholder: "Search by title",
};

export const columnConfig: {
  columns: Column[];
  actions: Button[];
} = {
  columns: [
    {
      accessorKey: "title",
      title: "title",
      formatter: (title) => {
        return title as string;
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
