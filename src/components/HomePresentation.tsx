import { Typography } from "@mui/material";
import { Category } from "@/app/types";

const typographySx = {
  textWrap: "balance",
  width: "80vw",
  maxWidth: "800px",
};

export default function HomePresentation() {
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
        Simplifies data organization and analysis.
      </Typography>
      <Typography sx={typographySx}>
        You can create custom categories and enter values to track progress and
        analyze relevant data. The app presents data in table and provides{" "}
        <span style={{ color: "#ffef1d", letterSpacing: "2px" }}>
          multiple charts
        </span>{" "}
        for easy visualization. As a{" "}
        <span style={{ color: "#44df89" }}>side project</span> and a work in
        progress, we plan to add{" "}
        <span style={{ color: "#e16868", letterSpacing: "2px" }}>
          new features
        </span>{" "}
        and improvements.
      </Typography>
      <Typography
        sx={{ ...typographySx, color: "#d27ce0", fontSize: "1.2rem" }}
      >
        To get started, add a{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          new category
        </strong>{" "}
        or{" "}
        <strong style={{ letterSpacing: "-1px", color: "#c3a5c8" }}>
          select
        </strong>{" "}
        an existing one.
      </Typography>
    </>
  );
}
