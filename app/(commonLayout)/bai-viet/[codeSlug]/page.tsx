import TopicDetailPage from "@/components/Pages/TopicDetailPage";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTopicsDetailAPI } from "@/apis/forum_fetch_apis";

interface TopicDetailProps {
  params: {
    codeSlug: string;
  };
}

export async function generateMetadata({
  params,
}: TopicDetailProps): Promise<Metadata> {
  const topicDetail: any = await getTopicsDetailAPI(params, {
    cache: "no-store",
  });
  if (!topicDetail) return notFound();
  return {
    title: `${topicDetail.getTitle} - ${BRAND_NAME}`,
    description: topicDetail.pageDesc,
    alternates: {
      canonical: topicDetail.fullUrl,
    },
  };
}

async function TopicDetail({ params }: TopicDetailProps) {
  const topicDetail: any = await getTopicsDetailAPI(params, {
    cache: "no-store",
  });

  if (!topicDetail) return notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${topicDetail.getTitle} - ${BRAND_NAME}`,
    description: topicDetail.pageDesc,
    url: topicDetail.fullUrl,
  };

  return (
    <main>
      <TopicDetailPage topicDetail={topicDetail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
export default TopicDetail;
