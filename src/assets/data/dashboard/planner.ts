import { IconCalendarWeek, IconRoute } from "@tabler/icons-react";

import { IconList } from "@/types";

export const home: { create: IconList; review: IconList } = {
  create: {
    title: "Generate Roadmap",
    Icon: IconRoute,
    description:
      "Plan your study schedule here! Generate a roadmap to keep track of your progress.",
  },
  review: {
    title: "Saved Roadmaps",
    Icon: IconCalendarWeek,
    description: "View all the roadmaps you generated here!",
  },
};
