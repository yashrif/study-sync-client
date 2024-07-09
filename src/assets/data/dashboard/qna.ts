import { IconMessages } from "@tabler/icons-react";

import { Button, Column, IconList } from "@allTypes";

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
