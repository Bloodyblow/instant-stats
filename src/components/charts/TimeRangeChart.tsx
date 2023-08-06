// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { RootState } from "@/app/store/store";
import { CategoryExtend, Value } from "@/app/types";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { ResponsiveTimeRange } from "@nivo/calendar";
import dayjs from "dayjs";
import ChartTooltip from "../ChartTooltip";

export default function TimeRangeChart({
  category,
  values,
}: {
  category: CategoryExtend;
  values: Value[];
}) {
  const { dateRange } = useSelector((state: RootState) => state.category);
  const { name, unit } = category;

  const data: any[] = values.map((value) => ({
    day: value.date,
    value: value.value,
  }));

  console.log(data);

  return (
    <Box
      sx={{
        height: "400px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <ResponsiveTimeRange
        data={data}
        from={dayjs(dateRange[0]).subtract(2, "month").format("YYYY-MM-DD")}
        to={dayjs(dateRange[1]).add(2, "month").format("YYYY-MM-DD")}
        emptyColor="transparent"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
        theme={{
          textColor: "white",
          fontSize: 14,
        }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff25"
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
            translateX: -60,
            translateY: -60,
            symbolSize: 20,
          },
        ]}
        tooltip={(param) => <ChartTooltip value={param.value} unit={unit} />}
      />
    </Box>
  );
}
