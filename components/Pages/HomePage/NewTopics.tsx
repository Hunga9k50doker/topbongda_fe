import React, { memo, useCallback } from "react";
import CardPost from "@/components/Cards/CardPost";
import { Typography, Box, Grid } from "@mui/material";
import { getNewTopicsListAPI } from "@/apis/forum_apis";
import { HomeCardLoader } from "@/loaders";
import { useInView } from "react-intersection-observer";
import { TopicDataModel } from "@/models/topic_model";
import { RootState, store } from "@/store";
import { updateNewTopics } from "@/reducers/topicsSlice";
import { useSelector } from "react-redux";

interface NewTopicsProps {
  newTopicsData: TopicDataModel;
}
const NewTopics = ({ newTopicsData }: NewTopicsProps) => {
  const { newTopics, isLoading } = useSelector(
    (state: RootState) => state.topicsStore
  );
  const [pageData, setPageData] = React.useState(newTopicsData);
  const [loading, setLoading] = React.useState(false);
  const [onerror, setOnerror] = React.useState(false);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    getNewTopicsListAPI({ page: newTopics.current + 1 })
      .then((r) => {
        store.dispatch(
          updateNewTopics({
            ...r.data,
            items: [...newTopics.items, ...r.data.items],
          })
        );
        setLoading(false);
      })
      .catch((e) => {
        setOnerror(true);
        setLoading(false);
      });
  }, [newTopics]);

  React.useEffect(() => {
    if (pageData.current < pageData.numPages && inView) {
      setLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  return (
    <Box>
      {isLoading && (
        <Grid item xs={12}>
          <HomeCardLoader />
        </Grid>
      )}
      <Grid alignItems={"center"} sx={{ mt: 1 }} container>
        {pageData.items.length > 0 &&
          !isLoading &&
          pageData.items.map((item, key) => <CardPost key={key} data={item} />)}
      </Grid>
      {/* infinity load topic */}
      {loading && <HomeCardLoader />}
      {pageData.current === pageData.numPages && (
        <Typography variant="body2" sx={{ my: 2 }} textAlign={"center"}>
          ~ hết danh sách ~
        </Typography>
      )}
      {!onerror && <div ref={viewBottomRef} className="mt-4" />}
    </Box>
  );
};

export default memo(NewTopics);
