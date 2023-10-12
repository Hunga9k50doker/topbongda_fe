"use client";
import React from "react";
import Box from "@mui/material/Box";
import LeagueNews from "@/components/Pages/LeagueDetailPage/LeagueNews";
import LeagueDetail from "@/components/Pages/LeagueDetailPage/LeagueDetail";
import LeagueTopics from "@/components/Pages/LeagueDetailPage/LeagueTopics";
import LeagueStanding from "@/components/Pages/LeagueDetailPage/LeagueStanding";
import LeagueSchedule from "@/components/Pages/LeagueDetailPage/LeagueSchedule";
import TopBadges from "@/components/Pages/LeagueDetailPage//TopBadges";
import Tab from "@mui/material/Tab";
import { TopicDataModel } from "@/models/topic_model";
import {
  CompetitionItemModel,
  TopBadgesDataModel,
} from "@/models/competition_model";
import { Tabs } from "@mui/material";
import { COMPETITION_TABS } from "@/configs/constants";
import { useParams } from "next/navigation";
import Link from "next/link";

interface LeagueDetailProps {
  competition: CompetitionItemModel;
  matchesData?: any;
  relatedTopics?: TopicDataModel;
  relatedNews?: any;
  pageSize: number;
  standingData?: any;
  topBadge?: TopBadgesDataModel;
}

function LeagueDetailPage({
  competition,
  matchesData,
  relatedTopics,
  pageSize,
  relatedNews,
  standingData,
  topBadge,
  ...props
}: LeagueDetailProps) {
  const { tab } = useParams();
  const value = tab || COMPETITION_TABS.TONG_QUAN;
  return (
    <>
      <Box sx={{ borderBottom: 2, borderColor: "divider", mb: 1 }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="lab API tabs example"
        >
          <TabLink
            label={competition.name || "Tổng quan"}
            value={COMPETITION_TABS.TONG_QUAN}
          />
          <TabLink label="Lịch thi đấu" value={COMPETITION_TABS.LICH_THI_DAU} />
          <TabLink
            label="Bảng xếp hạng"
            value={COMPETITION_TABS.BANG_XEP_HANG}
          />
          <TabLink
            label="Top danh hiệu"
            value={COMPETITION_TABS.TOP_DANH_HIEU}
          />
          <TabLink
            label="Bài viết liên quan"
            value={COMPETITION_TABS.BAI_VIET}
          />
          <TabLink label="Tin tức" value={COMPETITION_TABS.TIN_TUC} />
        </Tabs>
      </Box>
      {value === COMPETITION_TABS.TONG_QUAN && (
        <LeagueDetail competition={competition} matchesData={matchesData} />
      )}
      {value === COMPETITION_TABS.LICH_THI_DAU && (
        <LeagueSchedule
          matchesData={matchesData.data}
          isViewMatchSchedulePage={true}
        />
      )}

      {value === COMPETITION_TABS.BANG_XEP_HANG && standingData && (
        <LeagueStanding standingData={standingData.data} />
      )}
      {value === COMPETITION_TABS.TOP_DANH_HIEU && topBadge && (
        <TopBadges topBadges={topBadge} />
      )}
      {value === COMPETITION_TABS.BAI_VIET && relatedTopics && (
        <LeagueTopics
          competition={competition}
          relatedTopics={relatedTopics}
          pageSize={pageSize}
        />
      )}
      {value === COMPETITION_TABS.TIN_TUC && relatedNews && (
        <LeagueNews
          competition={competition}
          relatedNews={relatedNews}
          pageSize={pageSize}
        />
      )}
    </>
  );
}

export default React.memo(LeagueDetailPage);

const TabLink = ({ label, value }: { label: string; value: string }) => {
  const { slugId } = useParams();
  return (
    <Tab
      LinkComponent={Link}
      label={label}
      value={value}
      href={`/giai-dau/${slugId}/${
        value === COMPETITION_TABS.TONG_QUAN ? "" : value
      }`}
    />
  );
};

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
