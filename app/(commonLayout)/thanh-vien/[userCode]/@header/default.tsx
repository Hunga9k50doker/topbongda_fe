import React from "react";
import { getPublicProfileAPI } from "@/apis/user_fetch_apis";
import UserPublicHeader from "@/components/Pages/AccountPage/UserPublicHeader";
interface LeaguesProps {
  params: {
    userCode: string;
  };
  searchParams: any;
}

const HeaderUserPage = async ({ params }: LeaguesProps) => {
  const publicProfile = await getPublicProfileAPI(params.userCode, {
    cache: "force-cache",
  });
  return <UserPublicHeader publicProfile={publicProfile} />;
};

export default HeaderUserPage;
