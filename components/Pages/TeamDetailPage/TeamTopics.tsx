import React from "react";
import CardPost from "@/components/Cards/CardPost";
import { getTopicsListAPI } from "@/apis/forum_apis";
import { TopicDataModel, TopicDetailModel } from "@/models/topic_model";
import WrapTitle from "@/components/common/WrapTitle";
import NoData from "@/components/common/NoData";
import { TeamModel } from "@/models/team_model";
import { HomeCardLoader } from "@/loaders";
import { useInView } from "react-intersection-observer";
import { Typography } from "@mui/material";

interface TeamTopicsProps {
  teamDetail: TeamModel;
  relatedTopics: TopicDataModel;
}

const TeamTopics = ({ teamDetail, relatedTopics }: TeamTopicsProps) => {
  const [pageData, setPageData] = React.useState(relatedTopics);
  const [loading, setLoading] = React.useState(false);
  const [onerror, setOnerror] = React.useState(false);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = React.useCallback(() => {
    getTopicsListAPI({
      team_code: teamDetail.code,
      page: relatedTopics.current + 1,
    })
      .then((r) => {
        setPageData({
          ...r.data,
          items: [...pageData.items, ...r.data.items],
        });
      })
      .catch((e) => {
        setOnerror(true);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [relatedTopics]);

  React.useEffect(() => {
    if (relatedTopics.current < relatedTopics.numPages && inView) {
      setLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  return (
    <>
      <h2>
        <WrapTitle title={`Bài viết liên quan ${teamDetail.name}`} />
      </h2>
      {pageData.items.map((item: TopicDetailModel) => (
        <CardPost key={item.code} data={item} />
      ))}
      {pageData.items.length === 0 && <NoData title="Chưa có bài viết nào" />}
      {loading && <HomeCardLoader />}
      {pageData.current === pageData.numPages && pageData.items.length > 0 && (
        <Typography variant="body2" sx={{ my: 2 }} textAlign={"center"}>
          ~ hết danh sách ~
        </Typography>
      )}
      {!onerror && <div ref={viewBottomRef} className="mt-4" />}
    </>
  );
};

export default TeamTopics;
