import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { getQuizDetail } from "@/services/quiz.service";

export function useQuizDetail(id: string | undefined) {
  return useQuery({
    queryKey: quizKeys.detail(id ?? ""),
    queryFn: () => getQuizDetail(id!),
    enabled: Boolean(id),
    staleTime: 1000 * 60,
  });
}
