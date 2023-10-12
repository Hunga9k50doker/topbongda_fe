import React from "react";
import CustomLink from "@/components/common/CustomLink";
import { formatDate, getFromNowSmart } from "@/utils";
import Tooltip from "@mui/material/Tooltip";
import { WolfIcon } from "@/assets/images/icons";
import { UserModel } from "@/models/user_model";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChipLevel from "@/components/Chips/ChipLevel";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import AvatarCustom from "@/components/common/AvatarCustom";
interface RowCollapseProps {
  data: UserModel;
  isShowFavTeam?: boolean;
}

const RowCollapse = ({ data, isShowFavTeam = false }: RowCollapseProps) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow>
        <TableCell
          style={{ padding: "8px 0 8px 16px" }}
          component="th"
          scope="row"
        >
          <CustomLink href={data.url} className="flex items-center gap-1">
            <AvatarCustom data={data} style={{ width: 40, height: 40 }} />
            <Stack>
              <>
                <Stack direction={"row"} alignItems={"center"} gap={1}>
                  <Typography className="heading-font text-md font-bold">
                    {data.name}
                  </Typography>
                  <ChipLevel data={data} />
                  {data.isStaff && (
                    <Tooltip title="Quản trị viên">
                      <span className="text-blue-500 inline-flex">
                        <WolfIcon width={14} height={14} />
                      </span>
                    </Tooltip>
                  )}
                </Stack>
                {isShowFavTeam && data.favoriteTeam && (
                  <div className="flex gap-1 items-center">
                    <p className="truncate w-32">
                      Fan {data.favoriteTeam.name}
                    </p>
                  </div>
                )}
              </>
            </Stack>
          </CustomLink>
        </TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
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
                  <TableRow>
                    <TableCell className="text-gray-400 p-0">
                      Mã người dùng
                    </TableCell>
                    <TableCell align="right">
                      <Link className="link" href={data.url}>
                        @{data.code}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-gray-400 p-0">
                      Ngày gia nhập
                    </TableCell>
                    <TableCell align="right">
                      {formatDate(data.dateJoined, true)} (
                      {getFromNowSmart(data.dateJoined, true)})
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default React.memo(RowCollapse);
