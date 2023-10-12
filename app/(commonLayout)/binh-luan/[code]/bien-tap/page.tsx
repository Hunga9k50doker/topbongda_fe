import Comment from "@/components/Pages/CommentDetailPage/Edit";
import { Metadata } from "next";
import React from "react";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import { getCommentEditAPI } from "@/apis/forum_fetch_apis";
interface EditTopicProps {
  params: {
    codeSlug: string;
  };
}

export async function generateMetadata({
  params,
}: EditTopicProps): Promise<Metadata> {
  const topicDetail: any = await getCommentEditAPI(params);
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
  const commentDetail: any = await getCommentEditAPI(params);

  return <Comment data={commentDetail} type="comment" />;
}

export default EditTopic;
