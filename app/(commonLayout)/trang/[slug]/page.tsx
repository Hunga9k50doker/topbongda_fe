import React from "react";
import { getPageDetailAPI } from "@/apis/page_fetch_apis";
import { BRAND_NAME } from "@/constants";
import { getMediaURL } from "@/utils";
import HTMLReactParser from "html-react-parser";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import WrapTitle from "@/components/common/WrapTitle";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import TimeAgoShort from "@/components/TimeAgoShort";

interface PageDetailProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageDetailProps): Promise<Metadata> {
  const pageDetail: any = await getPageDetailAPI(params);
  let ogImages: any = [];

  if (!pageDetail) return notFound();
  if (pageDetail.seoImageUrl) {
    ogImages = [
      {
        url: getMediaURL(pageDetail.seoImageUrl),
        width: 1200,
        height: 600,
        alt: BRAND_NAME,
      },
    ];
  }

  return {
    title: `${pageDetail.title} - ${BRAND_NAME}`,
    description: pageDetail.seoDesc || "",
    openGraph: {
      images: ogImages,
    },
    alternates: {
      canonical: pageDetail.fullUrl,
    },
  };
}

async function PageDetail({ params }: PageDetailProps) {
  const pageDetail: any = await getPageDetailAPI(params);
  const breadcrumbs = [
    {
      label: "Danh sách",
      href: "/trang",
    },
    {
      label: pageDetail.title,
    },
  ];
  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <h1 className="heading-font text-xl font-bold mb-4">
        {pageDetail.title && <WrapTitle title={pageDetail.title} />}
      </h1>
      <div className="px-4 pb-12">
        {HTMLReactParser(pageDetail.contentSafe || "Đang cập nhật...")}
        {pageDetail.publishedAt && (
          <div className="text-xs text-gray-400 mt-2">
            Ngày công bố:{" "}
            <TimeAgoShort datetimeStr={pageDetail.publishedAt} exact={true} />
          </div>
        )}
      </div>
    </>
  );
}

export default PageDetail;
