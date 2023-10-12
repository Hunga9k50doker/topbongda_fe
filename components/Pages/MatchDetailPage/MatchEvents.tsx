import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import RepeatIcon from "@mui/icons-material/Repeat";
import Typography from "@mui/material/Typography";
import { MatchDetailModel, MatchEvent } from "@/models/match_model";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EventIcon from "@mui/icons-material/Event";
import { Box, Stack } from "@mui/material";
import NoData from "@/components/common/NoData";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
interface MatchEventsProps {
  data: MatchDetailModel;
}

const MatchEvents = ({ data }: MatchEventsProps) => {
  const { matchEvent } = data;

  if (!Boolean(matchEvent.length)) {
    return <NoData />;
  }
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-around"} gap={1}>
        <Typography
          variant="subtitle1"
          className="text-center flex-1 truncate font-bold"
        >
          {data.homeTeam.name}
        </Typography>
        <AccessTimeOutlinedIcon />
        <Typography
          variant="subtitle1"
          className="text-center flex-1 truncate font-bold"
        >
          {data.awayTeam.name}
        </Typography>
      </Stack>
      <Timeline>
        {matchEvent.reverse().map((item, key) => (
          <TimelineItem key={key}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="left"
              variant="body2"
              color="text.secondary"
            >
              {item.eventTeam === "Home" && (
                <Stack
                  alignItems={"center"}
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-end"}
                >
                  <Stack>
                    {item.assist && (
                      <Typography
                        fontSize={"small"}
                        variant="subtitle1"
                        component="span"
                        color="GrayText"
                      >
                        {item.eventType === "Goal" ? "Kiến tạo: " : ""}
                        {item.assist?.name}
                      </Typography>
                    )}
                    <Typography
                      fontSize={"small"}
                      variant="subtitle1"
                      component="span"
                    >
                      {item.eventType === "Goal" ? "Ghi bàn: " : ""}
                      {item.player?.name}
                    </Typography>
                  </Stack>
                  {renderIcon(item)}
                </Stack>
              )}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot
                color="primary"
                variant="outlined"
                sx={{
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                }}
              >
                <Typography fontSize={"small"}>{item.timeElapsed}</Typography>
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent
              sx={{ m: "auto 0" }}
              align="left"
              variant="body2"
              color="text.secondary"
            >
              {item.eventTeam !== "Home" && (
                <Stack
                  alignItems={"center"}
                  gap={1}
                  direction={"row"}
                  justifyContent={"flex-start"}
                >
                  {renderIcon(item)}
                  <Stack>
                    {item.assist && (
                      <Typography
                        fontSize={"small"}
                        variant="subtitle1"
                        component="span"
                        color="GrayText"
                      >
                        {item.eventType === "Goal" ? "Kiến tạo: " : ""}
                        {item.assist.name}
                      </Typography>
                    )}
                    <Typography
                      fontSize={"small"}
                      variant="subtitle1"
                      component="span"
                    >
                      {item.player?.name}
                    </Typography>
                  </Stack>
                </Stack>
              )}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </>
  );
};

export default React.memo(MatchEvents);

const renderIcon = (item: MatchEvent) => {
  const color: any = item.detail === "Yellow Card" ? "#e0e009ed" : "red";
  switch (item.eventType) {
    case "Goal":
      return <SportsSoccerIcon fontSize="small" color="primary" />;
    case "Card":
      return (
        <Box
          sx={{
            ml: 1,
            width: "12px",
            height: "16px",
            backgroundColor: color,
          }}
        />
      );
    case "subst":
      return <GradientRepeatIcon />;
    default:
      return <EventIcon fontSize="small" color="info" />;
  }
};

const GradientRepeatIcon = () => (
  <>
    <svg width={0} height={0}>
      <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
        <stop offset={0} stopColor="red" />
        <stop offset={0.8} stopColor="green" />
      </linearGradient>
    </svg>
    <RepeatIcon fontSize="small" sx={{ fill: "url(#linearColors)" }} />
  </>
);
