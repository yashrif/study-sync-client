import { IconList } from "@/types/list";
import { IconPlugConnected } from "@tabler/icons-react";
import { ListTodo, Rocket } from "lucide-react";

export const sectionName = "Benefits";
export const title = "Unlock Your Full Study Potential with StudySync";
export const description =
  "StudySync is a powerful digital platform that utilizes AI assistance to revolutionize the way you study. With features like study material loading, custom study plans, progress tracking, and self-evaluation, StudySync empowers you to take control of your learning journey.";

export const benefits: IconList[] = [
  {
    title: "Boost Your Study Efficiency",
    description:
      "StudySync provides you with the tools and resources you need to study more efficiently. Our AI-generated questions, content summaries, and interactive tools like flashcards and multiple-choice questions make studying engaging and effective.",
    Icon: Rocket,
  },
  {
    title: "Track Your Progress",
    description:
      "With StudySync, you can easily track your progress and see how far you've come. Our progress tracking feature allows you to monitor your performance and identify areas for improvement.",
    Icon: ListTodo,
  },
  {
    title: "Seamless AI Integration",
    description:
      "StudySync seamlessly integrates AI assistance into your study routine. Our AI-powered study plans and content recommendations help you stay on track and make the most of your study time.",
    Icon: IconPlugConnected,
  },
];
