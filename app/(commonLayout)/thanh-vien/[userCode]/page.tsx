import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import UserPublicPageContent from "@/components/Pages/UserPublicPage";
import { notFound } from "next/navigation";
import { getPublicProfileAPI } from "@/apis/user_fetch_apis";

interface UserPublicPageProps {
  params: {
    userCode: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: UserPublicPageProps): Promise<Metadata> {
  const publicProfile: any = await getPublicProfileAPI(params.userCode);
  if (!publicProfile) return notFound();
  return {
    title: `Tài khoản ${publicProfile.username} - ${BRAND_NAME}`,
    description: `Trang thông tin của thành viên ${publicProfile.username}. ${
      publicProfile.userTitle || ""
    }`,
    alternates: {
      canonical: publicProfile.fullUrl,
    },
  };
}

async function UserPublicPage({ params }: UserPublicPageProps) {
  const newUserCode = params.userCode?.replace("%40", "");
  const publicProfile = await getPublicProfileAPI(params.userCode);

  return (
    <UserPublicPageContent
      publicProfile={publicProfile}
      userCode={newUserCode}
    />
  );
}

export default UserPublicPage;
