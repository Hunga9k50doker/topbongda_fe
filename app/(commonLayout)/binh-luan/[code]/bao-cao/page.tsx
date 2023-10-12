import { getCommentDetailAPI } from "@/apis/forum_fetch_apis";
import ReportPageContent from "@/components/Pages/CommentDetailPage/Report";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
interface ReportPage {
  params: {
    codeSlug: string;
  };
}

export async function generateMetadata({
  params,
}: ReportPage): Promise<Metadata> {
  const commentDetail: any = await getCommentDetailAPI(params);
  if (!commentDetail) return notFound();
  return {
    title: `Báo cáo bài viết ${commentDetail.getTitle} - ${BRAND_NAME}`,
    description: commentDetail.pageDesc,
    alternates: {
      canonical: commentDetail.fullUrl,
    },
  };
}

async function ReportPage({ params }: ReportPage) {
  const commentDetail: any = await getCommentDetailAPI(params);
  return <ReportPageContent data={commentDetail} />;
}

export default ReportPage;
