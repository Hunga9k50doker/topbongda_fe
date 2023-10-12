import React from "react";
import Account from "@/components/Pages/AccountPage";
import { getMyProfileAPI } from "@/apis/user_fetch_apis";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

const AccountPage = async () => {
  const userData = await getMyProfileAPI({
    cache: "force-cache",
  });
  if (!userData?.isAuth) redirect("/dang-nhap");
  return <Account />;
};

export default AccountPage;
