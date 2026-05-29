import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { deleteQuestionsBulk } from "@/services/question.service";

export function useRemoveQuestions(quizId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (questionIds: string[]) => {
      if (!quizId) return Promise.reject(new Error("Missing quiz id"));
      if (!questionIds.length) return Promise.reject(new Error("No questions selected"));
      return deleteQuestionsBulk(quizId, questionIds);
    },
    onSuccess: async () => {
      if (!quizId) return;
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}
