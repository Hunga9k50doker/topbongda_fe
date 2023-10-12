"use client";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  Divider,
  Grid,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMount } from "react-use";
import { Tag } from "antd";
import { MatchDetailModel } from "@/models/match_model";
import { SyncOutlined } from "@ant-design/icons";
import RenderStatus from "@/components/common/RenderStatus";
import { TbSoccerField } from "react-icons/tb";

interface MatchItemProps {
  matchItem: MatchDetailModel;
  showLeagueName?: boolean;
  viewMore?: boolean;
  viewFollow?: boolean;
  viewScore?: boolean;
  viewStadium?: boolean;
  viewStatus?: boolean;
  style?: any;
  onCancelFollowMatch?: (item: any) => void;
}

function MatchItem({
  matchItem,
  showLeagueName,
  viewMore,
  viewStadium,
  viewFollow,
  viewScore,
  viewStatus,
  style,
  onCancelFollowMatch,
  ...props
}: MatchItemProps) {
  const theme: any = useTheme();
  const isDownSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [isMount, setisMount] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useMount(() => setisMount(true));

  if (!matchItem) return null;
  const kickOffAt = dayjs(matchItem.kickOffAt);

  const onCancel = (e: any, item: MatchDetailModel) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLoading(true);

    Promise.resolve(onCancelFollowMatch && onCancelFollowMatch(item))
      .then(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      )
      .catch(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  };

  return (
    <Box
      sx={
        viewFollow
          ? {
              ...style,
              background: theme.palette.background.paper,
              borderRadius: 1,
              my: 1,
              boxShadow: `0 1px 2px ${theme.palette.custom.boxShadow}`,
            }
          : {}
      }
    >
      <CustomLink
        href={matchItem.url}
        className="flex flex-col hover:bg-gray-200/20 active:bg-gray-200/40 px-2 py-3 truncate w-full"
      >
        <Grid container height={"100%"} flexWrap={"nowrap"} gap={1}>
          <Stack
            className={`${isDownSmScreen ? "w-20" : "w-[120px]"} truncate`}
          >
            {isMount ? (
              <>
                <span className="text-lg font-bold heading-font">
                  {kickOffAt.format("HH:mm")}
                </span>
                <small>{kickOffAt.format("DD/MM")}</small>
              </>
            ) : (
              <>
                <Skeleton width={80} height={28} />
                <Skeleton width={80} height={20} />
              </>
            )}

            {viewFollow && (
              <Tag
                icon={isLoading ? <SyncOutlined spin /> : ""}
                onClick={(e) => onCancel(e, matchItem)}
                style={{
                  margin: 0,
                  padding: "0 2px",
                  width: "fit-content",
                  fontSize: 10,
                  fontWeight: 700,
                  lineHeight: "16px",
                  display: "flex",
                  alignItems: "center",
                }}
                color="error"
              >
                Bỏ theo dõi
              </Tag>
            )}
          </Stack>
          <Stack
            alignItems={"center"}
            className={`truncate flex-1 ${
              isDownSmScreen ? "max-w-[80px]" : ""
            }`}
          >
            <Image
              src={getMediaURL(matchItem.homeTeam.icon) || DEFAULT_TEAM_ICON}
              alt=""
              width={28}
              height={28}
            />
            <Typography className="heading-font font-bold text-sm w-full text-center truncate">
              {matchItem.homeTeam.name}
            </Typography>
          </Stack>
          <Stack
            alignItems={"center"}
            justifyContent={"flex-start"}
            className="truncate"
            height={"100%"}
            minWidth={80}
            sx={{
              ".text-countdown": {
                fontSize: 14,
                ".short": {
                  display: "inline",
                },
                ".long, .timeElapsed": {
                  display: "none",
                },
              },
            }}
          >
            {viewMore && (
              <Tag
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 10,
                  lineHeight: "16px",
                  cursor: "pointer",
                }}
                color="lime"
              >
                Xem chi tiết
              </Tag>
            )}
            <Stack
              justifyContent={"center"}
              sx={style}
              className="max-w-[100px] truncate"
            >
              {viewStatus && (
                <RenderStatus status={matchItem.matchStatus} data={matchItem} />
              )}
            </Stack>
          </Stack>
          <Stack
            alignItems={"center"}
            className={`truncate flex-1 ${
              isDownSmScreen ? "max-w-[80px]" : ""
            }`}
          >
            <Image
              src={getMediaURL(matchItem.awayTeam.icon) || DEFAULT_TEAM_ICON}
              alt=""
              width={28}
              height={28}
            />
            <Typography className="heading-font font-bold text-sm w-full text-center truncate">
              {matchItem.awayTeam.name}
            </Typography>
          </Stack>
        </Grid>
        {showLeagueName && matchItem.competitionName && (
          <Typography fontSize={12} className="truncate">
            {matchItem.competitionName}
          </Typography>
        )}
      </CustomLink>
      <Stack direction={"row"} justifyContent={"space-between"}>
        {viewStadium && matchItem.venue && (
          <Box className="flex-1">
            <Divider className="border-gray-200/10" />
            <div className="flex items-center gap-1 px-4 py-2">
              <TbSoccerField className="text-gray-400" />
              <span className="uppercase text-2xs truncate">
                {matchItem.venue.name}
              </span>
            </div>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default MatchItem;
