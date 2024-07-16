import {
  IconAdjustmentsCog,
  IconBookmarks,
  IconBulb,
  IconClock,
  IconHistory,
  IconListCheck,
  IconMessages,
  IconNotes,
  IconSquarePlus2,
  IconStack2,
  IconTextSize,
  IconTools,
  IconTrash,
  IconWriting,
} from "@tabler/icons-react";

import { Quiz } from "@/components/icons";
import { dateFormatter } from "@/utils/dateFormatter";
import { Column, ColumnConfig, IconList, QuizTypes } from "@allTypes";
import { fileTypeIcons } from "./file";

export const home: IconList = {
  title: "Quiz",
  Icon: Quiz,
  description: "Generate and manage all your quizzes here!",
};

export const create = {
  title: "Generate Quiz",
  Icon: IconSquarePlus2,
  description:
    "Select or upload documents to generate quiz! Uploaded documents will be saved in the library which can be accessed later.",
  quizType: [
    {
      id: QuizTypes.MCQ,
      label: "MCQ",
    },
    {
      id: QuizTypes.CQ,
      label: "CQ",
    },
  ],
  quizTypeError: {
    empty: "You have to select at least one type.",
  },
} as const;

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
  title: "Recent Quiz",
  Icon: IconHistory,
  description:
    "Here are the 10 most recent Quiz you generated. Click to view the details.",
  actions: [
    {
      title: "Delete",
      Icon: IconTrash,
      className: "!text-destructive",
      onClick: () => console.log("Delete"),
    },
  ],
};

export const quizDetails = {
  title: "Quiz Details",
  Icon: IconMessages,
  description:
    "View the details of the quiz you generated. You can also evaluate and delete the quiz.",

  overview: {
    title: "Overview",
    Icon: IconBookmarks,
    description:
      "View the properties of the quiz. You can edit the title and difficulty under the preferences section.",
    descriptionIcon: IconBulb,
  },

  properties: {
    title: "Properties",
    Icon: IconTools,
    fields: {
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
    },
  },

  preferences: {
    title: "Preferences",
    Icon: IconAdjustmentsCog,
    fields: {
      title: {
        title: "Title",
        Icon: IconTextSize,
      },
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
