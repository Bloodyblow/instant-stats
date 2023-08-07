// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { CategoryExtend, Value } from "@/app/types";
import { Box } from "@mui/material";
import {
  PointTooltip,
  PointTooltipProps,
  ResponsiveLine,
  Serie,
} from "@nivo/line";
import ChartTooltip from "../ChartTooltip";

export default function LineChart({
  category,
  values,
  theme,
}: {
  category: CategoryExtend;
  values: Value[];
  theme: any;
}) {
  const { name, unit } = category;

  const data: Serie[] = [
    {
      id: name,
      data: values.map((value) => ({
        x: value.date,
        y: value.value,
      })),
    },
  ];

  return (
    <Box
      sx={{
        height: "400px",
        width: "100%",
        backgroundColor: "background.paper",
      }}
    >
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        colors={{ scheme: "accent" }}
        theme={theme}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        tooltip={(param: PointTooltipProps) => {
          return (
            <ChartTooltip value={param.point.data.yFormatted} unit={unit} />
          );
        }}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        // legends={[
        //   {
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 100,
        //     translateY: 0,
        //     itemsSpacing: 0,
        //     itemDirection: "left-to-right",
        //     itemWidth: 80,
        //     itemHeight: 20,
        //     itemOpacity: 0.75,
        //     symbolSize: 12,
        //     symbolShape: "circle",
        //     symbolBorderColor: "rgba(0, 0, 0, .5)",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemBackground: "rgba(0, 0, 0, .03)",
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </Box>
  );
}
