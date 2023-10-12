import React, { useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useMount } from "react-use";
import { Tag } from "antd";
import { MatchDetailModel } from "@/models/match_model";
import RenderStatus from "@/components/common/RenderStatus";
import { styled, useTheme } from "@mui/material/styles";
import {
  MATCH_STATUS_FINISH,
  MATCH_STATUS_UPCOMING,
  MATCH_STATUS_INCOMING,
} from "@/configs/constants";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

interface MatchItemBannerProps {
  matchItem: MatchDetailModel;
  showLeagueName?: boolean;
  viewMore?: boolean;
}
function MatchItemBanner({
  matchItem,
  showLeagueName,
  viewMore,
  ...props
}: MatchItemBannerProps) {
  const theme: any = useTheme();
  const [data, setData] = React.useState<MatchDetailModel>(matchItem);
  const isUpcoming = React.useMemo(
    () => MATCH_STATUS_UPCOMING.includes(matchItem.matchStatus),
    []
  );
  const isIncoming = React.useMemo(
    () => MATCH_STATUS_INCOMING.includes(matchItem.matchStatus),
    []
  );
  const isFinish = React.useMemo(
    () => MATCH_STATUS_FINISH.includes(matchItem.matchStatus),
    []
  );

  React.useEffect(() => {
    setData(matchItem);
  }, [matchItem]);
  if (!matchItem) return null;
  const kickOffAt = dayjs(matchItem.kickOffAt);
  return (
    <StackCustom
      width={"100%"}
      height={"100%"}
      gap={1}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"relative"}
    >
      <CustomLink
        href={`/doi-bong/${matchItem.homeTeam.code}`}
        className="truncate w-full"
      >
        <Stack alignItems={"center"} direction={"row"}>
          <Image
            src={getMediaURL(matchItem.homeTeam.icon) || DEFAULT_TEAM_ICON}
            alt=""
            style={{
              padding: 4,
              background: theme.palette.background.paper,
              borderRadius: "50%",
              zIndex: 5,
            }}
            width={40}
            height={40}
            className="relative"
          />
          <Typography
            className="heading-font font-bold text-md w-fit text-left px-4 truncate relative py-1"
            sx={{
              boxShadow: `0 1px 4px ${theme.palette.background.default}`,
              letterSpacing: 1,
              background: theme.palette.background.paper,
              zIndex: 1,
              borderBottomRightRadius: 34,
              borderTopRightRadius: 34,
              marginLeft: "-8px",
            }}
          >
            {matchItem.homeTeam.name}
          </Typography>
        </Stack>
      </CustomLink>
      <Stack
        component={CustomLink}
        href={matchItem.url}
        flex={1}
        direction={"row"}
        alignItems={"center"}
        justifyContent={isUpcoming ? "center" : "space-between"}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          ".timeElapsed, .score": {
            display: "none",
          },
          ".upcoming": isUpcoming
            ? {
                display: "none",
              }
            : {},
          ".time": isIncoming
            ? {
                display: "none",
              }
            : {},
        }}
      >
        {/* home goal */}
        <Box>
          {(isFinish || isIncoming) && (
            <Typography
              component={"h2"}
              variant="h4"
              color="primary"
              fontWeight={"bold"}
              className="text-center"
              sx={{
                background: theme.palette.background.paper,
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: `0 1px 4px ${theme.palette.background.default}`,
              }}
            >
              {matchItem.homeGoals || 0}
            </Typography>
          )}
        </Box>
        <Stack
          alignItems={"center"}
          justifyContent={"flex-start"}
          minWidth={80}
          maxWidth={160}
        >
          {showLeagueName && matchItem.competition && (
            <Typography
              component={"div"}
              className="uppercase text-xs font-bold tracking-tight truncate flex items-center gap-1"
            >
              {matchItem.competition.icon ? (
                <Avatar
                  src={matchItem.competition.icon}
                  sx={{
                    width: 20,
                    height: 20,
                    marginRight: 1,
                    m: 0,
                    backgroundColor: theme.palette.grey[300],
                  }}
                />
              ) : (
                <EmojiEventsIcon />
              )}{" "}
              {matchItem.competition.name}
            </Typography>
          )}
          <Typography className="highlight-text time text-lg font-bold heading-font">
            {kickOffAt.format("HH:mm")}
          </Typography>
          <Typography className="highlight-text time text-sm" fontWeight={700}>
            {kickOffAt.format("DD/MM")}
          </Typography>
          {viewMore && (
            <CustomLink href={matchItem.url}>
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
            </CustomLink>
          )}
          <RenderStatus status={matchItem.matchStatus} data={data} />
        </Stack>
        {/* aways goal */}
        <Box>
          {(isFinish || isIncoming) && (
            <Typography
              component={"h2"}
              variant="h4"
              color="primary"
              fontWeight={"bold"}
              className="text-center"
              sx={{
                background: theme.palette.background.paper,
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: `0 1px 4px ${theme.palette.background.default}`,
              }}
            >
              {matchItem.awayGoals || 0}
            </Typography>
          )}
        </Box>
      </Stack>
      <CustomLink
        href={`/doi-bong/${matchItem.awayTeam.code}`}
        className="truncate w-full"
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          justifyContent={"flex-end"}
        >
          <Typography
            className="heading-font font-bold text-md w-fit text-right px-4 truncate py-1"
            sx={{
              boxShadow: `0 1px 4px ${theme.palette.background.default}`,
              borderTopLeftRadius: 34,
              borderBottomLeftRadius: 34,
              letterSpacing: 1,
              background: theme.palette.background.paper,
              marginRight: "-8px",
            }}
          >
            {matchItem.awayTeam.name}
          </Typography>
          <Image
            src={getMediaURL(matchItem.awayTeam.icon) || DEFAULT_TEAM_ICON}
            alt=""
            style={{
              padding: 4,
              background: theme.palette.background.paper,
              borderRadius: "50%",
            }}
            width={40}
            height={40}
          />
        </Stack>
      </CustomLink>
    </StackCustom>
  );
}

export default React.memo(MatchItemBanner);

const StackCustom = styled(Stack)(({ theme }: { theme: any }) => ({
  "& .highlight-text": {
    color: theme.palette.custom.lightGreen,
  },
  "& .text-shadow": {
    texShadow: theme.palette.custom.texShadow,
  },
}));
