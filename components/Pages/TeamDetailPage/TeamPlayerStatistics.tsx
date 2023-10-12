import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Statistics } from "@/models/team_model";
import { Avatar, Box, Stack } from "@mui/material";
import ParagraphBold from "@/components/common/Text/ParagraphBold";
import TextSubtitle from "@/components/common/Text/TextSubtitle";

interface TeamPlayerStatisticsProps {
  statistics: Statistics;
}

export default React.memo(function TeamPlayerStatistics({
  statistics,
}: TeamPlayerStatisticsProps) {
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    setData(Object.entries(statistics));
  }, [statistics]);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Thông tin</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">
              Chỉ số
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: any, key: number) => (
            <TableRow
              key={key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className="text-gray-400" component="th" scope="row">
                {renderTitle(item[0])}
              </TableCell>
              <TableCell align="right">
                {renderContent(item[0], statistics)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

const renderTitle = (title: string) => {
  switch (title) {
    case "team":
      return "Đội bóng";
    case "cards":
      return "Thẻ phạt";
    case "duels":
      return "Tranh chấp";
    case "fouls":
      return "Phạm lỗi";
    case "games":
      return "Ra sân";
    case "goals":
      return "Ghi bàn";
    case "shots":
      return "Đường chuyền ngắn";
    case "league":
      return "Giải đấu";
    case "passes":
      return "Qua người";
    case "penalty":
      return "Penalty";
    case "tackles":
      return "Chặn bóng";
    case "dribbles":
      return "Rê bóng";
    case "substitutes":
      return "Thay người";
  }
};

const renderContent = (title: string, data: Statistics) => {
  switch (title) {
    case "team":
      return (
        <Stack
          gap={1}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Avatar
            src={data.team.logo}
            sx={{
              backgroundColor: "#fff",
              width: 22,
              height: 22,
            }}
            alt={data.team.name}
          />
          <ParagraphBold>{data.team.name}</ParagraphBold>
        </Stack>
      );
    case "cards":
      return (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={2}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={0.5}
          >
            <Box sx={{ width: 12, height: 16, background: "yellow" }}></Box>
            <ParagraphBold>{data.cards.yellow}</ParagraphBold>{" "}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            gap={0.5}
          >
            <Box sx={{ width: 12, height: 16, background: "red" }}></Box>
            <ParagraphBold>{data.cards.red}</ParagraphBold>
          </Stack>
        </Stack>
      );
    case "duels":
      return (
        <>
          <ParagraphBold>
            {data.duels.won}/{data.duels.total}(
            {Math.round((data.duels.won / data.duels.total) * 100).toFixed(2)}
            %)
          </ParagraphBold>
          <TextSubtitle>Thành công / Tổng số</TextSubtitle>
        </>
      );
    case "fouls":
      return (
        <ParagraphBold>{data.fouls.drawn + data.fouls.committed}</ParagraphBold>
      );
    case "games":
      return (
        <Stack>
          <ParagraphBold>
            {data.games.appearences} - {data.games.lineups} -
            {data.games.minutes}
          </ParagraphBold>
          <TextSubtitle>
            Số lần - Chính thức - Thời gian trên sân(phút)
          </TextSubtitle>
        </Stack>
      );
    case "goals":
      return (
        <Stack>
          <ParagraphBold>
            {data.goals.total} - {data.goals.assists}
          </ParagraphBold>
          <TextSubtitle>Bàn thắng - Kiến tạo</TextSubtitle>
        </Stack>
      );
    case "shots":
      return <ParagraphBold>{data.shots.total}</ParagraphBold>;
    case "league":
      return (
        <Stack
          gap={1}
          direction={"row"}
          justifyContent={"flex-end"}
          alignItems={"center"}
        >
          <Avatar
            src={data.league.logo}
            sx={{
              backgroundColor: "#fff",
              width: 22,
              height: 22,
            }}
            alt={data.league.name}
          />
          <ParagraphBold>{data.league.name}</ParagraphBold>
        </Stack>
      );
    case "passes":
      return <ParagraphBold>{data.passes.total}</ParagraphBold>;
    case "penalty":
      return <ParagraphBold>{data.penalty.scored}</ParagraphBold>;
    case "tackles":
      return <ParagraphBold>{data.tackles.total}</ParagraphBold>;
    case "dribbles":
      return (
        <ParagraphBold>
          {data.dribbles.success}/{data.dribbles.attempts} (
          {Math.round(
            (data.dribbles.success / data.dribbles.attempts) * 100
          ).toFixed(2)}
          %)
        </ParagraphBold>
      );

    case "substitutes":
      return (
        <Stack>
          <ParagraphBold>
            {data.substitutes.in} - {data.substitutes.out} -
            {data.substitutes.bench}
          </ParagraphBold>
          <TextSubtitle>Vào sân - Ra sân - Dự bị</TextSubtitle>
        </Stack>
      );
  }
};
