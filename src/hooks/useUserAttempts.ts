import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/queryKeys/userKeys";
import { getUserAttempts } from "@/services/user.service";

export function useUserAttempts(userId: string | undefined) {
  return useQuery({
    queryKey: userKeys.attempts(userId ?? ""),
    queryFn: () => getUserAttempts(userId!),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 2,
  });
}
