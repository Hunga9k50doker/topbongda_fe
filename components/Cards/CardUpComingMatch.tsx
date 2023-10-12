import React, { memo } from "react";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import { MatchDetailModel } from "@/models/match_model";
import dayjs from "dayjs";
import { DEFAULT_TEAM_ICON } from "@/constants";
import { getMediaURL } from "@/utils";
import CustomLink from "@/components/common/CustomLink";

interface CardUpComingMatchProps {
  data: MatchDetailModel;
}

const CardUpComingMatch = ({ data }: CardUpComingMatchProps) => {
  const theme: any = useTheme();
  return (
    <CustomLink href={data.url}>
      <Stack
        sx={{
          background: theme.palette.background.paper,
          my: 1,
          p: 1,
          borderRadius: 1,
          boxShadow: `0 1px 2px ${theme.palette.custom.boxShadow}`,
        }}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack gap={1}>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Image
              loading="lazy"
              src={getMediaURL(data.homeTeam.icon) || DEFAULT_TEAM_ICON}
              alt={data.homeTeam.name}
              width={28}
              height={28}
            />
            <Typography variant="body2">{data.homeTeam.name}</Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Image
              loading="lazy"
              src={getMediaURL(data.awayTeam.icon) || DEFAULT_TEAM_ICON}
              alt={data.awayTeam.name}
              width={28}
              height={28}
            />
            <Typography variant="body2">{data.awayTeam.name}</Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="subtitle1"
              sx={{ fontSize: 16, fontWeight: 700 }}
            >
              {dayjs(data.kickOffAt).format("HH:mm")}
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="body2">
              {dayjs(data.kickOffAt).format("DD/MM/YYYY")}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </CustomLink>
  );
};

export default memo(CardUpComingMatch);
