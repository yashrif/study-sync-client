import {
  IconBolt,
  IconBrain,
  IconChevronsRight,
  IconClockCog,
  IconCloudFog,
  IconEyeBolt,
  IconEyeOff,
  IconReload,
  IconSquarePlus2,
} from "@tabler/icons-react";

import { FlashcardStatus, IconList } from "@allTypes";

export const home: { create: IconList; review: IconList } = {
  create: {
    title: "Generate Flashcard",
    Icon: IconBolt,
    description: "Generate your flashcards here!",
  },
  review: {
    title: "Review Flashcard",
    Icon: IconBolt,
    description: "View all the flashcards you generated here!",
  },
};

export const create = {
  title: "Create Flashcard",
  Icon: IconSquarePlus2,
  description:
    "Select or upload documents to generate flashcards! Uploaded documents will be saved in the library which can be accessed later.",
} as const;

export const review = {
  title: "Flashcard",
  buttons: {
    show: {
      title: "Show answer",
      Icon: IconEyeBolt,
      className: "",
    },
    forgotten: {
      title: "Forgotten",
      Icon: IconCloudFog,
      className: "bg-destructive/90 hover:bg-destructive/80",
      status: FlashcardStatus.FORGOTTEN,
    },
    delayed: {
      title: "Took a while to remember",
      Icon: IconClockCog,
      className: "bg-blue-500 hover:bg-blue-400",
      status: FlashcardStatus.TOOK_A_WHILE_TO_REMEMBER,
    },
    remembered: {
      title: "Remembered",
      Icon: IconBrain,
      className: "bg-success hover:bg-success/90",
      status: FlashcardStatus.REMEMBERED,
    },
    next: {
      title: "Next",
      Icon: IconChevronsRight,
      className: "",
    },
    reset: {
      title: "Reset",
      Icon: IconReload,
      className: "",
    },
    hide: {
      title: "Hide answer",
      Icon: IconEyeOff,
      className: "",
    },
  },
  message: {
    caughtUp: `Congrats, you've reviewed all the cards, see you next time! 💯`,
  },
};
