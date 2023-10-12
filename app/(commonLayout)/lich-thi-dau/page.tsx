import React from "react";
import { getMatchesListAPI } from "@/apis/soccer_apis";
import Matches from "@/components/Pages/ScheduleMatchPage";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { buildFullUrl } from "@/utils";
import MatchScheduleProvider from "@/context/MatchScheduleContext/MatchScheduleContext";
import { getNewTopicsHeadlinesAPI } from "@/apis/forum_fetch_apis";

interface MatchesProps {
  params: any;
  searchParams: {
    "hom-nay"?: string;
    gl?: string;
    db?: string;
    "giai-dau"?: string;
    dt?: string;
    status?: string;
  };
}

export const metadata: Metadata = {
  title: `Lịch Thi Đấu Bóng Đá - ${BRAND_NAME}`,
  description:
    "Website cập nhật nhanh nhất và chính xác nhất lịch thi đấu Ngoại Hạng Anh, xem bóng đá trực tuyến, lịch thi đấu bóng đá hôm nay, cup C1 và nhiều giải đấu hàng đầu khác.",
  alternates: {
    canonical: buildFullUrl("/lich-thi-dau/"),
  },
};

const MatchesPage = async ({ params, searchParams }: MatchesProps) => {
  const matchesData = await getMatchesListAPI({
    ...searchParams,
    status: searchParams.status || "NS",
  })
    .then((r) => {
      return r.data;
    })
    .catch(() => []);

  const topicHeadlines = await getNewTopicsHeadlinesAPI();

  return (
    <MatchScheduleProvider
      matchesData={matchesData}
      searchParameters={searchParams}
      topicHeadlines={topicHeadlines}
    >
      <Matches />
    </MatchScheduleProvider>
  );
};

export default MatchesPage;
