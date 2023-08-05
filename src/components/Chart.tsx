import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
import dayjs from "dayjs";
import { DATEFORMAT_MONTH_DAY_en } from "@/app/constants";

export const CHART_TYPES = ["line", "bar"];
export const CHART_TYPE_LABELS = {
  line: "Line chart",
  bar: "Bar chart",
};

export default function Chart() {
  const { category, chart, values } = useSelector(
    (state: RootState) => state.category
  );
  if (!category || values.length === 0) return null;

  const valuesReady = values.map((item) => ({
    ...item,
    date: dayjs(item.date).format(DATEFORMAT_MONTH_DAY_en),
  }));
  return (
    <Card
      sx={{
        height: "400px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      {chart === "line" ? (
        <LineChart category={category} values={valuesReady} />
      ) : (
        <BarChart category={category} values={valuesReady} />
      )}
    </Card>
  );
}
