import { ChartType, DateRange } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import {
  setChart,
  setDateRange,
  setShowCategoryForm,
} from "../app/store/categorySlice";
import { CHART_TYPES, CHART_TYPE_LABELS } from "./Chart";
import EditIcon from "@mui/icons-material/Edit";
import { RootState } from "@/app/store/store";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

import {
  Button,
  FormControl,
  InputLabel,
  Box,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

const CategoryHeader = ({ onFinish }: { onFinish: () => void }) => {
  const dispatch = useDispatch();
  const { chart, dateRange } = useSelector(
    (state: RootState) => state.category
  );

  const onChangeChartType = (event: SelectChangeEvent<"line" | "bar">) =>
    dispatch(setChart(event.target.value as ChartType));

  const onChangeDateRange = (dateRange: DateRange) => {
    dispatch(setDateRange(dateRange));
    onFinish();
  };
  return (
    <Stack
      spacing={2}
      alignItems="space-between"
      direction="column"
      sx={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => dispatch(setShowCategoryForm(true))}
          startIcon={<EditIcon />}
          color="info"
        >
          Edit the category
        </Button>
      </Stack>

      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        sx={{
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <FormControl>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "Start", end: "End" }}
          >
            <DateRangePicker
              value={dateRange}
              onChange={onChangeDateRange}
              renderInput={(startProps: any, endProps: any) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl>
          <InputLabel id="select-chart-type">Chart type</InputLabel>
          <Select
            labelId="select-chart-type"
            id="demo-simple-select"
            value={chart}
            label="Chart type"
            onChange={onChangeChartType}
          >
            {CHART_TYPES.map((type, index) => (
              <MenuItem key={`${type}-${index}`} value={type}>
                {CHART_TYPE_LABELS[type as keyof typeof CHART_TYPE_LABELS]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
};

export default CategoryHeader;
