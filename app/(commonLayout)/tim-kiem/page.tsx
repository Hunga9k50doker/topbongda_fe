import { BRAND_NAME } from "@/constants";
import { buildFullUrl } from "@/utils";
import { searchAPI } from "@/apis/forum_apis";
import { Metadata } from "next";
import SearchPage from "@/components/Pages/SearchPage";
interface SearchProps {
  params: any;
  searchParams: any;
}

const fullUrl = buildFullUrl("/tim-kiem/");
export const metadata: Metadata = {
  title: `Tìm kiếm - ${BRAND_NAME}`,
  description:
    "Nhanh chóng tìm kiếm bài viết, đội bóng, giải đấu theo từ khóa mong muốn.",
  alternates: {
    canonical: fullUrl,
  },
};

async function Search({ params, searchParams }: SearchProps) {
  const q = searchParams?.["q"] ?? "";
  let result = null;
  if (q) {
    result = await searchAPI({ q })
      .then((r) => r.data)
      .catch(() => null);
  }

  return <SearchPage q={q} result={result} />;
}

export default Search;
