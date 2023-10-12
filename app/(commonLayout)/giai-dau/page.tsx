import React from "react";
import LeaguesPage from "@/components/Pages/LeaguesPage";
import { getCompetitionsListAPI } from "@/apis/soccer_fetch_apis";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { buildFullUrl } from "@/utils";
interface LeaguesProps {
  params: any;
  searchParams: { s: string; q: string; page: number };
}

export const metadata: Metadata = {
  title: `Danh Sách Giải Đấu - ${BRAND_NAME}`,
  description:
    "Đăng ký tài khoản tại Topbongda để cập nhật nhanh nhất những tin tức nóng hổi về bóng đá hôm nay.",
  alternates: {
    canonical: buildFullUrl("/giai-dau/"),
  },
};

const Leagues = async ({ searchParams }: LeaguesProps) => {
  const { s, q, page } = searchParams;
  const pageSize = 20;

  const pars = {
    q,
    s,
    page_size: pageSize,
    page: page || 1,
  };

  const competitionData = await getCompetitionsListAPI(pars);

  return (
    <LeaguesPage competitionData={competitionData} page={page} q={q} s={s} />
  );
};

export default Leagues;
