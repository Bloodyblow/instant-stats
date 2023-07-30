import { ResponsiveBar } from "@nivo/bar";
import { Box, Typography } from "@mui/material";
import { CategoryExtend, Value } from "@/app/types";
import ChartTooltip from "../ChartTooltip";

export default function BarChart({
  category,
  values,
}: {
  category: CategoryExtend;
  values: Value[];
}) {
  const { name, unit } = category;

  return (
    <Box
      sx={{
        height: "400px",
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
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
        theme={{
          textColor: "white",
          fontSize: 14,
        }}
        tooltip={({ value }) => <ChartTooltip value={value} unit={unit} />}
      />
    </Box>
  );
}
