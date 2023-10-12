import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import UserPublicPageContent from "@/components/Pages/UserPublicPage";
import { notFound } from "next/navigation";
import { getTopicsListAPI } from "@/apis/forum_fetch_apis";
import { getPublicProfileAPI } from "@/apis/user_fetch_apis";
import { USER_TABS } from "@/configs/constants";

interface UserPublicPageProps {
  params: {
    userCode: string;
    tab: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: UserPublicPageProps): Promise<Metadata> {
  const publicProfile: any = await getPublicProfileAPI(params.userCode);
  if (!publicProfile) return notFound();

  switch (params.tab) {
    case USER_TABS.BAI_VIET:
      return {
        title: `Bài viết của ${publicProfile.username} - ${BRAND_NAME}`,
        description: `Trang thông tin bài viết của thành viên ${
          publicProfile.username
        }. ${publicProfile.userTitle || ""}`,
        alternates: {
          canonical: publicProfile.fullUrl,
        },
      };
    case USER_TABS.BAO_CAO:
      return {
        title: `Báo cáo tài khoản ${publicProfile.username} - ${BRAND_NAME}`,
        description: `Báo cáo thành viên vi phạm ${publicProfile.username}. ${
          publicProfile.userTitle || ""
        }`,
        alternates: {
          canonical: publicProfile.fullUrl,
        },
      };
    default:
      return notFound();
  }
}

async function UserPublicPage({ params }: UserPublicPageProps) {
  const userCode = params.userCode?.replace("%40", "");
  const ITEMS_PER_PAGE = 10;
  let topicsData, publicProfile;
  publicProfile = await getPublicProfileAPI(params.userCode);
  switch (params.tab) {
    case USER_TABS.BAI_VIET:
      topicsData = await getTopicsListAPI({
        userCode,
        page_size: ITEMS_PER_PAGE,
      });
      break;
    case USER_TABS.BAO_CAO:
      break;
    default:
      return notFound();
  }
  return (
    <UserPublicPageContent
      publicProfile={publicProfile}
      topicsData={topicsData}
      userCode={userCode}
    />
  );
}

export default UserPublicPage;
