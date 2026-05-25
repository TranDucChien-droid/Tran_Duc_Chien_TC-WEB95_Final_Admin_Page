import { api } from "./api";

export type CreateQuestionPayload = {
  question: string;
  type: "single" | "multiple";
  options: string[];
  correctAnswers: number[];
};

export const createQuestion = async (quizId: string, payload: CreateQuestionPayload) => {
  const { data } = await api.post(`/quizzes/${quizId}/questions`, payload);
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  await api.delete(`/questions/${questionId}`);
};

export const importQuestions = async (quizId: string, file: File) => {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post<{ imported: number }>(`/quizzes/${quizId}/questions/import`, fd);
  return data;
};
