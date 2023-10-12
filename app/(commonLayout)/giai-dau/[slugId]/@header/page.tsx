import React from "react";
import { getCompetitionDetailAPI } from "@/apis/soccer_fetch_apis";
import LeagueHeder from "@/components/Pages/LeagueDetailPage/LeagueHeder";
interface LeaguesProps {
  params: {
    slugId: string;
  };
  searchParams: any;
}

const HeaderTeamDetailPage = async ({ params }: LeaguesProps) => {
  const { slugId } = params;
  const competitionDetail = await getCompetitionDetailAPI({ slug: slugId });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${competitionDetail.name} `,
    description: `Cập nhật thông tin nhanh nhất, tin tức, bài viết, kết quả trận đấu, lịch thi đấu của giải ${competitionDetail.name}`,
    url: competitionDetail.fullUrl,
  };
  return (
    <>
      <LeagueHeder competition={competitionDetail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </>
  );
};

export default HeaderTeamDetailPage;
