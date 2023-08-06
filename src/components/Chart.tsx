import { Card, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import TimeRangeChart from "./charts/TimeRangeChart";
import dayjs from "dayjs";
import { DATEFORMAT_en } from "@/app/constants";

export const CHART_TYPES = ["line", "bar", "timeRange"];
export const CHART_TYPE_LABELS = {
  line: "enum-line-chart",
  bar: "enum-bar-chart",
  timeRange: "enum-time-range-chart",
};

export default function Chart() {
  const { category, chart, values } = useSelector(
    (state: RootState) => state.category
  );

  const themeMode = useTheme().palette.mode;

  if (!category || values.length === 0) return null;

  const valuesReady = values.map((item) => ({
    ...item,
    date: dayjs(item.date).format(DATEFORMAT_en),
  }));

  const theme = {
    textColor: themeMode === "dark" ? "white" : "black",
    fontSize: 14,
  };

  const getChart = (type: string) => {
    switch (type) {
      case "line":
        return (
          <LineChart category={category} values={valuesReady} theme={theme} />
        );
      case "bar":
        return (
          <BarChart category={category} values={valuesReady} theme={theme} />
        );
      case "timeRange":
        return (
          <TimeRangeChart
            category={category}
            values={valuesReady}
            theme={theme}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        height: "400px",
        backgroundColor: "background.paper",
        borderRadius: "0",
        width: { xs: "100%", sm: "80%" },
      }}
    >
      {getChart(chart)}
    </Card>
  );
}
