import React from "react";
import NoData from "@/components/common/NoData";
import WrapTitle from "@/components/common/WrapTitle";
import { TeamModel } from "@/models/team_model";
import { getStoriesListAPI } from "@/apis/news_apis";
import CardStory from "@/components/Cards/CardStory";
import { NewLoader } from "@/loaders";
import { Typography } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { StoryModel } from "@/models/new_model";

interface TeamNewsProps {
  teamDetail: TeamModel;
  relatedNews: StoryModel;
}

const TeamNews = ({ teamDetail, relatedNews }: TeamNewsProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [onerror, setOnerror] = React.useState(false);
  const [pageData, setPageData] = React.useState(relatedNews);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = React.useCallback(() => {
    const p1 = {
      team: teamDetail.code,
      page: pageData.current + 1,
      page_size: 10,
    };
    getStoriesListAPI(p1)
      .then((r) => {
        setPageData({ ...r.data, items: [...pageData.items, ...r.data.items] });
      })
      .catch((err) => {
        setOnerror(true);
        setIsLoading(false);
      });
  }, [pageData]);

  React.useEffect(() => {
    if (pageData.current < pageData.numPages && inView) {
      setIsLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  return (
    <>
      <h2>
        <WrapTitle title={`Tin tức liên quan ${teamDetail.name}`} />
      </h2>
      {pageData.items.map((item: any) => (
        <CardStory key={item.code} item={item} showTag={true} />
      ))}
      {isLoading && <NewLoader />}
      {pageData.items.length === 0 && (
        <NoData title="Chưa có tin tức nào liên quan" />
      )}
      {pageData.current === pageData.numPages && pageData.items.length > 0 && (
        <Typography variant="body2" sx={{ my: 2 }} textAlign={"center"}>
          ~ hết danh sách ~
        </Typography>
      )}
      {!onerror && <div ref={viewBottomRef} className="mt-4" />}
    </>
  );
};

export default React.memo(TeamNews);
