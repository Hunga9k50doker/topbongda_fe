import React from "react";
import { numberWithCommas } from "@/utils";
import { BRAND_NAME } from "@/constants";
import { useSelector } from "react-redux";
import Timeline from "@mui/lab/Timeline";
import { timelineItemClasses } from "@mui/lab/TimelineItem";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { getListLevelAPI } from "@/apis/user_apis";
import { RootState } from "@/store";
import useSWR from "swr";
import { USER_API_GET_LEVEL_LIST } from "@/configs/endpoints/user_endpoints";
import TimeLineCustom from "@/components/Pages/AccountPage/TimeLineCustom";
import WrapTitle from "@/components/common/WrapTitle";
import ChipLevel from "@/components/Chips/ChipLevel";
import LinearProgressWithLabel from "@/components/common/LinearProgressWithLabel";
function Levels() {
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const [items, setItems] = React.useState<any[]>([]);

  const { data: dataLevel } = useSWR(
    USER_API_GET_LEVEL_LIST,
    () =>
      getListLevelAPI()
        .then((r) => r.data.data)
        .catch(() => {}),
    {
      revalidateOnFocus: false,
    }
  );

  React.useEffect(() => {
    if (dataLevel) setItems(dataLevel);
  }, [dataLevel]);
  return (
    <Box>
      <WrapTitle title="Tổng quan" />
      <Box sx={{ mx: 1 }}>
        <Typography>
          Tại {BRAND_NAME}, tài khoản của bạn có thể lên cấp thông qua việc tham
          gia viết bài, bình luận và nhiều hoạt động khác nữa.
        </Typography>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          className="space-x-1 mt-1"
        >
          {userStore.levelIndex > 0 && <ChipLevel data={userStore} />}
          <Typography className="text-xs text-gray-400">
            Cấp độ tiếp theo là {userStore.nextLevel.name}{" "}
            {userStore.nextLevel.requiredBreak && (
              <span>(yêu cầu phải độ kiếp)</span>
            )}
          </Typography>
        </Stack>
        {userStore.nextLevel && (
          <>
            <Box className="mt-2">
              <LinearProgressWithLabel value={userStore.nextLevel.percent} />
            </Box>
            <div className="font-bold text-sm">
              {numberWithCommas(userStore.exp)}/
              {numberWithCommas(userStore.nextLevel.requiredExp)} XP
            </div>
          </>
        )}
      </Box>
      <Divider />
      <WrapTitle title="Cấp độ" />

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
        className="mt-4"
        position="alternate"
      >
        {items.map((item, index) => (
          <TimeLineCustom
            maxLevel={items[items.length - 1]?.levelIndex}
            data={item}
            key={index}
          />
        ))}
      </Timeline>
    </Box>
  );
}

export default Levels;
