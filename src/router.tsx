import { AdminLayout } from "@/components/AdminLayout";
import { getToken } from "@/services/api";
import { LoginPage } from "@/routes/LoginPage";
import { QuizEditPage } from "@/routes/QuizEditPage";
import { QuizListPage } from "@/routes/QuizListPage";
import { UserAttemptsPage } from "@/routes/UserAttemptsPage";
import { UserListPage } from "@/routes/UserListPage";
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

const usersRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "users",
  component: UserListPage,
});

const userAttemptsRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  path: "users/$userId",
  component: UserAttemptsPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  authLayoutRoute.addChildren([indexRoute, quizEditorRoute, usersRoute, userAttemptsRoute]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
