import { IconFileUpload } from "@tabler/icons-react";

import { TableAction, Column, IconList } from "@allTypes";
import { fileTypeIcons } from "./file";
import { routes } from "../routes";

export const home: IconList = {
  title: "Uploads",
  Icon: IconFileUpload,
  description: "Manage all your uploads here!",
};

export const create = {
  title: "Add your file",
  description: "Drag and drop your files here to start uploading.",
};

export const search = {
  key: "title",
  placeholder: "Search by title",
};

export const columnConfig: {
  columns: Column[];
  actions: TableAction[];
} = {
  columns: [
    {
      type: "link",
      accessorKey: "title",
      title: "Title",
      formatter: (title) => {
        return title as string;
      },
      linkKey: "id",
      path: routes.dashboard.uploads,
      Icon(props) {
        return fileTypeIcons({
          key: "type",
          value: props.value,
        });
      },
      iconClassName() {
        return "text-primary";
      },
    },
    {
      type: "no_link",
      accessorKey: "type",
      title: "Type",
      formatter: (type) => {
        return type as string;
      },
    },
    {
      type: "no_link",
      accessorKey: "createDate",
      title: "Create Date",
      formatter: (date) => {
        return new Date(date as string).toLocaleDateString();
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
