import React, { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  FormGroup,
  Tooltip,
  Card,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CategoryExtend } from "@/app/types";

const textFieldSx = {
  color: "secondary.contrastText",
  flexGrow: 1,
  margin: "10px 0",
  width: "100%",
};

const buttonSx = {
  width: "fit-content",
  padding: "15px",
  marginRight: "10px",
  height: "fit-content",
};

export default function CatergoryForm({
  initialValues,
  onFinish,
  onCancel,
}: {
  initialValues?: Partial<CategoryExtend>;
  onFinish: (values: Partial<CategoryExtend>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState<string | null>(initialValues?.name || null);
  const [unit, setUnit] = useState<string | null>(initialValues?.unit || null);
  const [icon, setIcon] = useState<string | null>(initialValues?.icon || null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, unit, icon);
    onFinish({
      name: name || "",
      unit: unit || "",
      icon: icon || "",
    });
  };

  const onReset = () => {
    setName(null);
    setUnit(null);
    setIcon(null);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <Box
        component="form"
        sx={{
          backgroundColor: "background.paper",
          color: "secondary.contrastText",
          width: "100%",
          padding: "20px 40px",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl sx={{ m: 1, width: "100%" }}>
          <FormGroup row sx={{ alignItems: "center" }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              type="text"
              sx={textFieldSx}
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="unit"
              label="Unit"
              variant="outlined"
              type="text"
              sx={textFieldSx}
              value={unit || ""}
              onChange={(e) => setUnit(e.target.value)}
            />
            <TextField
              id="icon"
              label="Icon"
              variant="outlined"
              type="text"
              sx={textFieldSx}
              value={icon || ""}
              onChange={(e) => setIcon(e.target.value)}
            />
            <Stack
              direction="row"
              spacing={1}
              style={{
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Add data">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    ...buttonSx,
                    marginRight: "10px",
                  }}
                >
                  <CheckIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Reset form">
                <Button variant="outlined" sx={buttonSx} onClick={onReset}>
                  <RestartAltIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Cancel">
                <Button variant="outlined" sx={buttonSx} onClick={onCancel}>
                  <CloseIcon />
                </Button>
              </Tooltip>
            </Stack>
          </FormGroup>
        </FormControl>
      </Box>
    </Card>
  );
}
