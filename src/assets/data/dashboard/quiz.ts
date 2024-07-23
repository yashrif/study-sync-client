import {
  IconAdjustmentsCog,
  IconBook2,
  IconBookmarks,
  IconBulb,
  IconCategory,
  IconClock,
  IconDeviceFloppy,
  IconHistory,
  IconListCheck,
  IconMessages,
  IconNotes,
  IconReload,
  IconSquarePlus2,
  IconStack2,
  IconTextSize,
  IconTools,
  IconTrash,
  IconWriting,
} from "@tabler/icons-react";

import { Quiz } from "@/components/icons";
import { dateFormatter } from "@/utils/dateFormatter";
import {
  Button,
  Column,
  ColumnConfig,
  Difficulty,
  IconList,
  QuizTypes,
  TableAction,
} from "@allTypes";
import { routes } from "../routes";
import { fileTypeIcons } from "./file";

export const home: { create: IconList; saved: IconList } = {
  create: {
    title: "Generate Quiz",
    Icon: Quiz,
    description: "Generate your quizzes here!",
  },
  saved: {
    title: "Saved Quiz",
    Icon: Quiz,
    description: "View all the quizzes you generated here!",
  },
};

export const create = {
  title: "Create Quiz",
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
  type: "no_link",
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
      type: "link",
      accessorKey: "title",
      title: "Document",
      formatter: (title) => {
        return title as string;
      },
      linkKey: "id",
      path: routes.dashboard.uploads,
      className() {
        return "text-base no-underline font-semibold";
      },
    },
    {
      type: "no_link",
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
      type: "no_link",
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
    "Here are the 5 most recent Quiz you generated. Click to view the details.",
  actions: {
    delete: {
      title: "Delete",
      Icon: IconTrash,
      className: "!text-destructive",
    },
  },
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
      "View the properties of the quiz. You can edit the title, difficulty and type of quiz under the preferences section.",
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
      types: {
        title: "Types",
        Icon: IconCategory,
      },
    },
  },

  timer: {
    title: "Timer",
    Icon: IconClock,
  },

  mcq: {
    title: "Multiple Choice Questions",
  },
  cq: {
    title: "Short Questions",
  },
};

export const defaultValues = {
  title: "Untitled",
};

export const queryParams = {
  difficulty: {
    name: "difficulty",
    value: Difficulty.MEDIUM,
  },
  types: {
    key: "types",
    value: [QuizTypes.MCQ, QuizTypes.CQ],
  },
};

export const saved: {
  search: {
    key: string;
    placeholder: string;
  };
  columnConfig: {
    columns: Column[];
    actions: TableAction[];
  };
} = {
  search: {
    key: "title",
    placeholder: "Search by title",
  },

  columnConfig: {
    columns: [
      {
        type: "link",
        accessorKey: "title",
        title: "Title",
        formatter: (title) => {
          return title as string;
        },
        linkKey: "id",
        path: routes.dashboard.quiz.home,
        Icon() {
          return IconBook2;
        },
        iconClassName() {
          return "text-primary";
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
  },
};

export const actionButton: {
  submit: Button;
  reset: Button;
} = {
  submit: {
    title: "Submit",
    Icon: IconDeviceFloppy,
    type: "submit",
  },
  reset: {
    title: "Reset",
    Icon: IconReload,
    type: "reset",
    variant: "outline",
    className: "text-destructive ring-destructive hover:bg-destructive/20",
    iconClassName: "text-destructive",
  },
};
