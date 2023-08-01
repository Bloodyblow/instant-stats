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
  "enum-bathtub",
  "enum-building",
  "enum-car",
  "enum-child",
  "enum-coffee",
  "enum-colors",
  "enum-culture",
  "enum-elder",
  "enum-energy",
  "enum-fitness",
  "enum-meal",
  "enum-party",
  "enum-people",
  "enum-scale",
  "enum-timer",
  "enum-work",
];

export function CategoryIcon({ name }: { name: string }) {
  switch (name) {
    case "enum-culture":
      return <AgricultureIcon />;
    case "enum-bathtub":
      return <BathtubIcon />;
    case "enum-energy":
      return <Battery5BarIcon />;
    case "enum-party":
      return <CelebrationIcon />;
    case "enum-child":
      return <ChildCareIcon />;
    case "enum-colors":
      return <ColorLensIcon />;
    case "enum-car":
      return <DriveEtaIcon />;
    case "enum-elder":
      return <ElderlyWomanIcon />;
    case "enum-fitness":
      return <FitnessCenterIcon />;
    case "enum-people":
      return <GroupsIcon />;
    case "enum-building":
      return <HandymanIcon />;
    case "enum-coffee":
      return <LocalCafeIcon />;
    case "enum-meal":
      return <LocalDiningIcon />;
    case "enum-scale":
      return <ScaleIcon />;
    case "enum-timer":
      return <TimerIcon />;
    case "enum-work":
      return <WorkIcon />;

    default:
      return <QuestionIcon sx={{ color: "grey" }} />;
  }
}
