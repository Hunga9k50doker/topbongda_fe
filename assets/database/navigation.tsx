import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import AlignVerticalBottomOutlinedIcon from "@mui/icons-material/AlignVerticalBottomOutlined";

export const navigations = [
  {
    tilte: "Trang chủ",
    href: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    tilte: "Lịch thi đấu",
    href: "/lich-thi-dau/",
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    tilte: "Tin bóng đá",
    href: "/tin-bong-da/",
    icon: <ArticleOutlinedIcon />,
  },
  {
    tilte: "Giải đấu",
    href: "/giai-dau/",
    icon: <EmojiEventsOutlinedIcon />,
  },
  {
    tilte: "Đội bóng",
    href: "/doi-bong/",
    icon: <Groups2OutlinedIcon />,
  },
  {
    tilte: "Top thành viên",
    href: "/thanh-vien/danh-sach/top",
    icon: <AlignVerticalBottomOutlinedIcon />,
  },
];
