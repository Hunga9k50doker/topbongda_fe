import React from "react";
import { BRAND_NAME, SITE_BASE_URL } from "@/constants";
import { getPagesListAPI } from "@/apis/page_fetch_apis";
import Link from "next/link";
import { Metadata } from "next";
import WrapTitle from "@/components/common/WrapTitle";

export const metadata: Metadata = {
  title: `Danh Sách Các Trang  - ${BRAND_NAME}`,
  description: `Danh Sách Các Trang của ${BRAND_NAME}`,
  alternates: {
    canonical: `${SITE_BASE_URL}/trang/`,
  },
};

async function PageList() {
  const pages = await getPagesListAPI();
  return (
    <>
      <h1 className="heading-font text-xl font-bold mb-4">
        <WrapTitle title={"Danh Sách Các Trang"} />
      </h1>
      <div className="px-2 pb-12">
        <ul>
          {pages.map((item: any) => (
            <li key={item.url} className="flex mb-4">
              <h2>
                <Link href={item.url} className="link active:text-primary">
                  {item.title}
                </Link>
              </h2>
            </li>
          ))}

          {pages.length === 0 && (
            <li>
              <em>Chưa có trang nào trong danh sách.</em>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default PageList;
