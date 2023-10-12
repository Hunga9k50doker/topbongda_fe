import { Box, LinearProgress, Typography } from "@mui/material";

function LinearProgressWithLabel({
  value,
  rotate,
  ...props
}: {
  value: number;
  rotate?: string;
}) {
  const val = value > 100 ? 100 : Math.round(value);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {rotate && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {val}%
          </Typography>
        </Box>
      )}
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          sx={{
            height: 14,
            transform: rotate ? `rotate(${rotate})` : "rotate(0deg)",
          }}
          {...props}
          value={val}
        />
      </Box>
      {!rotate && (
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {val}%
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default LinearProgressWithLabel;
