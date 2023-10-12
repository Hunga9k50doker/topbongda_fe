import CreateNewTopic from "@/components/Pages/CreatePostPage";
import { Metadata } from "next";
import React from "react";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import { getTopicsDetailAPI } from "@/apis/forum_fetch_apis";
interface EditTopicProps {
  params: {
    codeSlug: string;
  };
}

export async function generateMetadata({
  params,
}: EditTopicProps): Promise<Metadata> {
  const topicDetail: any = await getTopicsDetailAPI(params, {
    // cache: "no-cache",
  });
  if (!topicDetail) return notFound();
  return {
    title: `Chỉnh sửa bài viết ${topicDetail.getTitle} - ${BRAND_NAME}`,
    description: topicDetail.pageDesc,
    alternates: {
      canonical: topicDetail.fullUrl,
    },
  };
}

async function EditTopic({ params }: EditTopicProps) {
  const topicDetail: any = await getTopicsDetailAPI(params, {
    // cache: "no-cache",
  });

  return <CreateNewTopic topicDetail={topicDetail} isEdit={true} />;
}

export default EditTopic;
