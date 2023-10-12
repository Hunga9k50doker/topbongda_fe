import React from "react";
import LeagueDetailPageContent from "@/components/Pages/LeagueDetailPage";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
import {
  getCompetitionDetailAPI,
  getCompetitionMatchesListAPI,
  getStandingAPI,
  getTopBadgesAPI,
} from "@/apis/soccer_fetch_apis";
import { COMPETITION_TABS } from "@/configs/constants";
import { getStoriesListAPI } from "@/apis/news_fetch_apis";

interface LeagueDetailPageProps {
  params: { slugId: string; tab: string };
  searchParams: {
    status: string;
  };
}

export async function generateMetadata({
  params,
}: LeagueDetailPageProps): Promise<Metadata> {
  const competitionDetail: any = await getCompetitionDetailAPI({
    slug: params.slugId,
  });
  if (!competitionDetail) return notFound();
  switch (params.tab) {
    case COMPETITION_TABS.LICH_THI_DAU:
      return {
        title: `Lịch thi đấu ${competitionDetail.name} - ${BRAND_NAME}`,
        description: `Bóng đá hôm nay, lịch thi đấu ${competitionDetail.name}, kết quả ${competitionDetail.name}`,
        alternates: {
          canonical: `${competitionDetail.fullUrl}/${params.tab}`,
        },
      };
    case COMPETITION_TABS.BANG_XEP_HANG:
      return {
        title: `Bảng xếp hạng ${competitionDetail.name} - ${BRAND_NAME}`,
        description: `Thông tin chi tiết về bảng xếp hạng ${competitionDetail.name}`,
        alternates: {
          canonical: `${competitionDetail.fullUrl}/${params.tab}`,
        },
      };
    case COMPETITION_TABS.TOP_DANH_HIEU:
      return {
        title: `Top danh hiệu giải ${competitionDetail.name} - ${BRAND_NAME}`,
        description: `Thông tin chi tiết về danh hiệu các cầu thủ trong giải đấu ${competitionDetail.name}`,
        alternates: {
          canonical: `${competitionDetail.fullUrl}/${params.tab}`,
        },
      };
    case COMPETITION_TABS.BAI_VIET:
      return {
        title: `Bài viết ${competitionDetail.name} - ${BRAND_NAME}`,
        description: `Các bài viết thảo luận về giải ${competitionDetail.name}`,
        alternates: {
          canonical: `${competitionDetail.fullUrl}/${params.tab}`,
        },
      };
    case COMPETITION_TABS.TIN_TUC:
      return {
        title: `Tin tức bóng đá, Tin tức liên quan giải đấu ${competitionDetail.name} - ${BRAND_NAME}`,
        description: `Tin tức gần đây, hot ${competitionDetail.name}`,
        alternates: {
          canonical: `${competitionDetail.fullUrl}/${params.tab}`,
        },
      };
    default:
      return notFound();
  }
}

const LeagueDetailPage = async ({
  params,
  searchParams,
}: LeagueDetailPageProps) => {
  const { slugId } = params;
  const { status } = searchParams;

  const pageSize = 12;
  const p1 = {
    competition: slugId,
    page_size: pageSize,
  };

  let competition,
    matchesData,
    relatedNews,
    relatedTopics,
    standingData,
    topBadges;

  competition = await getCompetitionDetailAPI({ slug: slugId });
  switch (params.tab) {
    case COMPETITION_TABS.LICH_THI_DAU:
      matchesData = await getCompetitionMatchesListAPI({
        slug: slugId,
        status: status || "ALL",
      });
      break;
    case COMPETITION_TABS.BANG_XEP_HANG:
      standingData = await getStandingAPI({ competitionSlug: slugId });
      break;
    case COMPETITION_TABS.TOP_DANH_HIEU:
      topBadges = await getTopBadgesAPI({
        competitionsSlug: slugId,
        season: new Date().getFullYear(),
      });
      break;
    case COMPETITION_TABS.BAI_VIET:
      relatedTopics = await getTopicsListAPI({
        competition: slugId,
        page_size: 10,
      });
      break;
    case COMPETITION_TABS.TIN_TUC:
      relatedNews = await getStoriesListAPI(p1);
      break;
    default:
      break;
  }

  return (
    <LeagueDetailPageContent
      pageSize={pageSize}
      competition={competition}
      relatedTopics={relatedTopics}
      matchesData={matchesData}
      relatedNews={relatedNews}
      standingData={standingData}
      topBadge={topBadges?.data}
    />
  );
};

export default LeagueDetailPage;
