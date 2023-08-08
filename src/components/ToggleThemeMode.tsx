import { useContext } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { ThemeModeContext } from "@/pages/_app";
import { Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const buttonSx = {
  color: "text.secondary",
  "&:hover, &:active, &:focus": {
    color: "text.primary",
  },
  marginLeft: "0.5rem",
};

export function ToggleThemeMode() {
  const { t } = useTranslation();
  const theme = useTheme();
  const themeModeContext = useContext(ThemeModeContext);
  return (
    <Button onClick={themeModeContext.toggleTheme} color="inherit">
      {theme.palette.mode === "dark" ? (
        <>
          <Typography sx={{ color: "text.secondary" }}>
            {t("item-mode", { item: t("light") })}
          </Typography>
          <Tooltip title="Switch to light mode">
            <Brightness7Icon sx={buttonSx} />
          </Tooltip>
        </>
      ) : (
        <>
          <Typography sx={{ color: "text.secondary" }}>
            {t("item-mode", { item: t("dark") })}
          </Typography>
          <Tooltip title="Switch to dark mode">
            <Brightness4Icon sx={buttonSx} />
          </Tooltip>
        </>
      )}
    </Button>
  );
}
