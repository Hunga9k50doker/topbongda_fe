import { buildFullUrl } from "@/utils";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { getTopUserByEXPAPI } from "@/apis/user_fetch_apis";
import ListUser from "@/components/Pages/UserPublicPage/ListUser";
export const metadata: Metadata = {
  title: `Top Thành Viênn - ${BRAND_NAME}`,
  description:
    "Danh sách những thành viên tích cực và nhận được nhiều EXP nhất trong tuần. Đăng ký tài khoản để tham gia thảo luận tại ${BRAND_NAME}.",
  alternates: {
    canonical: buildFullUrl("/thanh-vien/danh-sach/top/"),
  },
};

interface TopMembersPageProps {
  params: {};
  searchParams: {
    q: string;
    page: string;
    sort: string;
    time: string;
  };
}

async function TopMembersPage({ searchParams }: TopMembersPageProps) {
  const topMembers = await getTopUserByEXPAPI({
    num: 50,
    time: searchParams.time || "week",
  });

  return <ListUser topMembers={topMembers} />;
}

export default TopMembersPage;
