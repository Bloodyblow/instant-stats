import { Box, Typography } from "@mui/material";

export default function ChartTooltip({
  value,
  unit,
}: {
  value: number;
  unit: string;
}) {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        p: 1,
        borderRadius: 1,
        border: "1px solid",
      }}
    >
      <Typography variant="body2">
        {value} {unit}
      </Typography>
    </Box>
  );
}
