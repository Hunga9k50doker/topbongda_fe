"use client";
import React, { useState, memo, useContext } from "react";
import Stack from "@mui/material/Stack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { LogoIcon } from "@/assets/images/icons";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import dynamic from "next/dynamic";
import ModalSearch from "@/components/Modal/ModalSearch";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { IconButton } from "@mui/material";
import { RootState } from "@/store";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import Link from "next/link";

const SideBar = dynamic(() => import("@/components/common/SideBar"), {
  ssr: false,
});

const Header = () => {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const theme: any = useTheme();
  const { updateModal } = useContext(ModalContext);
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const toggleDrawer = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          background: theme.palette.primary.main,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 44,
        }}
        px={2}
      >
        <Stack
          color={theme.palette.primary.light}
          direction={"row"}
          alignItems={"center"}
          gap={1}
        >
          <IconButton
            onClick={toggleDrawer}
            sx={{ color: theme.palette.primary.light }}
            aria-label="navigation"
          >
            <Badge
              badgeContent={userStore.numUnreadNotifications}
              color="error"
              variant="dot"
            >
              <MenuIcon />
            </Badge>
          </IconButton>

          <Link href={"/"}>
            <LogoIcon width={100} />
          </Link>
        </Stack>
        {/* <Button
        size="small"
        variant="outlined"
        color="success"
        // sx={{ color: theme.palette.custom.gradientButton }}
        startIcon={<MdOutlineGetApp />}
      >
        <ParagraphBold>Tải app</ParagraphBold>
      </Button> */}
        <IconButton
          sx={{ color: theme.palette.primary.light }}
          onClick={() => updateModal("modal-seach", <ModalSearch />)}
          aria-label="search"
        >
          <SearchOutlinedIcon />
        </IconButton>
        <SideBar isOnpen={isOpenSideBar} toggleDrawer={toggleDrawer} />
      </Stack>
    </>
  );
};

export default memo(Header);
