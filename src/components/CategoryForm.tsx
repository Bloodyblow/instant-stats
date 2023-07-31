import React, { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  FormGroup,
  Tooltip,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { CategoryExtend, CategoryFormData } from "@/app/types";
import SelectIcon from "./SelectIcon";

const textFieldSx = {
  color: "secondary.contrastText",
  flexGrow: 1,
  margin: "10px 0",
  width: "100%",
};

const buttonSx = {
  width: "fit-content",
  padding: "15px",
  height: "fit-content",
};

const ErrorMessage = ({ message }: { message: string }) => (
  <Typography style={{ color: "#f26b6b" }}>{message}</Typography>
);

export default function CatergoryForm({
  initialValues,
  onFinish,
  onCancel,
}: {
  initialValues?: Partial<CategoryExtend>;
  onFinish: (values: CategoryFormData) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState<string | null>(initialValues?.name || null);
  const [unit, setUnit] = useState<string | null>(initialValues?.unit || null);
  const [icon, setIcon] = useState<string | null>(initialValues?.icon || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !unit || !icon) {
      setIsSubmitting(true);
      return;
    }

    setIsSubmitting(false);
    onFinish({
      name: name || "",
      unit: unit || "",
      icon: icon || "",
      ...(initialValues?.id && { id: initialValues.id }),
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
            {isSubmitting && !name && (
              <ErrorMessage message="Name is required" />
            )}
            <TextField
              id="unit"
              label="Unit"
              variant="outlined"
              type="text"
              sx={textFieldSx}
              value={unit || ""}
              onChange={(e) => setUnit(e.target.value)}
            />
            {isSubmitting && !unit && (
              <ErrorMessage message="Unit is required" />
            )}
            <SelectIcon
              selectedIconName={icon}
              setSelectedIconName={(iconName) => setIcon(iconName)}
            />
            {isSubmitting && !icon && (
              <ErrorMessage message="Icon is required" />
            )}
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
                  color="secondary"
                  sx={{
                    ...buttonSx,
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.main}`,
                  }}
                >
                  <CheckIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Reset form">
                <Button
                  variant="outlined"
                  sx={buttonSx}
                  onClick={onReset}
                  color="info"
                >
                  <RestartAltIcon />
                </Button>
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  variant="outlined"
                  sx={buttonSx}
                  onClick={onCancel}
                  color="info"
                >
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
