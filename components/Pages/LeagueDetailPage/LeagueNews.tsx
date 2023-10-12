"use client";
import React from "react";
import { getStoriesListAPI } from "@/apis/news_apis";
import CardStory from "@/components/Cards/CardStory";
import WrapTitle from "@/components/common/WrapTitle";
import NoData from "@/components/common/NoData";
import { NewLoader } from "@/loaders";
import { useInView } from "react-intersection-observer";
import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

interface LeagueNewsProps {
  competition: any;
  relatedNews: any;
  pageSize: number;
}

function LeagueNews({
  competition,
  relatedNews,
  pageSize,
  ...props
}: LeagueNewsProps) {
  const { slugId } = useParams();
  const [items, setItems] = React.useState(relatedNews.items);
  const [isLoading, setIsLoading] = React.useState(false);
  const [pageData, setPageData] = React.useState(relatedNews);
  const [onerror, setOnerror] = React.useState(false);
  const [viewBottomRef, inView] = useInView({
    threshold: 0.5,
  });

  const handleLoadMore = React.useCallback(() => {
    setIsLoading(true);
    const p1 = {
      competition: slugId,
      page: pageData.current + 1,
      page_size: pageSize,
    };
    getStoriesListAPI(p1)
      .then((r) => {
        setItems([...items, ...r.data.items]);
        setPageData(r.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setOnerror(true);
      });
  }, [pageData, items, pageSize, slugId]);

  React.useEffect(() => {
    if (pageData.current < pageData.numPages && inView) {
      setIsLoading(true);
      handleLoadMore();
    }
  }, [inView]);

  return (
    <div className="mt-4">
      <h2>
        <WrapTitle
          title={`Tin bóng đá liên quan giải đấu ${competition.name}`}
        />
      </h2>
      {items?.map((item: any) => (
        <CardStory key={item.code} item={item} showTag={true} />
      ))}
      {isLoading && <NewLoader />}
      {items.length === 0 && <NoData title="Chưa có tin tức nào liên quan" />}
      {pageData.current === pageData.numPages && items.length > 0 && (
        <Typography variant="body2" sx={{ my: 2 }} textAlign={"center"}>
          ~ hết danh sách ~
        </Typography>
      )}
      {!onerror && <div ref={viewBottomRef} className="mt-4" />}
    </div>
  );
}

export default React.memo(LeagueNews);
