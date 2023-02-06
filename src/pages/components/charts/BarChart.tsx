import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import { CategoryExtend } from "@/app/types";

export default function BarChart({ category }: { category: CategoryExtend }) {
  const { values, name, unit } = category;
  return (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <ResponsiveBar
        data={values}
        keys={["value"]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "accent" }}
        role="application"
        ariaLabel={`${name} (${unit})`}
        barAriaLabel={(e) => `${e.value} ${unit}`}
      />
    </Box>
  );
}
