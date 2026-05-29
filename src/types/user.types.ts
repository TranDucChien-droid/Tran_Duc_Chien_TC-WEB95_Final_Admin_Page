export type UserSummary = {
  _id: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  attemptCount: number;
};

export type AttemptSummary = {
  _id: string;
  userId: string;
  quizId: { _id: string; title: string } | string;
  score: number;
  createdAt: string;
};

export type UserAttemptsResponse = {
  user: Omit<UserSummary, "attemptCount">;
  attempts: AttemptSummary[];
};
