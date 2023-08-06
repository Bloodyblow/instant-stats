import { ChartType, DateStringRange } from "@/app/types";
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTranslation } from "react-i18next";
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  IconButton,
  FormGroup,
  Typography,
  SxProps,
} from "@mui/material";
import dayjs from "dayjs";
import { widthSx } from "./Layout";
import { DATEFORMAT_en } from "@/app/constants";

const CategoryHeader = ({ onFinish }: { onFinish: () => void }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { chart, dateRange } = useSelector(
    (state: RootState) => state.category
  );

  const onChangeChartType = (event: SelectChangeEvent<"line" | "bar">) =>
    dispatch(setChart(event.target.value as ChartType));

  const onChangeDateRange = (dateRange: DateStringRange) => {
    const [start, end] = dateRange;
    dispatch(
      setDateRange([dayjs(start).toISOString(), dayjs(end).toISOString()])
    );
    setTimeout(() => onFinish(), 200);
  };
  const RefreshButton = (sx: SxProps) => (
    <IconButton onClick={onFinish} sx={{ ml: 1, p: "8px 12px", ...sx }}>
      <SyncIcon />
    </IconButton>
  );

  return (
    <Stack
      spacing={2}
      alignItems="space-between"
      direction="column"
      sx={{
        justifyContent: "space-between",
        ...widthSx,
      }}
    >
      {/* Row 1 */}
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => dispatch(setShowCategoryForm(true))}
          startIcon={<EditIcon />}
          color="info"
          sx={{ color: "text.secondary" }}
        >
          {t("edit-category")}
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
        {/* Row 2 Column 1 */}
        <Stack
          direction="row"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <FormGroup
            row
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%" },
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("start")}
                value={dateRange[0]}
                onChange={(newDate) =>
                  newDate && onChangeDateRange([newDate, dateRange[1]])
                }
                renderInput={(params) => <TextField {...params} />}
                inputFormat={DATEFORMAT_en}
              />
            </LocalizationProvider>
            <Typography sx={{ m: 1, color: "text.secondary" }}>
              {t("to")}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={t("end")}
                value={dateRange[1]}
                onChange={(newDate) =>
                  newDate && onChangeDateRange([dateRange[0], newDate])
                }
                renderInput={(params) => <TextField {...params} />}
                inputFormat={DATEFORMAT_en}
              />
            </LocalizationProvider>
          </FormGroup>
          {RefreshButton({ display: { xs: "none", sm: "inline-flex" } })}
        </Stack>

        <Stack
          direction="row"
          sx={{
            flexDirection: { xs: "column-reverse" },
            justifyContent: { xs: "space-between" },
            alignItems: { xs: "flex-end" },
            height: { xs: "100%" },
          }}
        >
          {RefreshButton({
            display: { xs: "inline-flex", sm: "none" },
          })}
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
                  {t(CHART_TYPE_LABELS[type as keyof typeof CHART_TYPE_LABELS])}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CategoryHeader;
