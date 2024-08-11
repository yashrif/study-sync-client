import { TopicStatus } from "@/types";

export const statusPoints = (status: TopicStatus) => {
  switch (status) {
    case TopicStatus.WEAK:
      return 0;
    case TopicStatus.MODERATE:
      return 50;
    case TopicStatus.CONFIDENT:
      return 100;
    default:
      return 0;
  }
};
