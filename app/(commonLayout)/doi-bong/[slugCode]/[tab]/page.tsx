import React from "react";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import TeamDetailContent from "@/components/Pages/TeamDetailPage";
import {
  getMatchesListAPI,
  getTeamDetailAPI,
  getTeamMemberAPI,
} from "@/apis/soccer_fetch_apis";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
import { getMembersListAPI } from "@/apis/user_fetch_apis";
import { TEAM_TABS } from "@/configs/constants";
import { getStoriesListAPI } from "@/apis/news_fetch_apis";

interface LeaguesProps {
  params: {
    slugCode: string;
    tab: string;
  };
  searchParams: {
    page: number;
  };
}

export async function generateMetadata({
  params,
}: LeaguesProps): Promise<Metadata> {
  const teamDetail: any = await getTeamDetailAPI({
    teamCode: params.slugCode,
  });
  switch (params.tab) {
    case TEAM_TABS.LICH_THI_DAU:
      return {
        title: `Lịch thi đấu ${teamDetail.name} - ${BRAND_NAME}`,
        description: `Thông tin lịch thi đấu ${teamDetail.name}, kết quả ${teamDetail.name} hôm nay`,
        alternates: {
          canonical: `${teamDetail.fullUrl}${params.tab}`,
        },
      };
    case TEAM_TABS.CAU_THU:
      return {
        title: `Danh sách cầu thủ ${teamDetail.name} - ${BRAND_NAME}`,
        description: `Thông tin cầu thủ ${teamDetail.name}`,
        alternates: {
          canonical: `${teamDetail.fullUrl}${params.tab}`,
        },
      };
    case TEAM_TABS.FAN_HAM_MO:
      return {
        title: `Fan hâm mộ ${teamDetail.name} - ${BRAND_NAME}`,
        description: `Thông tin fan hâm mộ ${teamDetail.name}`,
        alternates: {
          canonical: `${teamDetail.fullUrl}${params.tab}`,
        },
      };
    case TEAM_TABS.BAI_VIET:
      return {
        title: `Bài viết về ${teamDetail.name} - ${BRAND_NAME}`,
        description: `Danh sách bài biết về ${teamDetail.name}`,
        alternates: {
          canonical: `${teamDetail.fullUrl}${params.tab}`,
        },
      };
    case TEAM_TABS.TIN_TUC:
      return {
        title: `Tin tức ${teamDetail.name} - ${BRAND_NAME}`,
        description: `Các tin liên quan ${teamDetail.name}`,
        alternates: {
          canonical: `${teamDetail.fullUrl}${params.tab}`,
        },
      };
    default:
      return {
        title: `${teamDetail.name} - ${BRAND_NAME}`,
        description: teamDetail.pageDesc,
        alternates: {
          canonical: teamDetail.fullUrl,
        },
      };
  }
}

const TeamDetailPage = async ({ params, searchParams }: LeaguesProps) => {
  const { slugCode } = params;
  const { page } = searchParams;
  const pieces = slugCode?.split(/[\s-]+/);
  const code = pieces[pieces.length - 1];
  const p1 = {
    team: code,
    page: page || 1,
    page_size: 10,
  };

  let teamMember, relatedNews, matchesData, relatedTopics, fans;

  const teamDetail = await getTeamDetailAPI(
    {
      teamCode: params.slugCode,
    },
    {
      cache: "force-cache",
    }
  );
  switch (params.tab) {
    case TEAM_TABS.LICH_THI_DAU:
      matchesData = await getMatchesListAPI({ db: code });
      break;
    case TEAM_TABS.CAU_THU:
      teamMember = await getTeamMemberAPI({ teamCode: code });
      break;
    case TEAM_TABS.FAN_HAM_MO:
      fans = await getMembersListAPI({
        team_code: code,
        page: page || 1,
      });
      break;
    case TEAM_TABS.BAI_VIET:
      relatedTopics = await getTopicsListAPI({ team: code });
      break;
    case TEAM_TABS.TIN_TUC:
      relatedNews = await getStoriesListAPI(p1);
      break;
    default:
      break;
  }

  return (
    <TeamDetailContent
      slugCode={slugCode}
      teamDetail={teamDetail}
      teamMember={teamMember}
      matchesData={matchesData}
      relatedTopics={relatedTopics}
      relatedNews={relatedNews}
      fans={fans}
    />
  );
};

export default TeamDetailPage;
