import React from "react";
import { Metadata } from "next";
import { BRAND_NAME } from "@/constants";
import AuthForm from "@/components/Pages/AccountPage/AuthForm";
import { buildFullUrl } from "@/utils";
import { getMyProfileAPI } from "@/apis/user_fetch_apis";
import { redirect } from "next/navigation";

const fullUrl = buildFullUrl("/tai-khoan/");
export const metadata: Metadata = {
  title: `Đăng Nhập/Đăng Ký - ${BRAND_NAME}`,
  description: "Nơi đăng ký tài khoản dễ dàng thảo luận và kết nối.",
  alternates: {
    canonical: fullUrl,
  },
};

const AuthPage = async () => {
  const userData = await getMyProfileAPI();
  if (userData?.isAuth) redirect("/tai-khoan");
  return <AuthForm isRedirect={true} userData={userData} />;
};

export default AuthPage;
