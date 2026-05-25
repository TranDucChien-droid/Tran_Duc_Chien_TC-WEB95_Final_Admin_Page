import { useMutation, useQueryClient } from "@tanstack/react-query";
import { quizKeys } from "@/queryKeys/quizKeys";
import { importQuestions } from "@/services/question.service";

export function useImportQuestions(quizId: string | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      if (!quizId) return Promise.reject(new Error("Missing quiz id"));
      return importQuestions(quizId, file);
    },
    onSuccess: async () => {
      if (!quizId) return;
      await queryClient.invalidateQueries({ queryKey: quizKeys.detail(quizId) });
    },
  });
}
