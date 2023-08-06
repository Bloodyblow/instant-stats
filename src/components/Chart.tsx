import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import TimeRangeChart from "./charts/TimeRangeChart";
import dayjs from "dayjs";
import { DATEFORMAT_en } from "@/app/constants";

export const CHART_TYPES = ["line", "bar", "timeRange"];
export const CHART_TYPE_LABELS = {
  line: "Line chart",
  bar: "Bar chart",
  timeRange: "Time range chart",
};

export default function Chart() {
  const { category, chart, values } = useSelector(
    (state: RootState) => state.category
  );
  if (!category || values.length === 0) return null;

  const valuesReady = values.map((item) => ({
    ...item,
    date: dayjs(item.date).format(DATEFORMAT_en),
  }));

  const getChart = (type: string) => {
    switch (type) {
      case "line":
        return <LineChart category={category} values={valuesReady} />;
      case "bar":
        return <BarChart category={category} values={valuesReady} />;
      case "timeRange":
        return <TimeRangeChart category={category} values={valuesReady} />;
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
