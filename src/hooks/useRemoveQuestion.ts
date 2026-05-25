import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { deleteQuestion } from "@/services/question.service";

export function useRemoveQuestion(quizId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionId: string) => deleteQuestion(questionId),
    onSuccess: async () => {
      if (!quizId) return;
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}
