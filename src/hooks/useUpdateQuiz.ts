import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { updateQuiz } from "@/services/quiz.service";

export function useUpdateQuiz(quizId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { title: string; description: string }) => {
      if (!quizId) return Promise.reject(new Error("Missing quiz id"));
      return updateQuiz(quizId, payload);
    },
    onSuccess: async () => {
      if (!quizId) return;
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
      await queryClient.invalidateQueries({ queryKey: quizKeys.all });
    },
  });
}
