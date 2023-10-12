import React, { memo } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { navigations } from "@/assets/database/navigation";
import { sidebarList } from "@/assets/database/sidebar";
import ParagraphBold from "@/components/common/Text/ParagraphBold";
import ParagraphBody from "@/components/common/Text/ParagraphBody";
import { useTheme } from "@mui/material/styles";
import LinearProgress from "@/components/common/LinearProgress";
import { AppStoreIcon, GooglePlayIcon } from "@/assets/images/icons";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useSelectedLayoutSegment } from "next/navigation";
import { TbHomeSearch } from "react-icons/tb";
import CustomLink from "@/components/common/CustomLink";
import { GiSoccerKick } from "react-icons/gi";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IoCreateOutline } from "react-icons/io5";
import { RootState, store } from "@/store";
import { ThemeContext } from "@/context/ThemeContext";
import { useSelector } from "react-redux";
import ChipLevel from "@/components/Chips/ChipLevel";
import AvatarCustom from "@/components/common/AvatarCustom";
import { Typography } from "@mui/material";
import { useLocalStorage } from "react-use";
import { useRouter } from "next/navigation";
import { registerFirebaseNotification } from "@/firebase";
import Link from "next/link";

interface SideBarProps {
  isOnpen: boolean;
  toggleDrawer: () => void;
}
const label = { inputProps: { "aria-label": "Switch" } };
const SideBar = ({ isOnpen, toggleDrawer }: SideBarProps) => {
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const { toggleTheme, mode } = React.useContext(ThemeContext);
  const router = useRouter();
  const theme: any = useTheme();
  const isDarkMode = mode === "dark" ? true : false;
  const segment = useSelectedLayoutSegment() || "";
  const [, setStoVal] = useLocalStorage<any>("url-search", "");
  const [stovalNoti, setStoValNoti] = useLocalStorage<any>("isNoti", "");

  const checkIsActiveLink = (href: string) => {
    if (href === "/" && segment === "(homeLayout)") return true;
    if (href.replaceAll("/", "") == segment) return true;
    return false;
  };

  const onRedirectLogin = () => {
    setStoVal(window.location.href);
    router.push("/dang-nhap");
  };

  React.useEffect(() => {
    if (userStore.isAuth && !stovalNoti) {
      registerFirebaseNotification();
    }
  }, [userStore.isAuth, setStoValNoti]);

  return (
    <Drawer open={isOnpen} onClose={toggleDrawer}>
      <Stack
        justifyContent={"space-between"}
        sx={{
          width: 250,
          height: "100%",
        }}
        role="presentation"
        onClick={toggleDrawer}
      >
        <Box>
          {userStore.isAuth ? (
            <Stack
              sx={{
                px: 2,
                py: 1,
              }}
              gap={1}
            >
              <Stack
                direction={"row"}
                gap={1}
                component={Link}
                href="/tai-khoan"
              >
                <Stack
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ position: "relative" }}
                >
                  {/* @ts-ignore */}
                  <AvatarCustom data={userStore} />
                </Stack>
                <Stack flex={1}>
                  <ParagraphBold>{userStore.name}</ParagraphBold>
                  <ChipLevel data={userStore} />
                  <Stack direction={"row"} gap={0.5}>
                    <Typography fontSize={"small"}>
                      Lv.
                      {userStore.nextLevel.index}
                    </Typography>
                    <LinearProgress value={userStore.nextLevel.percent} />
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction={"row"} gap={1} justifyContent={"space-between"}>
                <Link href="/tai-khoan">
                  <Button variant="outlined" color="primary" size="small">
                    <TbHomeSearch fontSize={20} />
                  </Button>
                </Link>
                <Link href="/dang-bai">
                  <Button variant="outlined" color="primary" size="small">
                    <IoCreateOutline fontSize={20} />
                  </Button>
                </Link>
                <CustomLink href="/thong-bao">
                  <Button variant="outlined" color="primary" size="small">
                    <Badge
                      badgeContent={userStore.numUnreadNotifications}
                      color="primary"
                    >
                      <NotificationsNoneIcon fontSize="small" />
                    </Badge>
                  </Button>
                </CustomLink>
              </Stack>
            </Stack>
          ) : (
            <Stack
              sx={{
                px: 2,
                py: 1,
              }}
            >
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Avatar>A</Avatar>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={1}
                  color={theme.palette.primary.main}
                >
                  <ParagraphBold
                    className="cursor-pointer"
                    onClick={onRedirectLogin}
                  >
                    Gia Nhập Ngay
                  </ParagraphBold>
                  <GiSoccerKick />
                </Stack>
              </Stack>
            </Stack>
          )}

          <Divider />
          <List>
            {navigations.map((item, index) => (
              <CustomLink key={index} href={item.href} prefetch={true}>
                <ListItemButton
                  sx={
                    checkIsActiveLink(item.href)
                      ? {
                          borderRight: `4px solid ${theme.palette.primary.main}`,
                          color: theme.palette.primary.main,
                        }
                      : {}
                  }
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: checkIsActiveLink(item.href) ? "inherit" : "auto",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.tilte}
                    sx={{
                      "& .MuiListItemText-primary": {
                        color: "inherit",
                      },
                    }}
                  />
                </ListItemButton>
              </CustomLink>
            ))}
          </List>
          <Divider />
          <List>
            {sidebarList.map((item, index) => (
              <CustomLink key={index} href={item.href} prefetch={true}>
                <ListItemButton>
                  <ListItemIcon className="text-gray-400" sx={{ minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText secondary={item.title} />
                </ListItemButton>
              </CustomLink>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton
              sx={{ p: 0, m: "auto", borderRadius: 1, width: "fit-content" }}
            >
              <AppStoreIcon />
            </ListItemButton>
            <ListItemButton
              sx={{
                p: 0,
                m: "auto",
                mt: 1,
                borderRadius: 1,
                width: "fit-content",
              }}
            >
              <GooglePlayIcon />
            </ListItemButton>
          </List>
        </Box>
        <Box>
          <Divider />
          <List>
            <ListItem
              disablePadding
              sx={{ justifyContent: "space-between", px: 1 }}
            >
              <ParagraphBody variant="body2">V.1.0</ParagraphBody>
              <Stack
                direction={"row"}
                sx={{ justifyContent: "flex-end", alignItems: "center" }}
              >
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <LightModeOutlinedIcon />
                </ListItemIcon>
                <Switch
                  checked={isDarkMode}
                  {...label}
                  onChange={toggleTheme}
                  onClick={(e) => e.stopPropagation()}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <ListItemIcon sx={{ minWidth: "unset" }}>
                  <DarkModeOutlinedIcon />
                </ListItemIcon>
              </Stack>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Drawer>
  );
};

export default memo(SideBar);
