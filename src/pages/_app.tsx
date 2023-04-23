import "@/styles/globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
