import React from "react";
import { BRAND_NAME } from "@/constants";
import { buildFullUrl } from "@/utils";
import { Metadata } from "next";
import { getSliderTagsListAPI } from "@/apis/news_apis";
import NewsPage from "@/components/Pages/NewsPage";
import { getStoriesShortListAPI } from "@/apis/news_fetch_apis";

export const metadata: Metadata = {
  title: `Tin Tức Bóng Đá Mới Nhất - ${BRAND_NAME}`,
  description:
    "Cập nhật thông tin mới về các đội bóng như MU, Chelsea, Arsenal, Real Madrid, Barcelona và hơn thế nữa.",
  alternates: {
    canonical: buildFullUrl("/tin-bong-da/"),
  },
};

const News = async () => {
  const listStories = await getStoriesShortListAPI();
  const topFiveStories = await getStoriesShortListAPI({
    topFive: "yes",
  });
  const sliderTags = await getSliderTagsListAPI({ topFive: "yes" })
    .then((r) => r.data)
    .catch(() => []);

  return (
    <NewsPage
      listStories={listStories}
      topFiveStories={topFiveStories}
      sliderTags={sliderTags}
    />
  );
};

export default News;
