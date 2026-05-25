import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/services/auth.service";

export function useAdminLogin() {
  return useMutation({
    mutationFn: loginAdmin,
  });
}
