import type { UserAttemptsResponse, UserSummary } from "@/types/user.types";
import { api } from "./api";

export const getUsers = async () => {
  const { data } = await api.get<UserSummary[]>("/users");
  return data;
};

export const getUserAttempts = async (userId: string) => {
  const { data } = await api.get<UserAttemptsResponse>(`/users/${userId}/attempts`);
  return data;
};
