import { ResponsiveBar } from "@nivo/bar";
import { Box } from "@mui/material";
import { CategoryExtend, Value } from "@/app/types";
import ChartTooltip from "../ChartTooltip";
import { RootState } from "@/app/store/store";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

export default function BarChart({
  category,
  values,
  theme,
}: {
  category: CategoryExtend;
  values: Value[];
  theme: any;
}) {
  const { name, unit } = category;
  const { dateRange } = useSelector((state: RootState) => state.category);
  dayjs.extend(isBetween);

  const valuesInRange = values.filter((value) =>
    dayjs(value.date).isBetween(dateRange[0], dateRange[1])
  );

  return (
    <Box
      sx={{
        height: "400px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <ResponsiveBar
        data={valuesInRange}
        keys={["value"]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "accent" }}
        role="application"
        ariaLabel={`${name} (${unit})`}
        barAriaLabel={(e) => `${e.value} ${unit}`}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //   },
        // ]}
        theme={theme}
        tooltip={(param) => <ChartTooltip value={param.value} unit={unit} />}
      />
    </Box>
  );
}
