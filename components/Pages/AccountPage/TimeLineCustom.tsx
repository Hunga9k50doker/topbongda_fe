import * as React from "react";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Image from "next/image";
import { DEFAULT_AVATAR } from "@/constants";
import ListTrophies from "../../common/ListTrophies";
interface TimelineCustomProps {
  data: any;
  maxLevel: number;
}
export default function TimeLineCustom({
  data,
  maxLevel,
}: TimelineCustomProps) {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const { levelColor, levelIndex, name } = data;

  const boxShadow = React.useMemo(() => {
    if (levelIndex > 5 && levelIndex <= 10) {
      return "1px 1px 4px currentColor";
    }
    if (levelIndex > 10 && levelIndex <= 15) {
      return "1px 1px 8px inset";
    }
    if (levelIndex > 15 && levelIndex <= 20) {
      return "1px 1px 8px inset, 1px 1px 4px currentColor";
    }
    return "unset";
  }, [levelIndex]);

  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        align="right"
        variant="body2"
      >
        Cấp độ {levelIndex}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineConnector />
        <TimelineDot>
          <ListTrophies data={data} style={{ width: 28, height: 28 }} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent
        sx={{
          py: "12px",
          px: 2,
        }}
      >
        <Typography
          fontSize={"small"}
          sx={{
            boxShadow: boxShadow,
            padding: "4px 16px",
            borderRadius: 1,
            border: `1px solid ${levelColor}`,
          }}
          color={levelColor}
          component="span"
        >
          {name}
        </Typography>
        {userStore.levelIndex == levelIndex && (
          <div
            className={`flex gap-1 flex-wrap mt-1 ${
              levelIndex % 2 === 0 ? "justify-end" : "justify-start"
            }`}
          >
            <Image
              width={22}
              height={22}
              style={{
                maxHeight: "22px",
                maxWidth: "22px",
              }}
              className="rounded-full"
              src={userStore.avatarSet.og || DEFAULT_AVATAR}
              alt=""
            />
            <Typography
              textAlign={"left"}
              fontSize={"small"}
              color={levelColor}
            >
              {userStore.name}
            </Typography>
          </div>
        )}
      </TimelineContent>
    </TimelineItem>
  );
}
