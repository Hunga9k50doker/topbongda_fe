import React from "react";
import { BRAND_NAME } from "@/constants";
import { Metadata } from "next";
import { buildFullUrl } from "@/utils";
import CreatePostPage from "@/components/Pages/CreatePostPage";
interface LeaguesProps {
  params: any;
  searchParams: any;
}

export const metadata: Metadata = {
  title: `Đăng Bài Mới - ${BRAND_NAME}`,
  description: "Tạo bài viết mới về bóng đá, thể thao, giải trí, ...",
  alternates: {
    canonical: buildFullUrl("/dang-bai/"),
  },
};

const CreateNewPostPage = async ({ searchParams }: LeaguesProps) => {
  return <CreatePostPage />;
};

export default CreateNewPostPage;
