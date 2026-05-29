import { api } from "./api";

export type AuthUser = {
  id: string;
  email: string;
  role: string;
  createdAt?: string;
};

export type LoginResponse = {
  token: string;
  user: AuthUser;
};

export const loginAdmin = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<AuthUser>("/auth/me");
  return data;
};
