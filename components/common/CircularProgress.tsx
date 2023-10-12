import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CircularProgressWithLabelProps {
  value: number;
  children?: React.ReactNode;
}

export default function CircularProgressWithLabel({
  value,
  children,
}: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        size={50}
        variant="determinate"
        value={value}
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
      />
      {children}
    </Box>
  );
}
