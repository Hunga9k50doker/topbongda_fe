import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { UserModel } from "@/models/user_model";
import { DEFAULT_AVATAR, DEFAULT_TEAM_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import RenderLevel from "@/components/common/RenderLevel";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Image from "next/image";

interface AvatarCustomProps {
  data: UserModel;
  style?: any;
  handleEvent?: () => void;
}
const AvatarCustom = ({ data, style, handleEvent }: AvatarCustomProps) => {
  const { topUser } = useSelector((state: RootState) => state.userStore);
  const indexUser = topUser
    .slice(0, 3)
    .findIndex((item: any) => item.username === data.username);
  return (
    <Badge
      component={Box}
      onClick={() => handleEvent && handleEvent()}
      sx={{
        borderRadius: "50%",
        border: `2px solid ${data.levelColor || "#fff"}`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        indexUser !== -1 ? (
          <RenderLevel level={indexUser + 1} />
        ) : data?.favoriteTeam?.name ? (
          <Avatar
            sx={{
              width: 22,
              height: 22,
              border: (theme) => `2px solid ${theme.palette.background.paper}`,
            }}
            className="bg-gray-300"
            imgProps={{
              loading: "lazy",
            }}
            src={getMediaURL(data?.favoriteTeam?.icon) || DEFAULT_TEAM_ICON}
            alt={data?.favoriteTeam?.name || ""}
          />
        ) : (
          <></>
        )
      }
    >
      <Image
        style={{
          ...style,
          position: "relative",
          borderRadius: "50%",
        }}
        width={40}
        height={40}
        alt={data.name}
        src={
          getMediaURL(data.avatarUrl || data?.avatarSet?.og) || DEFAULT_AVATAR
        }
      />
    </Badge>
  );
};

export default AvatarCustom;
