import React, { Suspense, memo, useCallback, useEffect } from "react";
import CardPost from "@/components/Cards/CardPost";
import { Box, Grid, Typography } from "@mui/material";
import { getTopTopicsListAPI } from "@/apis/forum_apis";
import { HomeCardLoader } from "@/loaders";
import { useInView } from "react-intersection-observer";
import { TopicDataModel } from "@/models/topic_model";
import { RootState, store } from "@/store";
import { updatePopularTopics } from "@/reducers/topicsSlice";
import { useSelector } from "react-redux";
interface TopicsProps {
  topTopics: TopicDataModel;
}
const Topics = ({ topTopics }: TopicsProps) => {
  const { popularTopics, isLoading } = useSelector(
    (state: RootState) => state.topicsStore
  );
  const [loading, setLoading] = React.useState(false);
  const [pageData, setPageData] = React.useState(topTopics);
  const [onerror, setOnerror] = React.useState(false);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = useCallback(() => {
    getTopTopicsListAPI({ page: popularTopics.current + 1 })
      .then((r) => {
        store.dispatch(
          updatePopularTopics({
            ...r.data,
            items: [...popularTopics.items, ...r.data.items],
          })
        );
      })
      .catch((e) => {
        setLoading(false);
        setOnerror(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [popularTopics]);

  React.useEffect(() => {
    if (pageData.current < pageData.numPages && inView) {
      setLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  useEffect(() => {
    setPageData(popularTopics);
  }, [popularTopics]);
  return (
    <Suspense fallback={<HomeCardLoader />}>
      <Box>
        {/* loading when store updating first time */}
        {isLoading && (
          <Grid item xs={12}>
            <HomeCardLoader />
          </Grid>
        )}
        {pageData.items.length > 0 && !isLoading && (
          <Grid alignItems={"center"} sx={{ mt: 1 }} container>
            {pageData.items.map((item: any, key) => (
              <CardPost key={key} data={item.topic} />
            ))}
          </Grid>
        )}

        {/* infinity load topic */}
        {loading && <HomeCardLoader />}
        {pageData.current === pageData.numPages && (
          <Typography variant="body2" sx={{ my: 2 }} textAlign={"center"}>
            ~ hết danh sách ~
          </Typography>
        )}
        {!onerror && <div ref={viewBottomRef} className="mt-4" />}
      </Box>
    </Suspense>
  );
};

export default memo(Topics);
