import {
  IconAdjustmentsCog,
  IconBookmarks,
  IconBulb,
  IconCategory,
  IconClock,
  IconDeviceFloppy,
  IconFileExport,
  IconHistory,
  IconListCheck,
  IconMessages,
  IconMist,
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
import { Button, Difficulty, FormField, IconList, QuizTypes } from "@allTypes";

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
    Icon: IconMist,
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

  utils: {
    title: "Utils",
    Icon: IconTools,
    buttons: {
      export: {
        title: "Export",
        Icon: IconFileExport,
      },
    },
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
    className: "ring-destructive hover:bg-destructive/20",
    iconClassName: "stroke-destructive",
    contentClassName: "text-destructive",
  },
};

export const preview: {
  fields: { title: FormField };
} = {
  fields: {
    title: {
      id: "title",
      label: "Title",
      type: "text",
      placeholder: defaultValues.title,
      required: true,
      Icon: IconTextSize,
    },
  },
};
