import { useQuery } from "@tanstack/react-query";
import { userKeys } from "@/queryKeys/userKeys";
import { getUsers } from "@/services/user.service";

export function useUsers() {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: getUsers,
    staleTime: 1000 * 60 * 2,
  });
}
