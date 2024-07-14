import studySyncDB from "@/api/studySyncDB";
import { dbEndpoints } from "@/assets/data/api";
import { Quiz, QuizRequestDb, QuizShallow } from "@/types";

export const postQuiz = async (data: QuizRequestDb): Promise<QuizShallow> => {
  const response = await studySyncDB.post(dbEndpoints.quizzes, data);
  return response.data;
};

export const getQuiz = async (id: string): Promise<Quiz | undefined> => {
  try {
    const response = await studySyncDB.get(`${dbEndpoints.quizzes}/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getQuizzes = async (): Promise<QuizShallow[] | undefined> => {
  try {
    const response = await studySyncDB.get(dbEndpoints.quizzes);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
