import { IconList } from "@/types/list";
import {
  IconAi,
  IconCubePlus,
  IconFileDelta,
  IconHighlight,
  IconMessage2Question,
  IconProgressCheck
} from "@tabler/icons-react";

export const sectionName = "Unlock Your Potential";
export const title = "Enhance Your Studying with StudySync's Features";
export const description =
  "StudySync offers a range of AI-powered features to optimize your studying experience. From loading study materials to tracking your progress, StudySync has got you covered.";

export const features: IconList[] = [
  {
    title: "AI Assistance",
    description:
      "StudySync leverages AI technology to provide personalized study plans, generate questions, and track progress.",
    Icon: IconAi,
  },
  {
    title: "Create a Study Plan",
    description:
      "Users input subjects, duration, and deadlines. The system generates a personalized study plan.",
    Icon: IconCubePlus,
  },
  {
    title: "Generate Questions",
    description:
      "StudySync generates questions based on study materials, allowing users to test their knowledge.",
    Icon: IconMessage2Question,
  },
  {
    title: "Track Progress",
    description:
      "The system monitors study activities, tracks progress, and provides visual progress through graphs and charts.",
    Icon: IconProgressCheck,
  },
  {
    title: "Generate Contents",
    description:
      "Generate contents for your study plan based on your study materials, store, access and export anytime.",
    Icon: IconFileDelta,
  },
  {
    title: "Annotate PDFs",
    description:
      "Users upload PDFs to highlight, annotate, and reference sections. The system saves annotations for future use.",
    Icon: IconHighlight,
  },
];
