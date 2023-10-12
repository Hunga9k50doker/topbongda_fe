import { getTopicsDetailAPI } from "@/apis/forum_fetch_apis";
import ReportPageContent from "@/components/Pages/TopicDetailPage/Report";
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
  const topicDetail: any = await getTopicsDetailAPI(params);
  if (!topicDetail) return notFound();
  return {
    title: `Báo cáo bài viết ${topicDetail.getTitle} - ${BRAND_NAME}`,
    description: topicDetail.pageDesc,
    alternates: {
      canonical: topicDetail.fullUrl,
    },
  };
}

async function ReportPage({ params }: ReportPage) {
  const topicDetail: any = await getTopicsDetailAPI(params);
  return <ReportPageContent data={topicDetail} />;
}

export default ReportPage;
