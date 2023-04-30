import { ChartType } from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { setChart, setShowCategoryForm } from "../app/store/categorySlice";
import { CHART_TYPES, CHART_TYPE_LABELS } from "./Chart";
import EditIcon from "@mui/icons-material/Edit";
import { RootState } from "@/app/store/store";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

const CategoryHeader = () => {
  const dispatch = useDispatch();
  const { chart } = useSelector((state: RootState) => state.category);

  const onChangeChartType = (event: SelectChangeEvent<"line" | "bar">) =>
    dispatch(setChart(event.target.value as ChartType));

  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction="row"
      sx={{
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Button
        onClick={() => dispatch(setShowCategoryForm(true))}
        startIcon={<EditIcon />}
        color="info"
      >
        Edit the category
      </Button>

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
  );
};

export default CategoryHeader;
