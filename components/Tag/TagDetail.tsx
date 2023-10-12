"use client";
import React from "react";
import { getStoriesListAPI } from "@/apis/news_apis";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import WrapTitle from "@/components/common/WrapTitle";
import CardStory from "@/components/Cards/CardStory";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";

interface TagDetailProps {
  tagSlug: string;
  tagDetail: any;
  tagStoriesData: any;
}

function TagDetail({
  tagSlug,
  tagDetail,
  tagStoriesData,
  ...props
}: TagDetailProps) {
  const [items, setItems] = React.useState(tagStoriesData?.items || []);
  const [pageData, setPageData] = React.useState(tagStoriesData);
  const breadcrumbs = [
    {
      label: "Tin bóng đá",
      href: "/tin-bong-da/",
    },
    {
      label: "Chủ đề",
      href: `/tin-bong-da/tag`,
    },
    {
      label: tagSlug,
    },
  ];

  const handleLoadMore = React.useCallback(() => {
    getStoriesListAPI({ tagSlug, page: pageData.current + 1 })
      .then((r) => {
        setItems([...items, ...r.data.items]);
        setPageData(r.data);
      })
      .catch((e) => {});
  }, [pageData.current]);

  return (
    <div className="pb-12">
      <BreadCrumbCustom data={breadcrumbs} />
      <h1>
        <WrapTitle title={`Tin Bóng Đá Chủ đề ${tagDetail.name}`} />
      </h1>
      {items.map((item: any) => (
        <CardStory key={item.code} item={item} showTag={true} />
      ))}

      {pageData.current < pageData.numPages ? (
        <LoadMoreButton loadMore={handleLoadMore} title="Tải thêm bài viết" />
      ) : (
        <p className="text-center italic text-xs">~ hết danh sách ~</p>
      )}
    </div>
  );
}

export default TagDetail;
