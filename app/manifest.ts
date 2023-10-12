import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "topbongda",
    short_name: "topbongda",
    description:
      "Mạng xã hội bóng đá, nơi cập nhật thông tin lịch thi đấu, kết quả, dự đoán các trận đấu, giải đấu trên toàn thế giới",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "/favicon/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
