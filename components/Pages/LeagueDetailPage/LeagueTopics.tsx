import React from "react";
import CardPost from "@/components/Cards/CardPost";
import { getTopicsListAPI } from "@/apis/forum_apis";
import { TopicDataModel, TopicDetailModel } from "@/models/topic_model";
import WrapTitle from "@/components/common/WrapTitle";
import { CompetitionItemModel } from "@/models/competition_model";
import NoData from "@/components/common/NoData";
import { useInView } from "react-intersection-observer";
import { Typography } from "@mui/material";
import { HomeCardLoader } from "@/loaders";
import { useParams } from "next/navigation";

interface LeagueTopicsProps {
  competition: CompetitionItemModel;
  relatedTopics: TopicDataModel;
  pageSize: number;
}
function LeagueTopics({
  competition,
  relatedTopics,
  pageSize,
  ...props
}: LeagueTopicsProps) {
  const { slugId } = useParams();
  const [pageData, setPageData] = React.useState(relatedTopics);
  const [loading, setLoading] = React.useState(false);
  const [onerror, setOnerror] = React.useState(false);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = React.useCallback(() => {
    getTopicsListAPI({
      competition: slugId,
      page: pageData.current + 1,
      page_size: pageSize,
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
    if (pageData.current < pageData.numPages && inView) {
      setLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div className="mt-4">
      <h2>
        <WrapTitle title={`Bài viết liên quan giải đấu ${competition.name}`} />
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
    </div>
  );
}

export default React.memo(LeagueTopics);
