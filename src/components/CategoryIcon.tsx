import React from "react";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import BathtubIcon from "@mui/icons-material/Bathtub";
import Battery5BarIcon from "@mui/icons-material/Battery5Bar";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import ElderlyWomanIcon from "@mui/icons-material/ElderlyWoman";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GroupsIcon from "@mui/icons-material/Groups";
import HandymanIcon from "@mui/icons-material/Handyman";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import QuestionIcon from "@mui/icons-material/HelpOutline";
import ScaleIcon from "@mui/icons-material/Scale";
import TimerIcon from "@mui/icons-material/Timer";
import WorkIcon from "@mui/icons-material/Work";

export const ICON_NAMES = [
  "bathtub",
  "building",
  "car",
  "child",
  "coffee",
  "colors",
  "culture",
  "elder",
  "energy",
  "fitness",
  "meal",
  "party",
  "people",
  "scale",
  "timer",
  "work",
];

export function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case "culture":
      return <AgricultureIcon />;
    case "bathtub":
      return <BathtubIcon />;
    case "energy":
      return <Battery5BarIcon />;
    case "party":
      return <CelebrationIcon />;
    case "child":
      return <ChildCareIcon />;
    case "colors":
      return <ColorLensIcon />;
    case "car":
      return <DriveEtaIcon />;
    case "elder":
      return <ElderlyWomanIcon />;
    case "fitness":
      return <FitnessCenterIcon />;
    case "people":
      return <GroupsIcon />;
    case "building":
      return <HandymanIcon />;
    case "coffee":
      return <LocalCafeIcon />;
    case "meal":
      return <LocalDiningIcon />;
    case "scale":
      return <ScaleIcon />;
    case "timer":
      return <TimerIcon />;
    case "work":
      return <WorkIcon />;

    default:
      return <QuestionIcon sx={{ color: "grey" }} />;
  }
}
