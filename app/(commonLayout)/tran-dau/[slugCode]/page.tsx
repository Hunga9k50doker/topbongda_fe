import React from "react";
import { Metadata } from "next";
import { formatDate } from "@/utils";
import { getStoriesListAPI } from "@/apis/news_apis";
import MatchDetail from "@/components/Pages/MatchDetailPage";
import { notFound } from "next/navigation";
import { BRAND_NAME } from "@/constants";
import { getMatchDetailAPI } from "@/apis/soccer_fetch_apis";
import { MatchDetailModel } from "@/models/match_model";
import { getHeadToHeadAPI } from "@/apis/soccer_apis";

interface MatchDetailProps {
  params: {
    slugCode: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: MatchDetailProps): Promise<Metadata> {
  const matchDetail: MatchDetailModel = await getMatchDetailAPI(
    params.slugCode
  );
  if (!matchDetail) return notFound();
  let pageTitle = "";
  const pt = `${matchDetail.homeTeam.name} vs ${matchDetail.awayTeam.name}`;
  if (matchDetail.kickOffAt) {
    pageTitle = pt + ` (${formatDate(matchDetail.kickOffAt, true)})`;
  } else {
    pageTitle = pt;
  }
  return {
    title: pageTitle,
    description: `Trận đấu ${pt} thuộc khuôn khổ giải đấu ${
      matchDetail?.competition?.name || matchDetail?.venue?.name
    }, tỉ số ${matchDetail.homeTeam.name} ${matchDetail.awayTeam.name}`,
    alternates: {
      canonical: matchDetail.fullUrl,
    },
  };
}

const MatchDetailPage = async ({ params }: MatchDetailProps) => {
  const { slugCode } = params;

  const matchDetail = await getMatchDetailAPI(slugCode);

  const paramsHeadLine = {
    match: 4, //number matches
    teamCodeOne: matchDetail.homeTeam.code,
    teamCodeTwo: matchDetail.awayTeam.code,
  };
  const paramsStories = {
    match: slugCode,
    page_size: 5,
    headline: "yes",
  };

  const [newsStoryHeadlines, matchHeadlines] = await Promise.all([
    getStoriesListAPI(paramsStories)
      .then((r) => r.data.items)
      .catch(() => []),
    getHeadToHeadAPI(paramsHeadLine)
      .then((r) => r.data.data)
      .catch(() => []),
  ]);

  return (
    <MatchDetail
      matchHeadlines={matchHeadlines}
      data={matchDetail}
      newsStoryHeadlines={newsStoryHeadlines}
    />
  );
};

export default MatchDetailPage;
