import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { createQuiz } from "@/services/quiz.service";

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
}
