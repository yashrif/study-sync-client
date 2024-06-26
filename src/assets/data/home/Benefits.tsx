import { IconList } from "@/types/list";
import { IconPlugConnected, IconRocket } from "@tabler/icons-react";
import { ListTodo, Rocket, Unplug } from "lucide-react";

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
    title: "Seamless Google Classroom Integration",
    description:
      "StudySync seamlessly integrates with Google Classroom, automatically fetching activities and resources. This integration ensures that you have access to accurate and up-to-date study materials.",
    Icon: IconPlugConnected,
  },
];
