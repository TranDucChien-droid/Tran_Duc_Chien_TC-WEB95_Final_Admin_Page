import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppToasts } from "@/components/AppToasts";
import { ThemeSync } from "@/components/ThemeSync";
import "@/i18n";
import "@/index.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { router } from "@/router";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <ReduxProvider>
        <ThemeSync />
        <AppToasts />
        <RouterProvider router={router} />
      </ReduxProvider>
    </QueryProvider>
  </StrictMode>
);
