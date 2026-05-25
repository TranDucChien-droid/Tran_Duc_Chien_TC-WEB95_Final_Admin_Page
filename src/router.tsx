import { AdminLayout } from "@/components/AdminLayout";
import { getToken } from "@/services/api";
import { LoginPage } from "@/routes/LoginPage";
import { QuizEditPage } from "@/routes/QuizEditPage";
import { QuizListPage } from "@/routes/QuizListPage";
import { Outlet, createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: LoginPage,
});

const authLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "authLayout",
  beforeLoad: () => {
    if (!getToken()) throw redirect({ to: "/login" });
  },
  component: AdminLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "/",
  component: QuizListPage,
});

const quizEditorRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "quizzes/$quizId",
  component: QuizEditPage,
});

const routeTree = rootRoute.addChildren([loginRoute, authLayoutRoute.addChildren([indexRoute, quizEditorRoute])]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
