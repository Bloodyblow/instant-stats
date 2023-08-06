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
  Stack,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { ValueFormData } from "@/app/types";
import { RootState } from "@/app/store/store";
import { useMutation } from "@tanstack/react-query";
import { addValue, updateValue } from "@/app/apiService";
import { setSelectedValue } from "../app/store/categorySlice";
import { useSnackbar } from "notistack";
import { DATEFORMAT_en } from "@/app/constants";
import { useTranslation } from "react-i18next";
import { widthSx } from "./Layout";

const textFieldSx = {
  color: "secondary.contrastText",
  flexGrow: { sm: 1 },
  margin: { xs: "10px 0", sm: "0 20px" },
};

export default function ValueForm({ onFinish }: { onFinish: () => void }) {
  const { t } = useTranslation();
  const { category } = useSelector((state: RootState) => state.category);
  const { selectedValue } = useSelector((state: RootState) => state.category);
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar(t("item-added", { item: t("value") }), {
        variant: "success",
      });
      onReset();
    },
    onError: () => {
      enqueueSnackbar(
        t("error-occured-while-adding-item", { item: t("value") }),
        {
          variant: "error",
        }
      );
    },
  });

  const { mutate: mutateUpdateValue } = useMutation({
    mutationFn: updateValue,
    onSuccess: () => {
      enqueueSnackbar(t("item-updated", { item: t("value") }), {
        variant: "success",
      });
      onReset();
    },
    onError: () => {
      enqueueSnackbar(
        t("error-occured-while-updating-item", {
          item: t("value"),
        }),
        {
          variant: "error",
        }
      );
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category || !date || !value) return;
    const data = {
      date: date?.toISOString(),
      value,
      categoryId: category.id,
    };

    if (selectedValue) {
      await mutateUpdateValue({
        ...data,
        id: selectedValue.id,
      });
    } else {
      await mutateCreateValue(data);
    }
    setTimeout(() => onFinish(), 1000);
  };

  const onReset = () => {
    setDate(null);
    setValue(null);
    if (selectedValue) {
      dispatch(setSelectedValue(null));
    }
  };

  const { unit } = category || {};

  return (
    <Card sx={widthSx}>
      <CardHeader
        title={t("add-item", { item: t("data") })}
        sx={{ backgroundColor: "secondary.main" }}
      ></CardHeader>
      {isLoading && <LinearProgress color="info" />}

      <Box
        component="form"
        sx={{
          backgroundColor: "background.paper",
          color: "secondary.contrastText",
          width: "100%",
          padding: { xs: "20px 5px 20px 20px", sm: "20px 40px" },
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
                label={t("date")}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                inputFormat={DATEFORMAT_en}
              />
            </LocalizationProvider>
            <TextField
              id="outlined-basic"
              label={`${t("value")} ${unit ? `(${unit})` : ""} `}
              variant="outlined"
              type="number"
              sx={textFieldSx}
              value={value || ""}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              inputProps={{
                step: 0.01,
                min: 0,
              }}
            />
            <Stack direction="row" spacing={2}>
              <Tooltip title={t("add-item", { item: t("data") })}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: { xs: "100%", sm: "fit-content" },
                    padding: "15px",
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
              <Tooltip title={t("reset-form")}>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xs: "100%", sm: "fit-content" },
                    padding: "15px",
                  }}
                  onClick={onReset}
                >
                  <ClearIcon />
                </Button>
              </Tooltip>
            </Stack>
          </FormGroup>
        </FormControl>
      </Box>
    </Card>
  );
}
