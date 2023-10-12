import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { TikTokIcon } from "@/assets/images/icons";
import {
  FACEBOOK_PAGE_LINK,
  TIKTOK_LINK,
  TWITTER_LINK,
  YOUTUBE_LINK,
} from "@/constants";

export const footer = [
  {
    title: "Liên kết nhanh",
    hasIcon: false,
    target: "",
    items: [
      { title: "Danh Sách Giải Đấu", link: "/giai-dau/" },
      { title: "Danh Sách Đội Bóng", link: "/doi-bong/" },
      { title: "Chuyên Mục Diễn Đàn", link: "/" },
    ],
  },
  {
    title: "Trang thông tin",
    hasIcon: false,
    target: "",
    items: [
      { title: "Giới Thiệu", link: "/trang/gioi-thieu/" },
      { title: "Điều Khoản Dịch Vụ", link: "/trang/dieu-khoan-dich-vu/" },
      { title: "Quy Định Riêng Tư", link: "/trang/quy-dinh-rieng-tu/" },
      { title: "Liên Hệ", link: "/trang/lien-he/" },
      { title: "Hướng Dẫn", link: "/trang/huong-dan/" },
    ],
  },
  {
    title: "Mang Xã Hội",
    hasIcon: true,
    target: "_blank",
    items: [
      {
        icon: <FacebookIcon />,
        title: "Facebook",
        link: FACEBOOK_PAGE_LINK,
      },
      {
        icon: <TwitterIcon />,
        title: "Twitter",
        link: TWITTER_LINK,
      },
      {
        icon: <TikTokIcon />,
        title: "TikTok",
        link: TIKTOK_LINK,
      },
      {
        icon: <YouTubeIcon />,
        title: "YouTube",
        link: YOUTUBE_LINK,
      },
    ],
  },
];
