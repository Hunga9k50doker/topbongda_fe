import { getRelatedStoriesAPI } from "@/apis/news_apis";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import NewDetail from "@/components/Pages/NewsPage/NewDetail";
import { getStoryDetailAPI } from "@/apis/news_fetch_apis";

interface NewDetailPageProps {
  params: {
    storySlugCode: string;
  };
}

export async function generateMetadata({
  params,
}: NewDetailPageProps): Promise<Metadata> {
  const { storySlugCode } = params;
  const story: any = await getStoryDetailAPI(storySlugCode);
  if (!story) return notFound();
  return {
    title: `${story.title} - ${BRAND_NAME}`,
    description: story.pageDesc,
    alternates: {
      canonical: story.fullUrl,
    },
  };
}

async function TopicDetail({ params }: NewDetailPageProps) {
  const { storySlugCode } = params;
  const story = await getStoryDetailAPI(storySlugCode);
  const relatedStories = await getRelatedStoriesAPI({ slugCode: storySlugCode })
    .then((r) => r.data)
    .catch(() => []);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${story.title} - ${BRAND_NAME}`,
    description: story.pageDesc,
    url: story.fullUrl,
  };
  return (
    <>
      <NewDetail
        story={story}
        storySlugCode={storySlugCode}
        relatedStories={relatedStories}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

export default TopicDetail;
