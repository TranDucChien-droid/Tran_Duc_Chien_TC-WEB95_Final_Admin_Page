export const quizKeys = {
  all: ["quizzes"] as const,

  lists: () => [...quizKeys.all, "list"] as const,

  list: (filters: { page?: number } = {}) => [...quizKeys.lists(), filters] as const,

  details: () => [...quizKeys.all, "detail"] as const,

  detail: (id: string) => [...quizKeys.details(), id] as const,
};
