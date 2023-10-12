import React from "react";
import AccountHeader from "@/components/Pages/AccountPage/AccountHeader";
import { getMyProfileAPI } from "@/apis/user_fetch_apis";
import { redirect } from "next/navigation";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const myProfile: any = await getMyProfileAPI({
    cache: "force-cache",
  });
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

const HeaderAccountPage = async () => {
  const userData = await getMyProfileAPI({
    cache: "force-cache",
  });
  if (!userData?.isAuth) redirect("/dang-nhap");
  return <AccountHeader />;
};

export default HeaderAccountPage;
