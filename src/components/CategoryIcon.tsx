import React from "react";
import BarChartIcon from "@mui/icons-material/BarChart";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HeightIcon from "@mui/icons-material/Height";
import PieChartIcon from "@mui/icons-material/PieChart";
import ScaleIcon from "@mui/icons-material/Scale";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import TimerIcon from "@mui/icons-material/Timer";
import WorkIcon from "@mui/icons-material/Work";
import QuestionIcon from "@mui/icons-material/HelpOutline";

export const ICON_NAMES = [
  "bar chart",
  "child",
  "height",
  "pie chart",
  "scale",
  "show chart",
  "table",
  "timer",
  "weight",
  "work",
];

export function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case "bar chart":
      return <BarChartIcon />;
    case "child":
      return <ChildCareIcon />;
    case "height":
      return <HeightIcon />;
    case "height":
      return <PieChartIcon />;
    case "scale":
      return <ScaleIcon />;
    case "show chart":
      return <ShowChartIcon />;
    case "table":
      return <TableChartIcon />;
    case "timer":
      return <TimerIcon />;
    case "weight":
      return <FitnessCenterIcon />;
    case "work":
      return <WorkIcon />;
    default:
      return <QuestionIcon sx={{ color: "grey" }} />;
  }
}
