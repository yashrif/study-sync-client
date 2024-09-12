import { IconFileDelta } from "@tabler/icons-react";

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
