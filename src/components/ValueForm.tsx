import React, { useState, FormEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  FormControl,
  FormGroup,
  Tooltip,
  Card,
  CardHeader,
  LinearProgress,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { ValueFormData } from "@/app/types";
import { RootState } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import { addValue, updateValue } from "@/app/apiService";
import { setSelectedValue } from "../app/store/categorySlice";
import { useSnackbar } from "notistack";

const textFieldSx = {
  color: "secondary.contrastText",
  flexGrow: 1,
  margin: "0 20px",
};

export default function ValueForm({ onFinish }: { onFinish: () => void }) {
  const { category } = useSelector((state: RootState) => state.category);
  const { selectedValue } = useSelector((state: RootState) => state.category);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [date, setDate] = useState<Dayjs | null>(
    selectedValue ? dayjs(selectedValue?.date) : null
  );
  const [value, setValue] = useState<number | null>(
    selectedValue?.value || null
  );

  useEffect(() => {
    if (selectedValue) {
      setDate(dayjs(selectedValue?.date));
      setValue(selectedValue?.value);
    }
  }, [selectedValue]);

  const { mutate: mutateCreateValue, isLoading } = useMutation({
    mutationFn: addValue,
    onSuccess: (value: ValueFormData) => {
      enqueueSnackbar("Value added", { variant: "success" });
      onReset();
    },
    onError: () => {
      enqueueSnackbar("An error occurred while adding value", {
        variant: "error",
      });
    },
  });

  const { mutate: mutateUpdateValue } = useMutation({
    mutationFn: updateValue,
    onSuccess: () => {
      enqueueSnackbar("Value updated", { variant: "success" });
      onReset();
    },
    onError: () => {
      enqueueSnackbar("An error occurred while updating value", {
        variant: "error",
      });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category || !date || !value) return;
    const data = {
      date: date?.format("YYYY-MM-DD"),
      value,
      categoryId: category.id,
    };

    if (selectedValue) {
      mutateUpdateValue({
        ...data,
        id: selectedValue.id,
      });
    } else {
      mutateCreateValue(data);
    }
    onFinish();
  };

  const onReset = () => {
    setDate(null);
    setValue(null);
    if (selectedValue) {
      dispatch(setSelectedValue(null));
    }
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title="Add data"
        sx={{ backgroundColor: "secondary.main" }}
      ></CardHeader>
      {isLoading && <LinearProgress color="info" />}

      <Box
        component="form"
        sx={{
          backgroundColor: "background.paper",
          color: "secondary.contrastText",
          width: "100%",
          padding: "20px 40px",
          alignItems: "center",
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl sx={{ m: 1, width: "100%" }}>
          <FormGroup
            row
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label={`Value (${category?.unit})`}
              variant="outlined"
              type="number"
              sx={textFieldSx}
              value={value || ""}
              onChange={(e) => setValue(parseInt(e.target.value))}
            />
            <Tooltip title="Add data">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "fit-content",
                  padding: "15px",
                  marginRight: "20px",
                  backgroundColor: "#d7c702",
                  transition: "all 0.3s ease",
                  "&:hover, &:active, &:focus": {
                    backgroundColor: "#dc8100",
                  },
                  color: "primary.main",
                }}
              >
                <CheckIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Reset form">
              <Button
                variant="outlined"
                sx={{ width: "fit-content", padding: "15px" }}
                onClick={onReset}
                color="info"
              >
                <ClearIcon />
              </Button>
            </Tooltip>
          </FormGroup>
        </FormControl>
      </Box>
    </Card>
  );
}