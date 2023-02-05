import "@/styles/globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
