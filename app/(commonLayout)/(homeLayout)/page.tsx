import HomePage from "@/components/Pages/HomePage";
import { BRAND_NAME, SITE_BASE_URL } from "@/constants";
import { getTopTopicsListAPI } from "@/apis/forum_fetch_apis";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getMatchHeadlinesAPI } from "@/apis/soccer_fetch_apis";
import { headers } from "next/headers";
interface HomeProps {}

export const metadata: Metadata = {
  title: `Diễn Đàn Bóng Đá - ${BRAND_NAME}`,
  description:
    "Nơi hội tụ những fan hâm mộ của môn thể thao vua. Đăng ký tài khoản dễ dàng thảo luận và kết nối.",
  alternates: {
    canonical: SITE_BASE_URL,
  },
};

export default async function Home({ ...props }: HomeProps) {
  const topTopicsData = await getTopTopicsListAPI({}, { cache: "no-cache" });
  if (!topTopicsData) redirect(`/error`);
  const matchHeadLines = await getMatchHeadlinesAPI(
    {},
    {
      next: {
        revalidate: 600000, // revalidate data each 10 minutes
      },
    }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `Diễn Đàn Bóng Đá - ${BRAND_NAME}`,
    description:
      "Nơi hội tụ những fan hâm mộ của môn thể thao vua. Đăng ký tài khoản dễ dàng thảo luận và kết nối.",
    url: SITE_BASE_URL,
  };

  return (
    <>
      <HomePage topTopicsData={topTopicsData} matchHeadLines={matchHeadLines} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
