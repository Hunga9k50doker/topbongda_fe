import React from "react";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamDetailContent from "@/components/Pages/TeamDetailPage";
import { getMatchesListAPI, getTeamDetailAPI } from "@/apis/soccer_fetch_apis";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
interface LeaguesProps {
  params: {
    slugCode: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: LeaguesProps): Promise<Metadata> {
  const teamDetail: any = await getTeamDetailAPI({ teamCode: params.slugCode });
  if (!teamDetail) return notFound();
  return {
    title: `${teamDetail.name} - ${BRAND_NAME}`,
    description: `Thông tin ${teamDetail.name}, lịch thi đấu ${teamDetail.name}`,
    alternates: {
      canonical: teamDetail.fullUrl,
    },
  };
}

const TeamDetailPage = async ({ params }: LeaguesProps) => {
  const { slugCode } = params;
  const pieces = slugCode?.split(/[\s-]+/);
  const code = pieces[pieces.length - 1];
  const teamDetail = await getTeamDetailAPI(
    { teamCode: code },
    {
      cache: "force-cache",
    }
  );
  const matchesData = await getMatchesListAPI(
    { db: code },
    {
      cache: "force-cache",
    }
  );
  const relatedTopics = await getTopicsListAPI(
    { team: code },
    {
      cache: "force-cache",
    }
  );
  return (
    <>
      <TeamDetailContent
        slugCode={slugCode}
        teamDetail={teamDetail}
        matchesData={matchesData}
        relatedTopics={relatedTopics}
      />
    </>
  );
};

export default TeamDetailPage;
