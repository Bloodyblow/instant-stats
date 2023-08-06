import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";

const typographySx = {
  textWrap: "balance",
  width: "80vw",
  maxWidth: "800px",
  color: "text.primary",
};

export default function HomePresentation() {
  const { t } = useTranslation();
  const themeMode = useTheme().palette.mode;

  const yellow = themeMode === "dark" ? "#ffef1d" : "#d37e00";
  const green = themeMode === "dark" ? "#44df89" : "#39ad6d";
  const red = "#e16868";
  const purple1 = themeMode === "dark" ? "#d27ce0" : "#d451e9";
  const purple2 = themeMode === "dark" ? "#c3a5c8" : "#a34fb1";

  return (
    <>
      <Typography
        sx={{
          ...typographySx,
          marginTop: "3rem",
          fontSize: "2rem",
          letterSpacing: "0.2rem",
        }}
      >
        {t("presentation.simplify-data-organization-and-analysis")}
      </Typography>
      <Typography sx={typographySx}>
        {t("presentation.you-can-create")}{" "}
        {t("presentation.app-presents-data-in-table-and-provides")}{" "}
        <span style={{ color: yellow, letterSpacing: "2px" }}>
          {t("presentation.various-charts")}
        </span>{" "}
        {t("presentation.for-easy-visualisation")} {t("presentation.as-a")}{" "}
        <span style={{ color: green }}>{t("presentation.side-project")}</span>{" "}
        {t("presentation.and-a-work-in-progress-we-plan-to-add")}{" "}
        <span style={{ color: red, letterSpacing: "2px" }}>
          {t("presentation.more-features")}
        </span>{" "}
        {t("presentation.and-improvements")}
      </Typography>
      <Typography sx={{ ...typographySx, color: purple1, fontSize: "1.2rem" }}>
        {t("presentation.to-get-started, add a")}{" "}
        <strong style={{ letterSpacing: "-1px", color: purple2 }}>
          {t("presentation.new-category")}
        </strong>{" "}
        {t("presentation.or")}{" "}
        <strong style={{ letterSpacing: "-1px", color: purple2 }}>
          {t("presentation.select")}
        </strong>{" "}
        {t("presentation.an-existing-one")}
      </Typography>
    </>
  );
}
