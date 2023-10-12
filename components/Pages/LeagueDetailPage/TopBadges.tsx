"use client";
import React from "react";
import Box from "@mui/material/Box";
import { TopBadgesDataModel } from "@/models/competition_model";
import WrapTitle from "@/components/common/WrapTitle";
import NoData from "@/components/common/NoData";
import RowPlayerCollapse from "@/components/common/RowPlayerCollapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
interface TopBadgesProps {
  topBadges: TopBadgesDataModel;
}

function TopBadges({ topBadges, ...props }: TopBadgesProps) {
  return (
    <>
      {!Boolean(topBadges.topGoal.length) &&
        !Boolean(topBadges.topRedCard.length) &&
        !Boolean(topBadges.topAssist.length) &&
        !Boolean(topBadges.topYellowCard.length) && <NoData />}
      <Box>
        {Boolean(topBadges.topGoal.length) && (
          <>
            <WrapTitle title="Top ghi bàn" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách</TableCell>
                    <TableCell align="right">Thông tin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topBadges.topGoal.map((item, idx: number) => (
                    <RowPlayerCollapse
                      key={idx}
                      data={item.player}
                      dataTopPlayer={item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {Boolean(topBadges.topAssist.length) && (
          <>
            <WrapTitle title="Top kiến tạo" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách</TableCell>
                    <TableCell align="right">Thông tin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topBadges.topAssist.map((item, idx: number) => (
                    <RowPlayerCollapse
                      key={idx}
                      data={item.player}
                      dataTopPlayer={item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {Boolean(topBadges.topYellowCard.length) && (
          <>
            <WrapTitle title="Top thẻ vàng" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách</TableCell>
                    <TableCell align="right">Thông tin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topBadges.topYellowCard.map((item, idx: number) => (
                    <RowPlayerCollapse
                      key={idx}
                      data={item.player}
                      dataTopPlayer={item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {Boolean(topBadges.topRedCard.length) && (
          <>
            <WrapTitle title="Top thẻ đỏ" />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell>Danh sách</TableCell>
                    <TableCell align="right">Thông tin</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topBadges.topRedCard.map((item, idx: number) => (
                    <RowPlayerCollapse
                      key={idx}
                      data={item.player}
                      dataTopPlayer={item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}
export default React.memo(TopBadges);
