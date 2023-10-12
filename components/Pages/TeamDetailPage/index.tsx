"use client";
import React from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TeamOverview from "@/components/Pages/TeamDetailPage/TeamOverview";
import TeamFans from "@/components/Pages/TeamDetailPage/TeamFans";
import TeamNews from "@/components/Pages/TeamDetailPage/TeamNews";
import TeamMembers from "@/components/Pages/TeamDetailPage/TeamMembers";
import TeamTopics from "@/components/Pages/TeamDetailPage/TeamTopics";
import { TeamModel } from "@/models/team_model";
import { TopicDataModel } from "@/models/topic_model";
import { useParams } from "next/navigation";
import Link from "next/link";
import { TEAM_TABS } from "@/configs/constants";
import Card from "@mui/material/Card";
import MatchItem from "@/components/Soccer/MatchItem";
import { FanModel } from "@/models/fan_model";
import { StoryModel } from "@/models/new_model";
import NoData from "@/components/common/NoData";
import { Tabs } from "@mui/material";

interface TeamDetailProps {
  slugCode: string;
  teamDetail: TeamModel;
  teamMember?: any;
  matchesData?: any;
  relatedTopics?: TopicDataModel;
  fans?: FanModel;
  relatedNews?: StoryModel;
}

function TeamDetailContent({
  slugCode,
  teamDetail,
  matchesData,
  teamMember,
  relatedTopics,
  relatedNews,
  fans,
  ...props
}: TeamDetailProps) {
  const { tab } = useParams();
  const value = tab || TEAM_TABS.TONG_QUAN;

  return (
    //@ts-ignore
    <>
      <Box sx={{ borderBottom: 2, borderColor: "divider", mb: 1 }}>
        <Tabs
          value={value}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="lab API tabs example"
        >
          <TabLink
            label={teamDetail.name || "Tổng quan"}
            value={TEAM_TABS.TONG_QUAN}
          />
          <TabLink label="Lịch thi đấu" value={TEAM_TABS.LICH_THI_DAU} />
          <TabLink label="Cầu thủ" value={TEAM_TABS.CAU_THU} />
          <TabLink label="Fan hâm Mộ" value={TEAM_TABS.FAN_HAM_MO} />
          <TabLink label="Bài viết" value={TEAM_TABS.BAI_VIET} />
          <TabLink
            label={`Điểm Tin ${teamDetail.name}`}
            value={TEAM_TABS.TIN_TUC}
          />
        </Tabs>
      </Box>
      {value === TEAM_TABS.TONG_QUAN && (
        <TeamOverview
          teamDetail={teamDetail}
          matchesData={matchesData}
          slugCode={slugCode}
          relatedTopics={relatedTopics}
        />
      )}
      {value === TEAM_TABS.LICH_THI_DAU && (
        <>
          {matchesData.data.length > 0 ? (
            matchesData.data.map((item: any, idx: number) => (
              <Card className="mb-4" key={`${item[0]}-${idx}`}>
                <div className="mt-4 mb-2">
                  <h2 className="uppercase text-sm font-bold text-primary border-0 border-l-4 border-solid border-primary/40 pl-2">
                    {item[1]}
                  </h2>
                </div>

                {item[2].map((mi: any, key: number) => (
                  <MatchItem
                    key={key}
                    matchItem={mi}
                    viewStatus={true}
                    showLeagueName
                    style={styles}
                  />
                ))}
              </Card>
            ))
          ) : (
            <NoData title="Chưa có thông tin lịch thi đấu" />
          )}
        </>
      )}
      {value === TEAM_TABS.CAU_THU && (
        <TeamMembers teamDetail={teamDetail} teamMember={teamMember} />
      )}
      {value === TEAM_TABS.FAN_HAM_MO && fans && (
        <TeamFans teamDetail={teamDetail} fans={fans} />
      )}
      {value === TEAM_TABS.BAI_VIET && relatedTopics && (
        <TeamTopics teamDetail={teamDetail} relatedTopics={relatedTopics} />
      )}
      {value === TEAM_TABS.TIN_TUC && relatedNews && (
        <TeamNews teamDetail={teamDetail} relatedNews={relatedNews} />
      )}
    </>
  );
}

export default TeamDetailContent;

const TabLink = ({ label, value }: { label: string; value: string }) => {
  const { slugCode } = useParams();
  return (
    <Tab
      LinkComponent={Link}
      label={label}
      value={value}
      href={`/doi-bong/${slugCode}/${
        value === TEAM_TABS.TONG_QUAN ? "" : value
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
