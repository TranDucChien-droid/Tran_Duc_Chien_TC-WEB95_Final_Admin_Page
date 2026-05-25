import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

type ApiErrorBody = {
  message?: string;
  errors?: Array<{ msg?: string }>;
};

function normalizePath(url: string) {
  return url.replace(/^\//, "").split("?")[0] ?? "";
}

export function getApiErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const data = error.response?.data;
  if (data?.message) return data.message;
  if (data?.errors?.[0]?.msg) return data.errors[0].msg;

  const status = error.response?.status;
  if (status === 401) return "Authentication required. Please sign in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "The requested resource was not found.";
  if (status === 400) return "Invalid request. Please check your input.";
  if (status && status >= 500) return "Server error. Please try again later.";
  if (error.code === "ERR_NETWORK") return "Network error. Could not reach the server.";

  return error.message || "Something went wrong. Please try again.";
}

function getSuccessMessage(method: string, path: string): string {
  if (method === "post" && path === "auth/login") return "Signed in successfully";
  if (method === "post" && path === "quizzes") return "Quiz created successfully";
  if (method === "patch" && /^quizzes\/[^/]+$/.test(path)) return "Quiz updated successfully";
  if (method === "post" && /^quizzes\/[^/]+\/questions$/.test(path)) return "Question added successfully";
  if (method === "delete" && /^questions\/[^/]+$/.test(path)) return "Question deleted successfully";
  if (method === "post" && /^quizzes\/[^/]+\/questions\/import$/.test(path)) {
    return "Questions imported successfully";
  }

  return "Request completed successfully";
}

export function notifyApiSuccess(response: AxiosResponse) {
  const method = (response.config.method ?? "get").toLowerCase();
  const path = normalizePath(response.config.url ?? "");

  if (method === "get") return;

  if (method === "post" && path === "auth/login") {
    const user = response.data?.user as { role?: string } | undefined;
    if (user?.role !== "admin") {
      toast.error("Admin account required");
      return;
    }
    toast.success("Signed in successfully");
    return;
  }

  if (method === "post" && /^quizzes\/[^/]+\/questions\/import$/.test(path)) {
    const imported = response.data?.imported;
    if (typeof imported === "number") {
      toast.success(`${imported} question(s) imported successfully`);
    } else {
      toast.success("Questions imported successfully");
    }
    return;
  }

  toast.success(getSuccessMessage(method, path));
}

export function notifyApiError(error: AxiosError<ApiErrorBody>) {
  const method = (error.config?.method ?? "get").toLowerCase();
  if (method === "get") return;

  toast.error(getApiErrorMessage(error));
}

export function notifyClientError(error: unknown) {
  const message = error instanceof Error ? error.message : "Something went wrong. Please try again.";
  toast.error(message);
}
