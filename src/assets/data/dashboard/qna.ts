import {
  IconArrowsSort,
  IconFile,
  IconFileTypeDocx,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
  IconFileTypePpt,
  IconFolderPlus,
  IconMessages,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";

import { FileTypes } from "@/types/upload";
import { Button, Column, Icon } from "@allTypes";
import { MixerVertical } from "@icons";

export const home: IconList = {
  title: "Q&A",
  Icon: IconMessages,
  description: "Generate and manage all your Q&A here!",
};

export const create = {
  title: "Generate Q&A from documents",
  description:
    "Select or upload documents to generate Q&A from! Uploaded documents will be saved in the library which can be accessed later.",
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
      iconKey: "type",
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

export const fileIcons = (type: FileTypes) => {
  switch (type) {
    case FileTypes.PDF:
      return IconFileTypePdf;
    case FileTypes.JPG:
      return IconFileTypeJpg;
    case FileTypes.JPEG:
      return IconFileTypeJpg;
    case FileTypes.PNG:
      return IconFileTypePng;
    case FileTypes.DOC:
      return IconFileTypeDocx;
    case FileTypes.PPT:
      return IconFileTypePpt;
    default:
      return IconFile;
  }
};
