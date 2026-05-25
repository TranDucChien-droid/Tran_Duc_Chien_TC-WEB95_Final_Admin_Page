export type Quiz = {
  _id: string;
  title: string;
  description?: string;
  createdBy: string;
  createdAt: string;
};

export type Question = {
  _id: string;
  quizId: string;
  question: string;
  type: "single" | "multiple";
  options: string[];
  correctAnswers?: number[];
};

export type QuizDetail = Quiz & { questions: Question[] };
