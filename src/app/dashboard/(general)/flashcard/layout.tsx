"use client";

import { Suspense } from "react";

import { create, home } from "@/assets/data/dashboard/flashcard";
import Spinner from "@/components/spinner/Spinner";
import { QuizUploadsProvider } from "@/context/QuizUploadsContext";
import CreateQuiz from "../../_components/quiz-uploads";

type Props = {
  children: React.ReactNode;
};

const CreateFlashcardLayout: React.FC<Readonly<Props>> = ({ children }) => {
  return (
    <QuizUploadsProvider>
      <Suspense fallback={<Spinner />}>
        <CreateQuiz home={home.create} create={create} />
      </Suspense>
      {children}
    </QuizUploadsProvider>
  );
};

export default CreateFlashcardLayout;
