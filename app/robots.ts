import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/tai-khoan/",
        "/thong-bao/",
        "dang-bai",
        "/trang/",
        "/lien-ket/",
      ],
    },
    sitemap: "https://topbongda.com/sitemap.xml",
  };
}
