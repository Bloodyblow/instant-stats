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
import SyncIcon from "@mui/icons-material/Sync";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { useTranslation } from "react-i18next";
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
  IconButton,
} from "@mui/material";
import dayjs from "dayjs";

const CategoryHeader = ({ onFinish }: { onFinish: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { chart, dateRange } = useSelector(
    (state: RootState) => state.category
  );

  const onChangeChartType = (event: SelectChangeEvent<"line" | "bar">) =>
    dispatch(setChart(event.target.value as ChartType));

  const onChangeDateRange = (dateRange: DateRange) => {
    const [start, end] = dateRange;
    dispatch(setDateRange([start.toISOString(), end.toISOString()]));
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
      {/* Row 1 */}
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => dispatch(setShowCategoryForm(true))}
          startIcon={<EditIcon />}
          color="info"
        >
          {t("edit-item", { item: t("category") })}
        </Button>
      </Stack>

      {/* Row 2 */}
      <Stack
        spacing={2}
        alignItems="center"
        direction="row"
        sx={{
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Column 1 */}
        <Stack direction="row">
          <FormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={{ start: t("start"), end: t("end") }}
            >
              <DateRangePicker
                value={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
                onChange={onChangeDateRange}
                renderInput={(startProps: any, endProps: any) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> {t("to")} </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
          </FormControl>
          <IconButton onClick={onFinish} sx={{ ml: 1, p: "8px 12px" }}>
            <SyncIcon />
          </IconButton>
        </Stack>

        <FormControl>
          <InputLabel id="select-chart-type">{t("chart-type")}</InputLabel>
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
