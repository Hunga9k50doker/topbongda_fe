import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { DEFAULT_TEAM_ICON, DEFAULT_COMPETITION_ICON } from "@/constants";
import CustomLink from "@/components/common/CustomLink";
import { HeadToHeadModel } from "@/models/match_model";
import { Card, Stack, Tooltip, Typography } from "@mui/material";
import { TbSoccerField } from "react-icons/tb";
import { HiOutlineTrophy } from "react-icons/hi2";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
interface HeadToHeadItemProps {
  data: HeadToHeadModel;
}
const HeadToHeadItem = ({ data }: HeadToHeadItemProps) => {
  const { competition, items } = data;
  const kickOffAt = React.useCallback((time: any) => dayjs(time.kickOffAt), []);
  if (!data) return null;
  return (
    <Card className="mb-4">
      <h3 className="uppercase flex items-end text-sm font-bold text-primary border-0 border-l-4 mt-2 border-solid border-primary/40 pl-2">
        Giải đấu:&nbsp;
        <Image
          src={competition.icon || DEFAULT_COMPETITION_ICON}
          alt=""
          width={24}
          height={24}
        />
        &nbsp;
        {competition.name}
      </h3>
      {items.map((item, key) => (
        <CustomLink
          key={key}
          href={item.url}
          className="flex hover:bg-gray-200/20 active:bg-gray-200/40 px-4 py-3 truncate w-full"
        >
          <div className="flex flex-col w-24 truncate">
            <span className="text-lg font-bold heading-font">
              {kickOffAt(item.kickOffAt).format("HH:mm")}
            </span>
            <small>{kickOffAt(item.kickOffAt).format("DD/MM")}</small>
            <Tooltip title={item.venue.name}>
              <p className="flex items-center gap-1 text-2xs max-w-[80px] truncate">
                <TbSoccerField className="text-gray-400" /> {item.venue.name}
              </p>
            </Tooltip>
          </div>

          <div className="flex-1 flex items-center w-full gap-2 relative">
            <div className="flex flex-col items-center truncate space-x-2 flex-1">
              <Image
                src={item.homeTeam.icon || DEFAULT_TEAM_ICON}
                alt=""
                width={40}
                height={40}
              />
              <div className="heading-font font-bold max-w-[150px] text-center text-sm truncate">
                {item.homeTeam.name}
              </div>
            </div>
            <Stack justifyContent={"center"}>
              <div className="heading-font font-bold text-center text-md truncate text-primary">
                {item.homeGoals} - {item.awayGoals}
              </div>
              <Typography fontSize={"small"} textAlign={"center"}>
                {item.timeElapsed && `${item.timeElapsed}'`}
              </Typography>
            </Stack>
            <div className="flex flex-col items-center truncate space-x-2 flex-1">
              <Image
                src={item.awayTeam.icon || DEFAULT_TEAM_ICON}
                alt=""
                width={40}
                height={40}
              />
              <div className="heading-font font-bold max-w-[150px] text-center text-sm truncate">
                {item.awayTeam.name}
              </div>
            </div>
          </div>
        </CustomLink>
      ))}
    </Card>
  );
};

export default HeadToHeadItem;
