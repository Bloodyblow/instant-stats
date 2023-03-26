import { Roboto } from "@next/font/google";
import { ThemeOptions, createTheme } from "@mui/material/styles";

// export const roboto = Roboto({
//   weight: ["300", "400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
//   fallback: ["Helvetica", "Arial", "sans-serif"],
// });

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#021a17',
    },
    secondary: {
      main: '#b71c1c',
    },
    background: {
      paper: '#434844',
      default: '#272b27',
    },
  },
};

const theme = createTheme(themeOptions);
export default theme;
