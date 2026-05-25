import { ToastContainer } from "react-toastify";
import { useTheme } from "@/store/hooks";

export function AppToasts() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={theme}
    />
  );
}
