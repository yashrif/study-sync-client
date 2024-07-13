import {
  IconBookmarks,
  IconClock,
  IconHistory,
  IconListCheck,
  IconMessages,
  IconNotes,
  IconSettings,
  IconSquarePlus2,
  IconStack2,
  IconTextSize,
  IconTrash,
  IconWriting,
} from "@tabler/icons-react";

import { dateFormatter } from "@/utils/dateFormatter";
import { Column, ColumnConfig, IconList } from "@allTypes";
import { fileTypeIcons } from "./file";

export const home: IconList = {
  title: "Q&A",
  Icon: IconMessages,
  description: "Generate and manage all your Q&A here!",
};

export const create = {
  title: "Generate Q&As",
  Icon: IconSquarePlus2,
  description:
    "Select or upload documents to generate Q&A from! Uploaded documents will be saved in the library which can be accessed later.",
};

export const search = {
  key: "title",
  placeholder: "Search by title",
};

export const isIndexedData: Column = {
  accessorKey: "isIndexed",
  title: "Index Status",
  headerClassName: "hidden",
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
      headerClassName: "invisible",
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
      headerClassName: "hidden",
      formatter: (date) => {
        return dateFormatter(date as string, "numeric");
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

export const recent = {
  title: "Recent Q&As",
  Icon: IconHistory,
  description:
    "Here are the 10 most recent Q&As you generated. Click to view the details.",
  actions: [
    {
      title: "Delete",
      Icon: IconTrash,
      className: "!text-destructive",
      onClick: () => console.log("Delete"),
    },
  ],
};

export const qnaDetails = {
  title: "Q&A Details",
  Icon: IconMessages,
  description:
    "View the details of the Q&A you generated. You can also evaluate and delete the Q&A.",
  overview: {
    title: "Overview",
    Icon: IconBookmarks,
    fields: {
      title: {
        title: "Title",
        Icon: IconTextSize,
      },
      mcq: {
        title: "MCQs",
        Icon: IconListCheck,
      },
      cq: {
        title: "CQs",
        Icon: IconWriting,
      },
      questions: {
        title: "Total Questions",
        Icon: IconNotes,
      },
      duration: {
        title: "Duration",
        Icon: IconClock,
      },
      difficulty: {
        title: "Difficulty",
        Icon: IconStack2,
      },
    },
  },

  settings: {
    title: "Settings",
    Icon: IconSettings,
    actions: {
      difficulty: {
        title: "Difficulty",
        Icon: IconStack2,
      },
    },
  },
};

export const defaultValues = {
  title: "Untitled",
};
