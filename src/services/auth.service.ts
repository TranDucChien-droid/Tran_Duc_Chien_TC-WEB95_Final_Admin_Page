import { api } from "./api";

export type LoginResponse = {
  token: string;
  user: { id: string; email: string; role: string; createdAt?: string };
};

export const loginAdmin = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};
