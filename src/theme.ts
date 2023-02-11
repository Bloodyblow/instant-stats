import { Roboto } from "@next/font/google";
import { ThemeOptions, createTheme } from "@mui/material/styles";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    //   primary: {
    //     main: "#77e09e",
    //   },
    //   secondary: {
    //     main: "#fdfd67",
    //   },
    //   success: {
    //     main: "#346cc1",
    //   },
    background: {
      default: "#00112d",
      paper: "#00112d",
    },
  },
  shape: {
    borderRadius: 4,
  },
};

const theme = createTheme(themeOptions);
export default theme;
