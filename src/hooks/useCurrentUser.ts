import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/services/auth.service";

export const currentUserKeys = {
  me: ["auth", "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserKeys.me,
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
  });
}
