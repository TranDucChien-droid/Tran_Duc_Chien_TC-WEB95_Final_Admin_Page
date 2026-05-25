import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { notifyClientError } from "@/utils/apiToast";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (!isAxiosError(error)) notifyClientError(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (!isAxiosError(error)) notifyClientError(error);
    },
  }),
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});
