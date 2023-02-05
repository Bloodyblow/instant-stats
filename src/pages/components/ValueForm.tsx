import React, { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckIcon from "@mui/icons-material/Check";
import {
  Button,
  FormControl,
  FormGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export default function ValueForm() {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(date, value);
  };

  const onReset = () => {
    setDate(null);
    setValue(null);
  };

  return (
    <Box
      component="form"
      sx={{
        backgroundColor: "background.paper",
        color: "secondary.contrastText",
        width: "calc(100% + 60px)",
        padding: "20px 40px",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{ fontSize: "1.5rem", color: "white", m: 1 }}
      >
        Add data
      </Typography>
      ;
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
            label="Value"
            variant="outlined"
            type="number"
            sx={{
              color: "secondary.contrastText",
              flexGrow: 1,
              margin: "0 20px",
            }}
            value={value || ""}
            onChange={(e) => setValue(e.target.value)}
          />
          <Tooltip title="Add data">
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: "fit-content",
                padding: "15px",
                marginRight: "20px",
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
            >
              <RestartAltIcon />
            </Button>
          </Tooltip>
        </FormGroup>
      </FormControl>
    </Box>
  );
}
