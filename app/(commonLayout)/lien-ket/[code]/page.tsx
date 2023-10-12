import { getOutLinkAPI } from "@/apis/forum_apis";
import { BRAND_NAME, SITE_BASE_URL } from "@/constants";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import OutLinkDetail from "@/components/Pages/OutLinkPage";
interface OutLinkPageProps {
  params: {
    code: string;
  };
}

export const metadata: Metadata = {
  title: BRAND_NAME,

  alternates: {
    canonical: SITE_BASE_URL,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

async function OutLinkPage({ params, ...props }: OutLinkPageProps) {
  const outlink = await getOutLinkAPI({ code: params.code })
    .then((r) => r.data)
    .catch(() => null);
  if (!outlink) return notFound();
  return <OutLinkDetail code={params.code} outlink={outlink} />;
}

export default OutLinkPage;
