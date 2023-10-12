import React from "react";
import LeagueDetailPageContent from "@/components/Pages/LeagueDetailPage";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
import {
  getCompetitionDetailAPI,
  getCompetitionMatchesListAPI,
} from "@/apis/soccer_fetch_apis";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRAND_NAME } from "@/constants";

interface LeagueDetailPageProps {
  params: {
    slugId: string;
  };
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
  return {
    title: `${competitionDetail.name} - ${BRAND_NAME}`,
    description: `Cập nhật thông tin nhanh nhất, tin tức, bài viết, kết quả ${competitionDetail.name}, tỉ số ${competitionDetail.name} , lịch thi đấu ${competitionDetail.name}`,
    alternates: {
      canonical: competitionDetail.fullUrl,
    },
  };
}

const LeagueDetailPage = async ({
  params,
  searchParams,
}: LeagueDetailPageProps) => {
  const { slugId } = params;
  const { status } = searchParams;
  const pageSize = 12;

  const competition = await getCompetitionDetailAPI({ slug: slugId });

  const matchesData = await getCompetitionMatchesListAPI({
    slug: slugId,
    status: status || "NS",
  });

  const relatedTopics = await getTopicsListAPI({
    competition: slugId,
    page_size: 10,
    headline: "yes",
  });

  return (
    <LeagueDetailPageContent
      pageSize={pageSize}
      competition={competition}
      relatedTopics={relatedTopics}
      matchesData={matchesData}
    />
  );
};

export default LeagueDetailPage;
