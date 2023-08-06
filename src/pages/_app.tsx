import "@/styles/globals.css";
import darkThemeOptions from "@/themes/dark";
import lightThemeOptions from "@/themes/light";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { store } from "@/app/store/store";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import { SessionProvider } from "next-auth/react";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { useState, useMemo, createContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const queryClient = new QueryClient();

type AppPropsWithAuth = AppProps & {
  Component: {
    requireAuth?: boolean;
  };
};

export const ThemeModeContext = createContext({
  toggleTheme: () => {},
});

export default function App({ Component, pageProps }: AppPropsWithAuth) {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(
    isSystemDarkMode ? darkThemeOptions : lightThemeOptions
  );

  const themeModeContextProvider = useMemo(
    () => ({
      toggleTheme: () => {
        setThemeOptions((prevMode) =>
          prevMode?.palette?.mode === "light"
            ? darkThemeOptions
            : lightThemeOptions
        );
      },
    }),
    []
  );

  const themeProvider = useMemo(
    () => createTheme(themeOptions),
    [themeOptions]
  );

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeModeContext.Provider value={themeModeContextProvider}>
            <ThemeProvider theme={themeProvider}>
              <SnackbarProvider>
                {Component.requireAuth ? (
                  <ProtectedLayout>
                    <Component {...pageProps} />
                  </ProtectedLayout>
                ) : (
                  <Component {...pageProps} />
                )}
              </SnackbarProvider>
            </ThemeProvider>
            <ReactQueryDevtools />
          </ThemeModeContext.Provider>
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
}
