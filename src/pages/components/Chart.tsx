import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import BarChart from "./charts/BarChart";

export default function Chart() {
  const { category } = useSelector((state: RootState) => state.category);
  if (!category) return null;

  return (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <BarChart category={category} />
    </Box>
  );
}
