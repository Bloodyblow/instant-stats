import { ICON_NAMES } from "@/app/constants";
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
export function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case ICON_NAMES.bar:
      return <BarChartIcon />;
    case ICON_NAMES.child:
      return <ChildCareIcon />;
    case ICON_NAMES.height:
      return <HeightIcon />;
    case ICON_NAMES.pie:
      return <PieChartIcon />;
    case ICON_NAMES.scale:
      return <ScaleIcon />;
    case ICON_NAMES.show:
      return <ShowChartIcon />;
    case ICON_NAMES.table:
      return <TableChartIcon />;
    case ICON_NAMES.timer:
      return <TimerIcon />;
    case ICON_NAMES.weight:
      return <FitnessCenterIcon />;
    case ICON_NAMES.work:
      return <WorkIcon />;
    default:
      return <QuestionIcon sx={{ color: "grey" }} />;
  }
}
