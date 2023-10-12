"use client";

import React from "react";
import CustomLink from "@/components/common/CustomLink";
import { useSelector } from "react-redux";
import {
  Tabs,
  Tab,
  Stack,
  Typography,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";
import { accountTabs } from "@/assets/database/accountTabs";
import { styled, useTheme } from "@mui/material/styles";
import { RootState } from "@/store";
import PopoverCustom from "@/components/common/PopoverCustom";
import { Progress } from "antd";
import { AiOutlineCopy, AiOutlineProfile } from "react-icons/ai";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import CopyToClipboard from "react-copy-to-clipboard";
import SocialLinks from "@/components/common/SocialLinks";
import ChipLevel from "@/components/Chips/ChipLevel";
import AvatarCustom from "@/components/common/AvatarCustom";
import Image from "next/image";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ACCOUNT_TABS } from "@/configs/constants";

function AccountHeader() {
  const { tab } = useParams();
  const theme: any = useTheme();
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );

  const onCopy = () => {
    toast.success("Đã copy liên kết đến trang riêng của bạn!", {
      autoClose: 1000,
    });
  };
  return (
    <header className="mb-2">
      <Stack
        gap={1}
        justifyContent={"space-between"}
        sx={{
          p: 1,
          minHeight: 200,
          maxHeight: 400,
          position: "relative",
          backfaceVisibility: "hidden",
          backdropFilter: "blur(4px)",
          background: `url(${
            getMediaURL(userStore.coverSet.og) ||
            "/images/user-default-cover.jpg"
          }) center center/cover no-repeat`,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          flex={1}
        >
          <Stack gap={1}>
            <CustomLink href={userStore.url}>
              <Stack>
                <AvatarCustom
                  /* @ts-ignore */
                  data={userStore}
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: theme.palette.background.main,
                  }}
                />
              </Stack>
            </CustomLink>
          </Stack>
          <SocialLinks isHiddenNoSocialLink={true} data={userStore} />
          <Box>
            {userStore.isAuth && (
              <PopoverCustom
                size="large"
                icon={
                  <PendingOutlinedIcon color={theme.palette.text.primary} />
                }
              >
                <CopyToClipboard text={userStore.fullUrl} onCopy={onCopy}>
                  <MenuItem>
                    <AiOutlineCopy />
                    <Typography className="text-sm ml-2">
                      Sao chép liên kết
                    </Typography>
                  </MenuItem>
                </CopyToClipboard>
                <CustomLink href={userStore.url}>
                  <MenuItem>
                    <AiOutlineProfile />
                    <Typography className="text-sm ml-2">
                      Đi đến trang cá nhân
                    </Typography>
                  </MenuItem>
                </CustomLink>
              </PopoverCustom>
            )}
          </Box>
        </Stack>
        <NewStyleProgerss>
          <Progress
            aria-label="level"
            showInfo={false}
            size={"small"}
            strokeLinecap="butt"
            percent={userStore.nextLevel.percent}
            status="active"
            style={{
              position: "absolute",
              bottom: -8,
              left: 0,
              right: 0,
              margin: 0,
              width: "100%",
            }}
            strokeColor={theme.palette.primary.main}
          />
        </NewStyleProgerss>
      </Stack>
      <Stack direction={"row"} alignItems={"flex-start"} gap={1} px={2} mt={1}>
        <Stack gap={1} mb={1}>
          {userStore.isAuth === true ? (
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                component={"h1"}
                className="font-bold text-lg mr-2"
                style={{
                  color: userStore.levelColor,
                }}
              >
                {userStore.name}
              </Typography>
              <ChipLevel data={userStore} />
            </Stack>
          ) : (
            <>
              <h1 className="font-bold text-lg">Trang Tài Khoản Của Bạn</h1>
              <div>
                <span className="badge text-white bg-green-600 border-0 font-bold px-1 text-2xs">
                  Cấp Độ
                </span>
              </div>
            </>
          )}

          {userStore.favoriteTeam && (
            <>
              {userStore.favoriteTeam.url ? (
                <CustomLink
                  href={userStore.favoriteTeam.url}
                  className="fav-team flex"
                >
                  <Image
                    src={
                      getMediaURL(userStore.favoriteTeam.icon) ||
                      DEFAULT_TEAM_ICON
                    }
                    alt=""
                    width={24}
                    height={24}
                  />
                  <h2 className="ml-2 font-bold">
                    {userStore.favoriteTeam.name}
                  </h2>
                </CustomLink>
              ) : (
                <div className="fav-team flex">
                  <Image
                    src={DEFAULT_TEAM_ICON}
                    alt=""
                    width={24}
                    height={24}
                  />
                  <h2 className="ml-2 font-bold">
                    {userStore.favoriteTeam.name}
                  </h2>
                </div>
              )}
            </>
          )}
          <Typography fontSize={"small"}>
            {userStore.userTitle ? userStore.userTitle : "Mô tả: Chưa có mô tả"}
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Tabs
        value={tab || ACCOUNT_TABS.TONG_QUAN}
        sx={{
          justifyContent: "space-between",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          borderColor: theme.palette.custom.gray,
        }}
        scrollButtons="auto"
        variant="scrollable"
      >
        {accountTabs.map((item, key) => (
          <TabLink key={key} value={item.slug} label={item.tilte} />
        ))}
      </Tabs>
    </header>
  );
}

export default AccountHeader;

const TabLink = ({ label, value }: { label: string; value: string }) => {
  return (
    <Tab
      LinkComponent={Link}
      label={label}
      value={value}
      href={`/tai-khoan/${value === ACCOUNT_TABS.TONG_QUAN ? "" : value}`}
    />
  );
};

const NewStyleProgerss = styled("div")`
  .ant-progress-inner {
    background-color: #ccc;
  }
`;
