import { Button } from "@/types/button";
import { links } from "../routes";

export const title = "Unlock Your Potential with AI";
export const description =
  "Welcome to StudySync, your AI-powered study companion. Load study materials, create custom plans, track progress, and self-evaluate with ease. Enjoy interactive tools like flashcards and quizzes. Integrated with Google Classroom for automatic updates. Start your journey to academic excellence today!";

export const buttons: Button[] = [
  {
    title: "Learn More",
    href: links.benefits.href,
    variant: "default",
  },
  {
    title: links.signUp.title,
    href: links.signUp.href,
    variant: "outline",
  },
];
