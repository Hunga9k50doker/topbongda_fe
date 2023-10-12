"use client";
import React from "react";
import { Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { TopicDetailModel } from "@/models/topic_model";
import { useParams } from "next/navigation";
import CardPost from "@/components/Cards/CardPost";
import HitViewCount from "@/components/Pages/HomePage/HitViewCount";
const FloatButtonCustom = dynamic(
  () => import("@/components/common/FloatButtonCustom"),
  {
    ssr: false,
  }
);
const WrapComments = dynamic(() => import("@/components/common/WrapComments"), {
  ssr: false,
});

interface TopicDetailPageProps {
  topicDetail: TopicDetailModel;
}

function TopicDetailPage({ topicDetail }: TopicDetailPageProps) {
  const slug = useParams();

  return (
    <>
      <Stack mt={0.5}>
        <FloatButtonCustom data={topicDetail} />
        <CardPost data={topicDetail} isViewDetail={true} />
        <WrapComments
          type="topic"
          code={topicDetail.code}
          codeSlug={slug}
          data={topicDetail}
        />
      </Stack>
      <HitViewCount topicCode={topicDetail.code} />
    </>
  );
}

export default TopicDetailPage;
