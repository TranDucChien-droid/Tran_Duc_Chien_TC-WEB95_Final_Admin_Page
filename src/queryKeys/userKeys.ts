export const userKeys = {
  all: ["users"] as const,

  lists: () => [...userKeys.all, "list"] as const,

  list: () => [...userKeys.lists()] as const,

  attempts: (userId: string) => [...userKeys.all, "attempts", userId] as const,
};
