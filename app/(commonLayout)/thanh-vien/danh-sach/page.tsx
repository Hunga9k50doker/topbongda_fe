import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { buildFullUrl } from "@/utils";
import ListUser from "@/components/Pages/UserPublicPage/ListUser";
import { getMembersListAPI } from "@/apis/user_fetch_apis";
interface MembersListPageProps {
  params: {};
  searchParams: {
    q: string;
    page: string;
    sort: string;
  };
}

export const metadata: Metadata = {
  title: `Danh Sách Thành Viên - ${BRAND_NAME}`,
  description: `Danh sách thành viên của ${BRAND_NAME}`,
  alternates: {
    canonical: buildFullUrl("/thanh-vien/danh-sach/"),
  },
};

async function MembersListPage({ searchParams }: MembersListPageProps) {
  const { page, q, sort } = searchParams;
  const sortQuery = sort || "DJ";
  const ITEMS_PER_PAGE = 20;
  const p = {
    page_size: ITEMS_PER_PAGE,
    page,
    sort: sortQuery,
    q,
  };

  const membersData = await getMembersListAPI(p);

  return (
    <ListUser
      membersData={membersData}
      sortQuery={sortQuery}
      searchQuery={q || ""}
    />
  );
}

export default MembersListPage;
