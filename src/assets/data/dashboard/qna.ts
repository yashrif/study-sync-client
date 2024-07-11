import { IconMessages } from "@tabler/icons-react";

import { Column, ColumnConfig, IconList } from "@allTypes";
import { fileTypeIcons } from "./file";

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
  key: "title",
  placeholder: "Search by title",
};

export const isIndexedData: Column = {
  accessorKey: "isIndexed",
  title: "Indexing Status",
  formatter: (isIndexed) => {
    return isIndexed ? "Indexed" : "Not Indexed";
  },
  Icon(props) {
    return fileTypeIcons(props);
  },
  className(props) {
    return `${props ? "text-success" : "text-destructive"}`;
  },
  iconClassName(props) {
    return props ? "text-success" : "text-destructive";
  },
};

export const columnConfig: ColumnConfig = {
  columns: [
    {
      accessorKey: "title",
      title: "Document",
      formatter: (title) => {
        return title as string;
      },
      linkKey: "id",
      className() {
        return "text-base no-underline font-semibold";
      },
    },
    {
      accessorKey: "name",
      title: "Name",
      formatter: (type) => {
        return type as string;
      },
      Icon(props) {
        return fileTypeIcons({
          key: "type",
          value: props.value,
        });
      },
    },
    {
      accessorKey: "createDate",
      title: "Create Date",
      formatter: (date) => {
        return new Date(date as string).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      Icon(props) {
        return fileTypeIcons(props);
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
