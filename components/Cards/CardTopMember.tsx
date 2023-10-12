"use client";
import React from "react";
import { Avatar, Badge, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { UserModel } from "@/models/user_model";
import { DEFAULT_AVATAR } from "@/constants";
import { getMediaURL, numberFormatter } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import ChipLevel from "@/components/Chips/ChipLevel";
import RenderLevel from "@/components/common/RenderLevel";
import { DEFAULT_TEAM_ICON } from "@/constants";
interface CardTopMemberProps {
  data: UserModel;
  index: number;
}

const CardTopMember = ({ data, index }: CardTopMemberProps) => {
  const theme: any = useTheme();
  return (
    <Stack
      sx={{
        background: theme.palette.background.paper,
        my: 1,
        p: 1,
        borderRadius: 1,
        boxShadow: `0 1px 2px ${theme.palette.custom.boxShadow}`,
      }}
      component={CustomLink}
      href={data.url}
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack gap={1} direction={"row"} alignItems={"center"}>
        <RenderLevel level={index + 1} />
        <Badge
          sx={{
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            overflow: "visible",
          }}
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            data?.favoriteTeam?.name ? (
              <Avatar
                sx={{
                  width: 22,
                  height: 22,
                  border: `2px solid ${theme.palette.background.paper}`,
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
          <Avatar
            sx={{
              border: `2px solid ${
                data.levelColor || theme.palette.background.paper
              }}`,
              width: 40,
              height: 40,
            }}
            imgProps={{
              loading: "lazy",
            }}
            src={getMediaURL(data.avatarUrl) || DEFAULT_AVATAR}
            alt={data.username}
          />
        </Badge>
        <Stack>
          <Typography variant="body1" className="font-bold">
            {data.name}
          </Typography>
          <ChipLevel data={data} />
        </Stack>
      </Stack>
      {data.earnedExp !== 0 && (
        <Typography variant="body2" color={"primary.main"} fontWeight={600}>
          {data.earnedExp > 0 ? "+" : ""}
          {Math.abs(data.earnedExp) > 10000
            ? numberFormatter(data.earnedExp)
            : data.earnedExp}{" "}
          XP
        </Typography>
      )}
    </Stack>
  );
};

export default React.memo(CardTopMember);

// const renderLevel = (level: number) => {
//   switch (level) {
//     case 1:
//       return <Image width={24} height={24} src={Gold} alt={`${level}`} />;
//     case 2:
//       return <Image width={24} height={24} src={Silver} alt={`${level}`} />;
//     case 3:
//       return <Image width={24} height={24} src={Bronze} alt={`${level}`} />;
//     default:
//       return (
//         <Typography
//           sx={{ width: 24, height: 24, textAlign: "center" }}
//           variant="h6"
//         >
//           {level}
//         </Typography>
//       );
//   }
// };
