"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

export const homeTabs = [
  {
    tilte: "Danh sách bài viết phổ biến",
    label: "Phổ biến",
    href: "/",
    icon: <HomeOutlinedIcon />,
    subtTitle: "",
    linkSubTitle: "#",
    showSubLink: false,
  },
  {
    tilte: "Danh sách bài viết mới đăng",
    label: "Mới đăng",
    href: "/bai-moi/",
    icon: <CalendarMonthOutlinedIcon />,
    subtTitle: "",
    linkSubTitle: "#",
    showSubLink: false,
  },
  {
    tilte: "Trận đấu sắp diễn ra",
    label: "Trận đấu sắp diễn ra",
    href: "/lich-thi-dau/",
    icon: <ArticleOutlinedIcon />,
    subtTitle: "Xem tất cả",
    linkSubTitle: "/lich-thi-dau/",
    showSubLink: false,
  },
  {
    tilte: "Chuyên mục",
    label: "Chuyên mục",
    href: "/chuyen-muc/",
    icon: <EmojiEventsOutlinedIcon />,
    subtTitle: "Xem tất cả",
    linkSubTitle: "/chuyen-muc/",
    showSubLink: false,
  },
  {
    tilte: "Các đội bóng nổi tiếng",
    label: "Các đội bóng nổi tiếng",
    href: "/doi-bong/",
    icon: <EmojiEventsOutlinedIcon />,
    subtTitle: "Xem tất cả",
    linkSubTitle: "/doi-bong/",
    showSubLink: false,
  },
  {
    tilte: "Top thành viên tuần này",
    label: "Top thành viên tuần này",
    href: "/thanh-vien/danh-sach/top",
    icon: <EmojiEventsOutlinedIcon />,
    subtTitle: "Danh sách",
    linkSubTitle: "/thanh-vien/danh-sach/top",
    showSubLink: false,
  },
];
