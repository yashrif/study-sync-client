import { Quiz } from "@icons";
import { IconList } from "@allTypes";

export const home: { create: IconList; saved: IconList } = {
  create: {
    title: "Generate Flashcard",
    Icon: Quiz,
    description: "Generate your quizzes here!",
  },
  saved: {
    title: "Review Flashcard",
    Icon: Quiz,
    description: "View all the quizzes you generated here!",
  },
};
