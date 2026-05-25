import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { createQuestion, type CreateQuestionPayload } from "@/services/question.service";

export function useAddQuestion(quizId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateQuestionPayload) => {
      if (!quizId) return Promise.reject(new Error("Missing quiz id"));
      return createQuestion(quizId, payload);
    },
    onSuccess: async () => {
      if (!quizId) return;
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}
