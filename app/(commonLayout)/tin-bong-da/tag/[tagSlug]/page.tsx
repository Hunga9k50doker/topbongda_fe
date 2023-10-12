import React from "react";
import { Metadata } from "next";
import TagDetail from "@/components/Tag/TagDetail";
import { notFound } from "next/navigation";
import { getStoriesListAPI, getTagDetailAPI } from "@/apis/news_fetch_apis";
interface AllTagPageDetailProps {
  params: {
    tagSlug: string;
  };
  searchParams: any;
}

export async function generateMetadata({
  params,
}: AllTagPageDetailProps): Promise<Metadata> {
  const tagDetail = await getTagDetailAPI({ slug: params.tagSlug });
  if (!tagDetail) return notFound();
  return {
    title: `Chủ đề ${tagDetail.name}`,
    description: `Những tin tức bóng đá, thể thao thuộc chủ đề ${tagDetail.name}. 
  Đăng ký thành viên để tham gia thảo luận và chia sẻ kiến thức.`,
    alternates: {
      canonical: tagDetail.fullUrl,
    },
  };
}

const AllTagPageDetailPage = async ({ params }: AllTagPageDetailProps) => {
  const { tagSlug } = params;

  const tagDetail = await getTagDetailAPI({ slug: tagSlug });

  const tagStoriesData = await getStoriesListAPI({ tagSlug: tagSlug });

  return (
    <TagDetail
      tagDetail={tagDetail}
      tagStoriesData={tagStoriesData}
      tagSlug={tagSlug}
    />
  );
};

export default AllTagPageDetailPage;
