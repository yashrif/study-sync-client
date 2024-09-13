import {
  IconCategory2,
  IconFileDelta,
  IconFileUpload,
} from "@tabler/icons-react";

import { IconList } from "@/types";

export const home: { create: IconList; saved: IconList; details: IconList } = {
  create: {
    title: "Generate Slide",
    Icon: IconFileDelta,
    description:
      "Generate your slides from all your relevant documents and internet resources here!",
  },
  saved: {
    title: "Saved Slides",
    Icon: IconFileDelta,
    description: "View all the slides you generated here!",
  },
  details: {
    title: "View Slide",
    Icon: IconFileDelta,
    description: "View the details of the slide here!",
  },
};

export const create = {
  topics: {
    title: "Select Topics",
    description: "Select the topics you want to include in your slide.",
    icon: IconCategory2,
  },
  uploads: {
    title: "Select Uploads",
    description: "Select the uploads you want to include in your slide.",
    icon: IconFileUpload,
  },
  prompt: {
    title: "Custom Prompt",
    description: "Write a custom prompt to generate more relevant slide.",
    icon: IconFileUpload,
  },
};
