import { useQuery } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { getQuizzes } from "@/services/quiz.service";

export function useQuizzes() {
  return useQuery({
    queryKey: quizKeys.list({}),
    queryFn: getQuizzes,
    staleTime: 1000 * 60 * 5,
  });
}
