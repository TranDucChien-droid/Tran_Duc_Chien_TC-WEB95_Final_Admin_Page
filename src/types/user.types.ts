export type UserSummary = {
  _id: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  attemptCount: number;
};

export type AttemptAnswerDetail = {
  questionId: string;
  selectedIndexes: number[];
  question?: string;
  type?: "single" | "multiple";
  options?: string[];
  selectedLabels?: string[];
  correctIndexes?: number[];
  correctLabels?: string[];
  isCorrect?: boolean;
};

export type AttemptSummary = {
  _id: string;
  userId: string;
  quizId: { _id: string; title: string } | string;
  score: number;
  createdAt: string;
  answers?: AttemptAnswerDetail[];
  reviewable?: boolean;
};

export type UserAttemptsResponse = {
  user: Omit<UserSummary, "attemptCount">;
  attempts: AttemptSummary[];
};
