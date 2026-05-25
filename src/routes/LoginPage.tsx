import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { setToken } from "@/services/api";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await login.mutateAsync({ email, password });
      if (data.user.role !== "admin") return;
      setToken(data.token);
      await navigate({ to: "/" });
    } catch {
      // API errors are shown via toast in the axios interceptor
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-semibold">{t("appTitle")}</h1>
      <form onSubmit={(e) => void onSubmit(e)} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("email")}</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t("password")}</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button type="submit" fullWidth disabled={login.isPending} className="disabled:opacity-60">
          {t("login")}
        </Button>
      </form>
    </div>
  );
}
