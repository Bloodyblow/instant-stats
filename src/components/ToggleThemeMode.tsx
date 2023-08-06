import { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { ThemeModeContext } from "@/pages/_app";
import { Tooltip } from "@mui/material";

const buttonSx = {
  color: "text.secondary",
};
export function ToggleThemeMode() {
  const theme = useTheme();
  const themeModeContext = useContext(ThemeModeContext);
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={themeModeContext.toggleTheme}
      color="inherit"
    >
      {theme.palette.mode === "dark" ? (
        <Tooltip title="Switch to light mode">
          <Brightness7Icon sx={buttonSx} />
        </Tooltip>
      ) : (
        <Tooltip title="Switch to dark mode">
          <Brightness4Icon sx={buttonSx} />
        </Tooltip>
      )}
    </IconButton>
  );
}
