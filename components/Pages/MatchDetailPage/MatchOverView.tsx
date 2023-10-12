import React from "react";
import { formatDate, capitalizeFirstLetter } from "@/utils";
import CustomLink from "@/components/common/CustomLink";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Stack, Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import { MatchDetailModel } from "@/models/match_model";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import AcUnitIcon from "@mui/icons-material/AcUnit";

interface MatchOverViewProps {
  matchDetail: MatchDetailModel;
}
function MatchOverView({ matchDetail, ...props }: MatchOverViewProps) {
  const competition = matchDetail.competition;
  const { venue, weather } = matchDetail;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead></TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="text-gray-400">Sân vận động</TableCell>
            <TableCell align="right">{venue ? venue.name : ""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-400">Trọng tài</TableCell>
            <TableCell align="right">{matchDetail.referee || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-400">Giải đấu</TableCell>
            <TableCell align="right">
              <CustomLink
                href={competition.url}
                className="link-hover underline"
              >
                {competition.name}
              </CustomLink>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-400">Vòng đấu</TableCell>
            <TableCell align="right">{matchDetail.round || "-"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-gray-400">Giờ thi đấu</TableCell>
            <TableCell align="right">
              <time dateTime={matchDetail.kickOffAt}>
                {formatDate(matchDetail.kickOffAt)}
              </time>
            </TableCell>
          </TableRow>
          {weather && (
            <>
              <TableRow>
                <TableCell className="text-gray-400">Nhiệt độ</TableCell>
                <TableCell align="right">
                  {(weather.main.temp - 273.15).toFixed(1)}℃
                  <DeviceThermostatIcon
                    className="text-gray-400"
                    sx={{ ml: 1 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-400">Độ ẩm</TableCell>
                <TableCell align="right">
                  {weather.main.humidity}%
                  <AcUnitIcon className="text-gray-400" sx={{ ml: 1 }} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-gray-400">Thời tiết</TableCell>
                <TableCell align="right">
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                  >
                    {capitalizeFirstLetter(weather.status[0].description)}
                    <Tooltip title={weather.status[0].main}>
                      <Avatar
                        src={`https://openweathermap.org/img/wn/${weather.status[0].icon}@2x.png`}
                        alt=""
                        imgProps={{ width: 24, height: 24 }}
                      />
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(MatchOverView);
