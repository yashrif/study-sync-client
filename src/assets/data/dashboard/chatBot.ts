export enum Commands {
  "slash" = "/",
  "create-quiz" = "/Create Quiz",
  "create-planner" = "/Create Planner",
  "create-flashcard" = "/Create Flashcard",
  "create-slide" = "/Create Slide",
  "select-file" = "/Select File",
  "explain" = "/Explain",
  "summarize" = "/Summarize",
  "provide-example" = "/Provide Example",
}

export const commandsLvl1 = [
  {
    value: Commands["create-quiz"],
    label: "/Create Quiz",
    instruction: "",
  },
  {
    value: Commands["create-planner"],
    label: "/Create Planner",
    instruction: "",
  },
  {
    value: Commands["create-flashcard"],
    label: "/Create Flashcard",
    instruction: "",
  },
  {
    value: Commands["create-slide"],
    label: "/Create Slide",
    instruction: "",
  },
  {
    value: Commands["select-file"],
    label: "/Select File",
    instruction: "",
  },
];

export const commandsLvl2 = [
  {
    value: Commands["select-file"],
    label: "/Select File",
    instruction: "",
  },
];

export const additionalCommands = {
  study: [
    {
      value: Commands["explain"],
      label: "/Explain",
      instruction: "Explain the text below given context:\n\n",
    },
    {
      value: Commands["summarize"],
      label: "/Summarize",
      instruction: "Summarize the text below given context:\n\n",
    },
    {
      value: Commands["provide-example"],
      label: "/Provide Example",
      instruction: "Give Example, similar to the text below given context:\n\n",
    },
  ],
};

export const commandLabels = commandsLvl1.map((item) => item.label);
