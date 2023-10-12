import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useRouter } from "next/navigation";
import ModalSearch from "@/components/Modal/ModalSearch";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";

const actions = [
  {
    title: "Đăng bài",
    href: "/dang-bai/",
    icon: <CreateOutlinedIcon />,
  },
  {
    title: "Thông báo",
    href: "/thong-bao/",
    icon: <NotificationsNoneIcon />,
  },
  {
    title: "Tìm kiếm",
    href: "/tim-kiem/",
    icon: <SearchIcon />,
  },
  {
    title: "Trang chủ",
    href: "/",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Lịch đấu",
    href: "/lich-thi-dau/",
    icon: <CalendarMonthOutlinedIcon />,
  },
  {
    title: "Tin bóng đá",
    href: "/tin-bong-da/",
    icon: <ArticleOutlinedIcon />,
  },
  {
    title: "Giải đấu",
    href: "/giai-dau/",
    icon: <EmojiEventsOutlinedIcon />,
  },
  {
    title: "Đội bóng",
    href: "/doi-bong/",
    icon: <Groups2OutlinedIcon />,
  },
];

export default function SpeedDialTooltipOpen() {
  const { updateModal } = React.useContext(ModalContext);
  const idReact = React.useId();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (item: any) => {
    if (item.href === "/tim-kiem/")
      return updateModal(idReact, <ModalSearch />);
    router.prefetch(item.href);
    return router.push(item.href);
  };

  const isShowBox = React.useMemo(() => {
    return open;
  }, [open]);
  return (
    <Box
      sx={
        isShowBox
          ? {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 100,
            }
          : {}
      }
    >
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="Đường dẫn nhanh"
        sx={{
          position: "fixed",
          bottom: 64,
          right: 8,
          zIndex: 100,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.title}
            sx={{ whiteSpace: "nowrap" }}
            icon={action.icon}
            tooltipTitle={action.title}
            tooltipOpen
            onClick={() => handleChange(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
