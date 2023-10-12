import TabPage from "@/components/Pages/HomePage";
import { BRAND_NAME } from "@/constants";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
import { Metadata } from "next";
import { HOME_TABS } from "@/configs/constants";
import { buildFullUrl } from "@/utils";
import { notFound } from "next/navigation";
import { getMatchHeadlinesAPI } from "@/apis/soccer_fetch_apis";

interface TabProps {
  params: {
    tab: string;
  };
}

export async function generateMetadata({
  params,
}: TabProps): Promise<Metadata> {
  switch (params.tab) {
    case HOME_TABS.BAI_MOI:
      return {
        title: `Diễn đàn bài viết mới nhất liên quan đến bóng đá - ${BRAND_NAME}`,
        description:
          "Nơi giao lưu, trao đổi niềm yêu thích đam mê, bình luận, trò chuyện về các trận đấu bóng đá, thông tin bóng đá",
        alternates: {
          canonical: buildFullUrl(HOME_TABS.BAI_MOI),
        },
      };
    default:
      return notFound();
  }
}

export default async function Tab({ params, ...props }: TabProps) {
  const { tab } = params;
  let newTopicsData = [];
  switch (tab) {
    case HOME_TABS.BAI_MOI:
      newTopicsData = await getTopicsListAPI({}, { cache: "no-cache" });
      break;
    default:
      return notFound();
  }

  if (Object.values(HOME_TABS).findIndex((href) => href === tab) === -1)
    return notFound();
  const matchHeadLines = await getMatchHeadlinesAPI(
    {},
    {
      next: {
        revalidate: 600000, // revalidate data each 10 minutes
      },
    }
  );
  return (
    <TabPage newTopicsData={newTopicsData} matchHeadLines={matchHeadLines} />
  );
}
