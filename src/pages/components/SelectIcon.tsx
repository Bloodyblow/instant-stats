import { ICON_NAMES } from "@/app/constants";
import Stack from "@mui/material/Stack";
import React from "react";
import Button from "@mui/material/Button";
import { CategoryIcon } from "./CategoryIcon";
import Typography from "@mui/material/Typography";

export default function SelectIcon({
  selectedIconName,
  setSelectedIconName,
}: {
  selectedIconName: string | null;
  setSelectedIconName: (iconName: string) => void;
}) {
  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        width: "100%",
        padding: "10px",
        border: "1px solid #6e726f",
        borderRadius: "4px",
        marginBottom: "10px",
        color: "#c9c9c9",
        "&:hover": {
          borderColor: "white",
          color: "white",
        },
      }}
    >
      <Typography sx={{ textTransform: "capitalize" }}>
        Icon {selectedIconName && `: ${ICON_NAMES[selectedIconName]}`}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", justifyContent: "start" }}
      >
        {Object.keys(ICON_NAMES).map((icon: string, index) => (
          <Button
            onClick={() => setSelectedIconName(icon)}
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor:
                selectedIconName === icon ? "#f9f3c7" : "primary.light",
              color: selectedIconName === icon ? "primary.main" : "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              margin: "5px 8px 5px 0 !important",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#f3ce5b",
                color: "primary.main",
              },
            }}
            key={index}
          >
            <CategoryIcon name={ICON_NAMES[icon]} />
            <Typography variant="caption">{ICON_NAMES[icon]}</Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
