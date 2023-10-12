import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Stack } from "@mui/material";
import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface LoadMoreButtonProps {
  loadMore: () => void;
  title?: string;
}
const LoadMoreButton = ({
  loadMore,
  title = "Tải thêm",
}: LoadMoreButtonProps) => {
  const [loadingMore, setLoadingMore] = React.useState(false);

  const handleLoadMore = () => {
    setLoadingMore(true);
    Promise.resolve(loadMore())
      .then(() => setTimeout(() => setLoadingMore(false), 3000))
      .catch(() => setTimeout(() => setLoadingMore(false), 3000));
  };
  return (
    <Stack
      justifyContent={"center"}
      sx={{ my: 2, width: "fit-content", mx: "auto" }}
    >
      {loadingMore ? (
        <LoadingButton
          variant="outlined"
          loading
          startIcon={<ArrowDownwardIcon />}
        >
          {title}
        </LoadingButton>
      ) : (
        <Button
          className="mx-auto"
          variant="outlined"
          startIcon={<ArrowDownwardIcon />}
          onClick={handleLoadMore}
        >
          {title}
        </Button>
      )}
    </Stack>
  );
};

export default LoadMoreButton;
