import React from "react";
import { buildFullUrl } from "@/utils";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import TeamsContent from "@/components/Pages/TeamPage";
import { notFound } from "next/navigation";
import { getTeamsListAPI } from "@/apis/soccer_fetch_apis";

interface TeamPageProps {
  params: {
    userCode: string;
  };
  searchParams: { s: string; q: string; page: number };
}

export const metadata: Metadata = {
  title: `Danh Sách Đội Bóng - ${BRAND_NAME}`,
  description:
    "Trang tổng hợp toàn bộ các đội bóng trên toàn thế giới, chúng tôi phân mục theo thứ bảng chữ cái rất dễ tìm kiếm.",
  alternates: {
    canonical: buildFullUrl("/doi-bong/"),
  },
};

const TeamPage = async ({ searchParams }: TeamPageProps) => {
  const { s, q, page } = searchParams;
  const pageSize = 12;

  let featured = "yes";
  if (q || s) {
    featured = "no";
  }

  const pars = {
    featured,
    q,
    s,
    page_size: pageSize,
    page: page || 1,
  };

  const data = await getTeamsListAPI(pars);

  if (!data) return notFound();
  return <TeamsContent data={data} q={q} s={s} featured={featured} />;
};

export default TeamPage;
