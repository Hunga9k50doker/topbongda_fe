import React from "react";
import { Metadata } from "next";
import { getAllTagsAPI } from "@/apis/news_apis";
import { BRAND_NAME } from "@/constants";
import { buildFullUrl } from "@/utils";
import AllTags from "@/components/Tag";
import { notFound } from "next/navigation";
interface AllTagPageProps {
  searchParams: {
    page: string;
    q: string;
  };
}

export const metadata: Metadata = {
  title: "Danh Sách Chủ Đề",
  description: `Những chủ đề của tin tức bóng đá, thể thao được cập nhật liên tục tại ${BRAND_NAME}`,
  alternates: {
    canonical: buildFullUrl("/tin-bong-da/tag/"),
  },
};

const AllTagPage = async ({ searchParams }: AllTagPageProps) => {
  const { page, q } = searchParams;

  const tagsData = await getAllTagsAPI({ page, q })
    .then((r) => r.data)
    .catch(() => null);
  if (!tagsData) return notFound();

  return <AllTags tagsData={tagsData} q={q} />;
};

export default AllTagPage;
