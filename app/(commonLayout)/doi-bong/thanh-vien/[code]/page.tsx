import React from "react";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TeamPlayerDetailContent from "@/components/Pages/TeamDetailPage/TeamPlayerDetail";
import TeamCoachDetailContent from "@/components/Pages/TeamDetailPage/TeamCoachDetail";

import {
  getTeamCoachDetailAPI,
  getTeamPlayerDetailAPI,
} from "@/apis/soccer_fetch_apis";
interface TeamMemberDetailProps {
  params: {
    code: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: TeamMemberDetailProps): Promise<Metadata> {
  let teamMemberDetail = null;
  const isCoach = params.code.includes("coach");
  if (isCoach) {
    teamMemberDetail = await getTeamCoachDetailAPI({
      coachCode: params.code.split("-").pop(),
    });
    teamMemberDetail = teamMemberDetail.data;
  } else {
    teamMemberDetail = await getTeamPlayerDetailAPI({
      playerCode: params.code,
    });
  }
  if (!teamMemberDetail) return notFound();
  return {
    title: `${teamMemberDetail.name} - ${BRAND_NAME}`,
    description: teamMemberDetail.pageDesc,
    alternates: {
      canonical: teamMemberDetail.fullUrl,
    },
  };
}

const TeamMemberDetailPage = async ({ params }: TeamMemberDetailProps) => {
  const isCoach = params.code.includes("coach");
  let teamMemberDetail = null;
  if (isCoach) {
    teamMemberDetail = await getTeamCoachDetailAPI({
      coachCode: params.code.split("-").pop(),
    });
    teamMemberDetail = teamMemberDetail.data;
  } else {
    teamMemberDetail = await getTeamPlayerDetailAPI({
      playerCode: params.code,
    });
  }

  return isCoach ? (
    <TeamCoachDetailContent data={teamMemberDetail} />
  ) : (
    <TeamPlayerDetailContent data={teamMemberDetail} />
  );
};

export default TeamMemberDetailPage;
