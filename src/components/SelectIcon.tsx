import { ICON_NAMES } from "./CategoryIcon";
import Stack from "@mui/material/Stack";
import React from "react";
import Button from "@mui/material/Button";
import { CategoryIcon } from "./CategoryIcon";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function SelectIcon({
  selectedIconName,
  setSelectedIconName,
}: {
  selectedIconName: string | null;
  setSelectedIconName: (iconName: string) => void;
}) {
  const { t } = useTranslation();

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
        {t("icon")} {selectedIconName ? `: ${t(selectedIconName)}` : ""}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", justifyContent: "start" }}
      >
        {ICON_NAMES.map((iconName: string, index) => (
          <Button
            onClick={() => {
              setSelectedIconName(iconName);
            }}
            color="secondary"
            variant="contained"
            sx={{
              backgroundColor:
                selectedIconName === iconName ? "#f9f3c7" : "primary.light",
              color: selectedIconName === iconName ? "primary.main" : "white",
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
            <CategoryIcon name={iconName} />
            <Typography variant="caption">{t(iconName)}</Typography>
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
