import React from "react";
import { Stack, Grid, Typography } from "@mui/material";
import StatisticItem from "@/components/Pages/MatchDetailPage/StatisticItem";
import { MatchDetailModel } from "@/models/match_model";
import NoData from "@/components/common/NoData";

interface StatisticsProps {
  data: MatchDetailModel;
}
const Statistics = ({ data }: StatisticsProps) => {
  const { homeStatistics, awayStatistics } = data;
  const formatTitle = React.useCallback((title: string) => {
    switch (title) {
      case "Shots on Goal":
        return "Sút vào khung thành";
      case "Shots off Goal":
        return "Sút ra ngoài";
      case "Total Shots":
        return "Tổng số cú sút";
      case "Blocked Shots":
        return "Sút bị chặn";
      case "Shots insidebox":
        return "Sút trong vòng cấm";
      case "Shots outsidebox":
        return "Sút ngoài vòng cấm";
      case "Fouls":
        return "Số lần phạm lỗi";
      case "Corner Kicks":
        return "Số quả phạt góc";
      case "Offsides":
        return "Số lần việt vị";
      case "Ball Possession":
        return "Tỷ lệ kiểm soát bóng";
      case "Yellow Cards":
        return "Thẻ vàng";
      case "Red Cards":
        return "Thẻ đỏ";
      case "Goalkeeper Saves":
        return "Cứu thua";
      case "Total passes":
        return "Tổng số đường chuyền";
      case "Passes accurate":
        return "Đường chuyền chính xác";
      case "Passes %":
        return "Tỷ lệ đường chuyền chính xác";
      case "expected_goals":
        return "XG";
      default:
        return title;
    }
  }, []);

  if (!Boolean(homeStatistics.length) || !Boolean(awayStatistics.length))
    return <NoData />;
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-around"}>
        <Typography
          variant="subtitle1"
          className="text-center max-w-[40%] truncate font-bold"
        >
          {data.homeTeam.name}
        </Typography>
        <Typography
          variant="subtitle1"
          className="text-center max-w-[40%] truncate font-bold"
        >
          {data.awayTeam.name}
        </Typography>
      </Stack>
      <Grid container>
        <Grid item xs={6}>
          {homeStatistics.map((item, index: number) => (
            <Stack key={index} justifyContent={"center"}>
              <Typography
                className="text-center"
                fontSize={"small"}
                sx={{
                  whiteSpace: "nowrap",
                  mt: 1,
                  position: "relative",
                  left: "50%",
                  right: "50%",
                }}
              >
                {formatTitle(item.type)}
              </Typography>
              <StatisticItem value={item.value} rotate="180deg" />
            </Stack>
          ))}
        </Grid>
        <Grid item xs={6}>
          {awayStatistics.map((item: any, index: number) => (
            <Stack key={index} justifyContent={"center"}>
              <Typography
                fontSize={"small"}
                sx={{
                  mt: 1,
                }}
                className="invisible"
              >
                {item.type}
              </Typography>
              <StatisticItem value={item.value} />
            </Stack>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Statistics);
