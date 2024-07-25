"use client";

import { create, home } from "@/assets/data/dashboard/quiz";
import CreateQuizComponent from "../../_components/create";

const CreateQuiz = () => {
  return <CreateQuizComponent home={home.create} create={create} />;
};

export default CreateQuiz;
