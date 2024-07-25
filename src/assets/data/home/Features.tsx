import { IconList } from "@/types/list";
import {
  IconCubePlus,
  IconHighlight,
  IconMessage2Question,
  IconNotification,
  IconPlugConnected,
  IconProgressCheck,
} from "@tabler/icons-react";

export const sectionName = "Unlock Your Potential";
export const title = "Enhance Your Studying with StudySync's Features";
export const description =
  "StudySync offers a range of AI-powered features to optimize your studying experience. From loading study materials to tracking your progress, StudySync has got you covered.";

export const features: IconList[] = [
  {
    title: "Create a Study Plan",
    description:
      "Users input subjects, duration, and deadlines. The system generates a personalized study plan.",
    Icon: IconCubePlus,
  },
  {
    title: "Integrate Google Classroom",
    description:
      "Users input subjects, duration, and deadlines. The system generates a personalized study plan.",
    Icon: IconPlugConnected,
  },
  {
    title: "Generate Questions and Summaries",
    description:
      "Users link their Google Classroom account to import assignments and resources into their study plan.",
    Icon: IconMessage2Question,
  },
  {
    title: "Track Progress and Performance",
    description:
      "The system monitors study activities, tracks progress, and provides visual progress through graphs and charts.",
    Icon: IconProgressCheck,
  },
  {
    title: "Notifications and Reminders",
    description:
      "The system sends notifications and reminders about tasks, deadlines, and milestones based on the study plan.",
    Icon: IconNotification,
  },
  {
    title: "Annotate PDFs",
    description:
      "Users upload PDFs to highlight, annotate, and reference sections. The system saves annotations for future use.",
    Icon: IconHighlight,
  },
];
