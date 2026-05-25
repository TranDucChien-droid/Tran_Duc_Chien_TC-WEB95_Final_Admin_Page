import type { Quiz, QuizDetail } from "@/types";
import { api } from "./api";

export const getQuizzes = async () => {
  const { data } = await api.get<Quiz[]>("/quizzes");
  return data;
};

export const getQuizDetail = async (id: string) => {
  const { data } = await api.get<QuizDetail>(`/quizzes/${id}`);
  return data;
};

export const createQuiz = async (payload: { title: string; description?: string }) => {
  const { data } = await api.post<Quiz>("/quizzes", payload);
  return data;
};

export const updateQuiz = async (quizId: string, payload: { title: string; description: string }) => {
  const { data } = await api.patch<Quiz>(`/quizzes/${quizId}`, payload);
  return data;
};
