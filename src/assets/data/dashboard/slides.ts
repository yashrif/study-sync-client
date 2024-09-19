import {
  IconCategory2,
  IconDeviceFloppy,
  IconEyeEdit,
  IconFileDelta,
  IconFileTypePdf,
  IconPrompt,
  IconSettings,
  IconTextSize,
  IconWorldSearch,
} from "@tabler/icons-react";

import { IconList } from "@/types";
import { ZodEnum } from "zod";

export const defaultValues = {
  title: "Untitled",
};

export const home: {
  create: IconList;
  saved: IconList;
  details: IconList;
  preview: IconList;
} = {
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
  preview: {
    title: "Preview Slide",
    Icon: IconEyeEdit,
    description: "Preview the slide here!",
  },
};

export const create = {
  topics: {
    title: "Select Topics",
    description: "Select the topics you want to include in your slide.",
    icon: IconCategory2,
  },
  uploads: {
    title: "Select Files",
    description: "Select the uploads you want to include in your slide.",
    icon: IconFileTypePdf,
  },
  prompt: {
    title: "Custom Prompt",
    description: "Write a custom prompt to generate more relevant slide.",
    icon: IconPrompt,
  },
  options: {
    title: "Options",
    description: "Select the options you want to include in your slide.",
    icon: IconSettings,
    fields: [
      {
        id: "web",
        title: "Web Search",
        description: "Search the web for more relevant content.",
        icon: IconWorldSearch,
      },
    ],
  },
};

export enum PreviewAction {
  "post" = "post",
  "patch" = "patch",
}

export enum QueryParams {
  uploads = "uploads",
  topics = "topics",
  content = "content",
  name = "name",
  action = "action",
  id = "id",
}

export const preview = {
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
  buttons: {
    save: {
      title: "Save",
      description: "Save the slide",
      Icon: IconDeviceFloppy,
    },
  },
};
