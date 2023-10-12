import React from "react";
import { Metadata } from "next";
import { BRAND_NAME } from "@/constants";
import { notFound } from "next/navigation";
import {
  getCategoryDetailAPI,
  getMostLikesTopicsAPI,
  getTopicsListAPI,
} from "@/apis/forum_fetch_apis";
import CategoryDetailContent from "@/components/Pages/CategoriesPage/CategoryDetail";

interface CardCategoryProps {
  params: {
    pk: string;
  };
  searchParams: {
    isNew: string;
  };
}

export async function generateMetadata({
  params,
}: CardCategoryProps): Promise<Metadata> {
  const category: any = await getCategoryDetailAPI(params);
  if (!category) return notFound();
  return {
    title: `${category.name} - ${BRAND_NAME}`,
    description: category.pageDesc,
    alternates: {
      canonical: category.fullUrl,
    },
  };
}

const CategoryDetail = async ({ params, searchParams }: CardCategoryProps) => {
  const { pk } = params;
  const { isNew } = searchParams;
  const p2 = {
    cat: pk,
    last_updated: isNew ? "yes" : "no",
  };
  const p1 = {
    cat_pk: pk,
    frame: "W",
  };

  const category = await getCategoryDetailAPI(params);
  const topicsListData = await getTopicsListAPI(p2);
  const mostLikesTopics = await getMostLikesTopicsAPI(p1);

  return (
    <CategoryDetailContent
      pk={pk}
      isNew={isNew}
      category={category}
      topicsListData={topicsListData}
      mostLikesTopics={mostLikesTopics}
    />
  );
};

export default CategoryDetail;
