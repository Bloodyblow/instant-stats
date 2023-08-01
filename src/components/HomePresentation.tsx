import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const typographySx = {
  textWrap: "balance",
  width: "80vw",
  maxWidth: "800px",
};

export default function HomePresentation() {
  const { t } = useTranslation();
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
        <span style={{ color: "#ffef1d", letterSpacing: "2px" }}>
          {t("presentation.various-charts")}
        </span>{" "}
        {t("presentation.for-easy-visualisation")} {t("presentation.as-a")}{" "}
        <span style={{ color: "#44df89" }}>
          {t("presentation.side-project")}
        </span>{" "}
        {t("presentation.and-a-work-in-progress-we-plan-to-add")}{" "}
        <span style={{ color: "#e16868", letterSpacing: "2px" }}>
          {t("presentation.more-features")}
        </span>{" "}
        {t("presentation.and-improvements")}
      </Typography>
      <Typography
        sx={{ ...typographySx, color: "#d27ce0", fontSize: "1.2rem" }}
      >
        {t("presentation.to-get-started, add a")}{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          {t("presentation.new-category")}
        </strong>{" "}
        {t("presentation.or")}{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          {t("presentation.select")}
        </strong>{" "}
        {t("presentation.an-existing-one")}
      </Typography>
    </>
  );
}
