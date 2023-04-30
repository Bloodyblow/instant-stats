import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";

export const CHART_TYPES = ["line", "bar"];
export const CHART_TYPE_LABELS = {
  line: "Line chart",
  bar: "Bar chart",
};

export default function Chart() {
  const { category, chart } = useSelector((state: RootState) => state.category);
  if (!category || !category.values || category.values.length === 0)
    return null;

  return (
    <Card
      sx={{
        height: "400px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      {chart === "line" ? (
        <LineChart category={category} />
      ) : (
        <BarChart category={category} />
      )}
    </Card>
  );
}
