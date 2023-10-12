import React from "react";
import { Metadata } from "next";
import { BRAND_NAME } from "@/constants";
import Account from "@/components/Pages/AccountPage";
import { getMyProfileAPI } from "@/apis/user_fetch_apis";
export const dynamic = "force-dynamic";

interface AccountPageProps {}

export async function generateMetadata({}: AccountPageProps): Promise<Metadata> {
  const myProfile: any = await getMyProfileAPI();
  return {
    title: `Tài khoản ${myProfile.username} - ${BRAND_NAME}`,
    description: `Trang thông tin của thành viên ${myProfile.username}. ${
      myProfile.userTitle || ""
    }`,
    alternates: {
      canonical: myProfile.fullUrl,
    },
  };
}

const AccountPage = async () => {
  return <Account />;
};

export default AccountPage;
