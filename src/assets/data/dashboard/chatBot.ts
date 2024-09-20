export enum Commands {
  "slash" = "/",
  "create-quiz" = "/Create Quiz",
  "create-planner" = "/Create Planner",
  "create-flashcard" = "/Create Flashcard",
  "create-slide" = "/Create Slide",
  "select-file" = "/Select File",
  "select-topic" = "/Select Topic",
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

export const StudyCommands = {
  explain: {
    value: Commands["explain"],
    label: "/Explain",
    instruction: "Explain the text below given context:\n\n",
  },
  summarize: {
    value: Commands["summarize"],
    label: "/Summarize",
    instruction: "Summarize the text below given context:\n\n",
  },
  provideExample: {
    value: Commands["provide-example"],
    label: "/Provide Example",
    instruction: "Give Example, similar to the text below given context:\n\n",
  },
};

export const SlideCommands = {
  selectTopic: {
    value: Commands["select-topic"],
    label: "/Select Topic",
    instruction: "",
  },
};

export const additionalCommands = {
  study: Object.values(StudyCommands),
  slide: Object.values(SlideCommands),
};

export const commandLabels = commandsLvl1.map((item) => item.label);
