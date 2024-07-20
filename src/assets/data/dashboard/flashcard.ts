import { IconSquarePlus2, IconStack2 } from "@tabler/icons-react";

import { IconList } from "@allTypes";
import { Quiz } from "@icons";

export const home: { create: IconList; saved: IconList } = {
  create: {
    title: "Generate Flashcard",
    Icon: IconStack2,
    description: "Generate your flashcards here!",
  },
  saved: {
    title: "Review Flashcard",
    Icon: Quiz,
    description: "View all the quizzes you generated here!",
  },
};

export const create = {
  title: "Create Flashcard",
  Icon: IconSquarePlus2,
  description:
    "Select or upload documents to generate flashcards! Uploaded documents will be saved in the library which can be accessed later.",
} as const;
