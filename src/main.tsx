import React, { Suspense, useMemo } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "@/App";
import axios, { AxiosContext } from "@/api/request";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import SuspendFallbackLoading from "@/pages/layout/suspendFallbackLoading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      refetchInterval: false,
    },
  },
});

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return (
    <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <AxiosProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<SuspendFallbackLoading />}>
        <App />
      </Suspense>
    </QueryClientProvider>
  </AxiosProvider>,
  //</React.StrictMode>
  document.getElementById("root")
);
