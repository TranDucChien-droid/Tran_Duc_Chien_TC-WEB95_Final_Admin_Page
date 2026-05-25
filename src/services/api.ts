import axios, { isAxiosError } from "axios";
import { notifyApiError, notifyApiSuccess } from "@/utils/apiToast";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL });

const TOKEN_KEY = "quiz_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    notifyApiSuccess(res);
    return res;
  },
  (err: unknown) => {
    if (isAxiosError(err)) {
      notifyApiError(err);
    }
    return Promise.reject(err);
  }
);
