import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function getApiProxy(env: Record<string, string>) {
  const apiUrl = env.VITE_API_URL?.trim() || "http://localhost:5000/api";

  if (apiUrl.startsWith("http://") || apiUrl.startsWith("https://")) {
    const { origin, pathname } = new URL(apiUrl);
    const proxyPath = pathname.replace(/\/$/, "") || "/api";
    return { proxyPath, target: origin };
  }

  const target = (env.VITE_API_PROXY_TARGET?.trim() || "http://localhost:5000").replace(/\/$/, "");
  const proxyPath = apiUrl.startsWith("/") ? apiUrl : `/${apiUrl}`;
  return { proxyPath, target };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const { proxyPath, target } = getApiProxy(env);

  return {
    plugins: [react()],
    resolve: {
      alias: { "@": path.join(process.cwd(), "src") },
    },
    server: {
      port: 5173,
      proxy: {
        [proxyPath]: {
          target,
          changeOrigin: true,
        },
      },
    },
  };
});
