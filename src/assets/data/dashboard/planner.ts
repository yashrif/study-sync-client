import {
  IconCategory,
  IconCategoryPlus,
  IconCircleDashedCheck,
  IconDeviceFloppy,
  IconFileText,
  IconRoute,
  IconTextSize,
} from "@tabler/icons-react";

import { Button, FormField, IconList } from "@/types";
import { routes } from "../routes";

export const home: { create: IconList; saved: IconList } = {
  create: {
    title: "Generate Plan",
    Icon: IconRoute,
    description:
      "Plan your study schedule here! Generate a roadmap to keep track of your progress.",
  },
  saved: {
    title: "Saved Plans",
    Icon: IconRoute,
    description: "View all the plans you generated here!",
  },
};

export const create: {
  steps: {
    [key: number]: IconList & { path: string };
  };
} = {
  steps: {
    1: {
      title: "Select a Document",
      description: "Choose the document you want to generate a roadmap for.",
      Icon: IconFileText,
      path: routes.dashboard.planner.home,
    },
    2: {
      title: "Customize Topics",
      description:
        "Review and customize the topics generated for the documents.",
      Icon: IconCategory,
      path: routes.dashboard.planner.topics,
    },
    3: {
      title: "Final Touch",
      description: "Review the roadmap and save it for future reference.",
      Icon: IconCircleDashedCheck,
      path: routes.dashboard.planner.review,
    },
  },
};

export const queryKeys = {
  uploads: {
    key: "uploads",
  },
};

export const topics: {
  fields: {
    name: FormField;
    description: FormField;
    color: FormField;
  };
  buttons: {
    submit: Button;
    add: Button;
  };
} = {
  fields: {
    name: {
      label: "Name",
      type: "text",
      placeholder: "Enter a topic name",
      id: "topic-name",
      required: true,
    },
    description: {
      label: "Description",
      type: "text",
      placeholder: "Enter a topic description",
      id: "topic-description",
      required: false,
    },
    color: {
      label: "Color",
      type: "color",
      placeholder: "Select a color for the topic",
      id: "topic-color",
      required: true,
    },
  },
  buttons: {
    submit: {
      title: "Submit",
      Icon: IconDeviceFloppy,
      type: "submit",
    },
    add: {
      title: "Add Topic",
      Icon: IconCategoryPlus,
    },
  },
};

export const review: {
  fields: {
    title: FormField;
  };
  topics: IconList;
} = {
  fields: {
    title: {
      label: "Title",
      type: "text",
      placeholder: "Enter a title for the roadmap",
      id: "title",
      required: true,
      Icon: IconTextSize,
    },
  },
  topics: {
    title: "Topics",
    Icon: IconCategory,
    description: "Review all the selected topics here!",
  },
};

export const saved = {};

export const search = {
  key: "name",
  placeholder: "Search by name",
};
