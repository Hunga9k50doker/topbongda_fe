import CommentDetailPage from "@/components/Pages/CommentDetailPage";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommentDetailAPI } from "@/apis/forum_fetch_apis";
import { ItemCommentModel } from "@/models/comment_model";
import { buildFullUrl } from "@/utils";

interface CommentDetailProps {
  params: {
    code: string;
  };
}

export async function generateMetadata({
  params,
}: CommentDetailProps): Promise<Metadata> {
  const commentDetail: ItemCommentModel = await getCommentDetailAPI(params);

  if (!commentDetail) return notFound();
  return {
    title: `Bình luận ${commentDetail.code} - ${BRAND_NAME}`,
    description: commentDetail.contentMd,
    alternates: {
      canonical: buildFullUrl(`/binh-luan/${commentDetail.code}`),
    },
  };
}

async function CommentDetail({ params }: CommentDetailProps) {
  const commentDetail: any = await getCommentDetailAPI(params);

  if (!commentDetail) return notFound();
  return (
    <main>
      <CommentDetailPage commentDetail={commentDetail} />
    </main>
  );
}
export default CommentDetail;
