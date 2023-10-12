import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

interface StatisticItemProps {
  value: number | string;
  rotate?: string;
}

const StatisticItem = ({ rotate, value, ...props }: StatisticItemProps) => {
  const MIN = +value < 100 ? 0 : 100;
  const MAX = +value < 100 ? 100 : 1000;
  const fomatValue = React.useCallback(
    (value: string | number) => {
      if (typeof value === "string" && value.includes("%")) {
        const val = +value.split("%")[0];
        return val > 100 ? 100 : Math.round(val);
      }
      return ((+value - MIN) * 100) / (MAX - MIN);
    },
    [value]
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {rotate && (
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            className="text-center"
            color="text.secondary"
          >
            {value || 0}
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: 8,
            transform: rotate ? `rotate(${rotate})` : "rotate(0deg)",
          }}
          {...props}
          value={fomatValue(value)}
        />
      </Box>
      {!rotate && (
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            className="text-center"
            color="text.secondary"
          >
            {value || 0}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatisticItem;
