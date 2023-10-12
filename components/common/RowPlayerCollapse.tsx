import React from "react";
import CustomLink from "@/components/common/CustomLink";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Image from "next/image";
import { TeamMemberModel } from "@/models/team_model";
import { Stack, Typography } from "@mui/material";
import { renderPosition } from "@/utils";
import { Top } from "@/models/competition_model";
interface RowPlayerCollapseProps {
  data: TeamMemberModel;
  dataTopPlayer?: Top;
}

const RowPlayerCollapse = ({ data, dataTopPlayer }: RowPlayerCollapseProps) => {
  const [open, setOpen] = React.useState(false);
  const isCoach = data.position === "coach";
  return (
    <React.Fragment>
      <TableRow>
        <TableCell
          component="th"
          scope="row"
          style={{ padding: "8px 0 8px 16px" }}
        >
          <CustomLink
            href={`/doi-bong/thanh-vien/${isCoach ? "coach-" : ""}${data.code}`}
            className="flex items-center gap-1"
          >
            <Avatar
              src={data.avatar}
              alt=""
              sx={{ width: 40, height: 40 }}
              imgProps={{
                loading: "lazy",
                width: 40,
                height: 40,
              }}
              className="hover:scale-105 active:scale-95 duration-100"
            />
            <Stack gap={0.5}>
              <Typography className="heading-font text-md font-bold">
                {data.name}
              </Typography>
              <Typography className="truncate w-32 text-xs text-gray-400">
                {renderPosition(data.position)}
              </Typography>
            </Stack>
          </CustomLink>
        </TableCell>
        <TableCell align="right">
          {!isCoach && (
            <>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </>
          )}
        </TableCell>
      </TableRow>
      {!isCoach && (
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table
                  size="small"
                  aria-label="purchases"
                  sx={{
                    "& tr:last-child td": {
                      borderBottom: "unset",
                    },
                  }}
                >
                  <TableBody>
                    {dataTopPlayer && (
                      <React.Fragment>
                        <TableRow>
                          <TableCell className="text-gray-400 p-0">
                            Bàn thắng
                          </TableCell>
                          <TableCell align="right">
                            {dataTopPlayer.statistics.goals || 0}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="text-gray-400 p-0">
                            Kiến tạo
                          </TableCell>
                          <TableCell align="right">
                            {dataTopPlayer.statistics.assists || 0}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    )}
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Trạng thái
                      </TableCell>
                      <TableCell align="right">
                        {data.injured
                          ? "Đang chấn thương"
                          : "Không chấn thương"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Nơi sinh
                      </TableCell>
                      <TableCell align="right">
                        {data.birthPlace}
                        {data.birthCountry ? `(${data.birthCountry})` : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Quốc tịch
                      </TableCell>
                      <TableCell align="right">
                        {data.nationality ? (
                          <Image
                            className="float-right"
                            src={data.nationality}
                            alt=""
                            width={20}
                            height={20}
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Ngày sinh
                      </TableCell>
                      <TableCell align="right">
                        {data.dateOfBirth || "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Chiều cao
                      </TableCell>
                      <TableCell align="right">{data.height || "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-gray-400 p-0">
                        Cân nặng
                      </TableCell>
                      <TableCell align="right">{data.weight || "-"}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default React.memo(RowPlayerCollapse);
