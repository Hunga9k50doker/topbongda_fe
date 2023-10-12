"use client";
import React from "react";
import Card from "@mui/material/Card";
import MatchItem from "@/components/Soccer/MatchItem";
import Divider from "@mui/material/Divider";
import { getCompetitionMatchesListAPI } from "@/apis/soccer_apis";
import HTMLReactParser from "html-react-parser";
import { numberFormatter } from "@/utils";
import RelatedTopicsHeadlineItem from "@/components/Soccer/RelatedTopicsHeadlineItem";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import WrapTitle from "@/components/common/WrapTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import NoData from "@/components/common/NoData";
import { Box, Button, CardContent } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useParams, useRouter } from "next/navigation";
import { useLocalStorage } from "react-use";
import { Badge } from "antd";
import useSWR from "swr";
import { FORUM_API_NEW_TOPICS_LIST } from "@/configs/endpoints/forum_endpoints";
import { getTopicsListAPI } from "@/apis/forum_apis";
import LeagueSchedule from "@/components/Pages/LeagueDetailPage/LeagueSchedule";

interface LeagueDetailProps {
  competition: any;
  matchesData: any;
}

function LeagueDetail({
  competition,
  matchesData,
  ...props
}: LeagueDetailProps) {
  const { slugId } = useParams();
  const [items, setItems] = React.useState(matchesData?.data || []);
  const [pageData, setPageData] = React.useState(matchesData);
  const [, setStoVal] = useLocalStorage<any>("tbd-new-topic-save", "");
  const router = useRouter();

  const loadMore = React.useCallback(() => {
    getCompetitionMatchesListAPI({ slug: slugId, page: pageData.current + 1 })
      .then((r) => {
        setItems([...items, ...r.data.data]);
        setPageData(r.data);
      })
      .catch(() => {});
  }, [pageData, items, slugId]);

  const onRederict = () => {
    setStoVal({
      competitions: [
        {
          name: competition.name,
          icon: competition.logo,
          slug: competition.url,
        },
      ],
    });
    router.push("/dang-bai/");
  };

  const { data: relatedTopics }: any = useSWR(FORUM_API_NEW_TOPICS_LIST, () =>
    getTopicsListAPI({
      competition: slugId,
      page_size: 10,
    })
      .then((r) => r.data)
      .catch(() => {})
  );

  return (
    <>
      <Box>
        <Card className="mb-4">
          <CardContent>
            {competition.desc && (
              <Box className="text-sm">
                {HTMLReactParser(competition.desc || "")}
              </Box>
            )}
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    numberFormatter(competition.numUpcomingMatches) || "-"
                  }
                  secondary="Trận đấu"
                />
                <ListItemText
                  primary={numberFormatter(competition.numRelatedTopics) || "-"}
                  secondary="Bài viết liên quan"
                />
              </ListItem>
            </List>
            <Button
              onClick={onRederict}
              variant="outlined"
              fullWidth
              startIcon={<AddCircleOutlineOutlinedIcon />}
              size="small"
            >
              Đăng bài trong giải đấu này
            </Button>
          </CardContent>
        </Card>
        <WrapTitle title="Lịch thi đấu"></WrapTitle>
        <LeagueSchedule matchesData={items} />
        {items.length === 0 && (
          <NoData title="Chưa có trận đấu nào sắp diễn ra, xem tất cả trận đấu qua lịch thi đấu" />
        )}
        {pageData?.hasNext && <LoadMoreButton loadMore={loadMore} />}
        {relatedTopics?.items?.length > 0 && (
          <>
            <WrapTitle title="Bài viết diễn đàn liên quan" />
            {relatedTopics.items.map((item: any) => (
              <RelatedTopicsHeadlineItem key={item.code} item={item} />
            ))}
          </>
        )}
      </Box>
    </>
  );
}

export default React.memo(LeagueDetail);

const styles = {
  "& img": {
    width: "24px",
    height: "24px",
  },
  "& h4": {
    fontSize: "16px",
  },

  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
};
