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
import { useState, useMemo, createContext, useEffect } from "react";
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

const getThemeoptions = (isSystemDarkMode: boolean) =>
  isSystemDarkMode ? darkThemeOptions : lightThemeOptions;

export default function App({ Component, pageProps }: AppPropsWithAuth) {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(
    isSystemDarkMode ? darkThemeOptions : lightThemeOptions
  );

  useEffect(() => {
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode) {
      setThemeOptions(getThemeoptions(themeMode === "dark"));
    }
  }, []);

  const themeModeContextProvider = useMemo(
    () => ({
      toggleTheme: () => {
        setThemeOptions((prevMode) => {
          const newMode =
            prevMode?.palette?.mode === "light" ? "dark" : "light";
          localStorage.setItem("themeMode", newMode);
          return getThemeoptions(newMode === "dark");
        });
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
