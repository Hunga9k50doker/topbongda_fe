"use client";
import React from "react";
import Image from "next/image";
import { getMediaURL } from "@/utils";
import { DEFAULT_AVATAR, DEFAULT_TEAM_ICON } from "@/constants";
import Tooltip from "@mui/material/Tooltip";
import { WolfIcon } from "@/assets/images/icons";
import { toast } from "react-toastify";
import { UserModel } from "@/models/user_model";
import { Stack, Typography, MenuItem, Box, Divider } from "@mui/material";
import CustomLink from "@/components/common/CustomLink";
import CopyToClipboard from "react-copy-to-clipboard";
import { useTheme } from "@mui/material/styles";
import PopoverCustom from "@/components/common/PopoverCustom";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { AiOutlineCopy, AiOutlineFlag } from "react-icons/ai";
import ModalReport from "@/components/Modal/ModalReport";
import ChipLevel from "@/components/Chips/ChipLevel";
import AvatarCustom from "@/components/common/AvatarCustom";
import SocialLinks from "@/components/common/SocialLinks";
import ModalPreview from "@/components/Modal/ModalPreview";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";

interface UserPublicHeaderProps {
  publicProfile: UserModel;
}

function UserPublicHeader({ publicProfile, ...props }: UserPublicHeaderProps) {
  const theme: any = useTheme();
  const { updateModal } = React.useContext(ModalContext);

  const onCopy = () => {
    toast.success(
      `Đã copy liên kết trang thành viên của ${publicProfile.username}!`
    );
  };

  const onReport = () => {
    updateModal(
      `${publicProfile.code}-report`,
      <ModalReport data={publicProfile} type="account" />
    );
  };

  const favTeam = publicProfile.favoriteTeam;

  const handlePreview = (url: string) => {
    updateModal(url, <ModalPreview imageUrl={url} />);
  };
  const breadcrumbs = [
    {
      label: "Danh sách",
      href: "/thanh-vien/danh-sach/",
    },
    {
      label: `Thành viên #${publicProfile.code}`,
    },
  ];
  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Stack
        justifyContent={"space-between"}
        sx={{
          p: 1,
          pt: 2,
          minHeight: 200,
          maxHeight: 400,
          position: "relative",
          backfaceVisibility: "hidden",
          backdropFilter: "blur(4px)",
          background: `url(${
            publicProfile.coverUrl || "/images/user-default-cover.jpg"
          }) center center/cover no-repeat`,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          flex={1}
        >
          <Stack direction={"row"} gap={1}>
            <Stack gap={1}>
              <AvatarCustom
                handleEvent={() =>
                  handlePreview(
                    getMediaURL(
                      publicProfile.avatarUrl || publicProfile?.avatarSet?.og
                    ) || DEFAULT_AVATAR
                  )
                }
                data={publicProfile}
                style={{ width: 60, height: 60 }}
              />
            </Stack>
          </Stack>
          <SocialLinks isHiddenNoSocialLink={true} data={publicProfile} />
          <Box>
            <PopoverCustom
              size="large"
              icon={<PendingOutlinedIcon color={theme.palette.text.primary} />}
            >
              <CopyToClipboard text={publicProfile.fullUrl} onCopy={onCopy}>
                <MenuItem>
                  <AiOutlineCopy />
                  <Typography className="text-sm ml-2">
                    Sao chép liên kết
                  </Typography>
                </MenuItem>
              </CopyToClipboard>
              <MenuItem onClick={onReport}>
                <AiOutlineFlag />
                <Typography className="text-sm ml-2">
                  Báo cáo tài khoản
                </Typography>
              </MenuItem>
            </PopoverCustom>
          </Box>
        </Stack>
      </Stack>
      <Stack width={"100%"} px={2} py={1} gap={1}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            component={"h1"}
            className="font-bold mr-2"
            style={{
              color: publicProfile.levelColor,
            }}
          >
            {publicProfile.name}
          </Typography>
          {publicProfile.isStaff ? (
            <Tooltip title="Quản trị viên">
              <span className="text-blue-500 inline-flex">
                <WolfIcon width={18} height={18} />
              </span>
            </Tooltip>
          ) : (
            publicProfile.levelIndex > 0 && <ChipLevel data={publicProfile} />
          )}
        </Stack>
        {favTeam && (
          <>
            {favTeam.url ? (
              <CustomLink href={favTeam.url} className="fav-team flex">
                <Image
                  src={getMediaURL(favTeam.icon) || DEFAULT_TEAM_ICON}
                  alt=""
                  width={24}
                  height={24}
                />
                <span className="ml-2 font-medium">{favTeam.name}</span>
              </CustomLink>
            ) : (
              <div className="fav-team flex">
                <Image src={DEFAULT_TEAM_ICON} alt="" width={24} height={24} />
                <h2 className="ml-2 font-bold">{favTeam.name}</h2>
              </div>
            )}
          </>
        )}
        <Typography fontSize={"small"}>
          {publicProfile.userTitle
            ? publicProfile.userTitle
            : " Mô tả: Chưa có mô tả"}
        </Typography>
      </Stack>
      <Divider />
    </>
  );
}

export default React.memo(UserPublicHeader);
