import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { updateQuiz } from "@/services/quiz.service";

export function useToggleQuizDisabled() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ quizId, disabled }: { quizId: string; disabled: boolean }) =>
      updateQuiz(quizId, { disabled }),
    onSuccess: async (_data, { quizId }) => {
      await queryClient.invalidateQueries({ queryKey: quizKeys.all });
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}
