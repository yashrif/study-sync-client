export enum Commands {
  "slash" = "/",
  "create-quiz" = "/Create Quiz",
  "create-planner" = "/Create Planner",
  "create-flashcard" = "/Create Flashcard",
  "create-slide" = "/Create Slide",
  "select-file" = "/Select File",
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
    label: "/Create Flashcard",
  },
  {
    value: Commands["create-slide"],
    label: "/Create Slide",
  },
  {
    value: Commands["select-file"],
    label: "/Select File",
  },
];

export const commandsLvl2 = [
  {
    value: Commands["select-file"],
    label: "/Select File",
  },
];

export const commandLabels = commandsLvl1.map((item) => item.label);
