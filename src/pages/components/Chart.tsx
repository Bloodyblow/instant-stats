import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import BarChart from "./charts/BarChart";

export default function Chart() {
  const { category } = useSelector((state: RootState) => state.category);
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
      <BarChart category={category} />
    </Card>
  );
}
