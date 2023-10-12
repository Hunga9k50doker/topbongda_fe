import React from "react";
import { getTeamDetailAPI } from "@/apis/soccer_fetch_apis";
import TeamHeader from "@/components/Soccer/TeamHeader";

interface LeaguesProps {
  params: {
    slugCode: string;
  };
  searchParams: any;
}
const HeaderTeamDetailPage = async ({ params }: LeaguesProps) => {
  const { slugCode } = params;
  const pieces = slugCode?.split(/[\s-]+/);
  const code = pieces[pieces.length - 1];
  const teamDetail = await getTeamDetailAPI({ teamCode: code });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${teamDetail.name}`,
    description: `Thông tin về đội bóng ${teamDetail.name}`,
    url: teamDetail.fullUrl,
  };
  return (
    <>
      <TeamHeader teamDetail={teamDetail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      ></script>
    </>
  );
};

export default HeaderTeamDetailPage;
