export enum Commands {
  "create-quiz" = "create-quiz",
  "create-planner" = "create-planner",
  "create-flashcard" = "create-flashcard",
  "create-slide" = "create-slide",
  "select-file" = "select-file",
}

export const commandsLvl1 = [
  {
    value: Commands["create-quiz"],
    label: "/Create Quiz",
  },
  {
    value: Commands["create-planner"],
    label: "/Create Planner",
  },
  {
    value: Commands["create-flashcard"],
    label: "/Create-Flashcard",
  },
  {
    value: Commands["create-slide"],
    label: "/Create Slide",
  },
];
