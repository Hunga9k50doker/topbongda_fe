import React from "react";
import { Box, Stack, Typography, Avatar } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { DEFAULT_TEAM_ICON } from "@/constants";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import groupBy from "lodash/groupBy";
import sortBy from "lodash/sortBy";
import NoData from "@/components/common/NoData";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

interface LeagueStandingProps {
  standingData: any;
}

function LeagueStanding({ standingData, ...props }: LeagueStandingProps) {
  const newStandingData = React.useMemo(() => {
    if (standingData?.length > 0) {
      return Object.entries(
        groupBy(sortBy(standingData, "groupName"), "groupName")
      );
    } else if (standingData?.length === 0) {
      return standingData;
    } else if (standingData.competition) {
      return [standingData];
    } else {
      return [];
    }
  }, [standingData]);
  return (
    <Box>
      {newStandingData.length > 1 &&
        newStandingData.map((item: any, key: any) => (
          <React.Fragment key={key}>
            <h3 className="uppercase text-sm font-bold text-primary border-0 border-l-4 border-solid border-primary/40 pl-2">
              {item[0]}
            </h3>
            <DataGrid
              rows={item[1]}
              columns={columns}
              getRowId={(row) => row.rank}
              slots={{
                footer: () => <></>,
              }}
            />
          </React.Fragment>
        ))}
      {newStandingData.length === 1 && (
        <DataGrid
          rows={Boolean(standingData?.length) ? standingData : newStandingData}
          columns={columns}
          getRowId={(row) => row.rank}
          slots={{
            footer: () => <></>,
          }}
        />
      )}
      {newStandingData.length > 0 ? (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          <ListItem sx={{ flexWrap: "wrap", gap: 1 }}>
            <ListItemText primary="W" secondary="Số trận thắng" />
            <ListItemText primary="L" secondary="Số trận thua" />
            <ListItemText primary="D" secondary="Số trận hòa" />
            <ListItemText primary="BT" secondary="Số bàn thắng" />
            <ListItemText primary="SBT" secondary="Số bàn thua" />
            <ListItemText primary="HS" secondary="Hiệu suất" />
          </ListItem>
        </List>
      ) : (
        <NoData title="Chưa có thông tin" />
      )}
    </Box>
  );
}

export default React.memo(LeagueStanding);

const columns: GridColDef[] = [
  {
    field: "rank",
    headerName: "STT",
    width: 50,
    align: "center",
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "team",
    headerName: "Đội bóng",
    disableColumnMenu: true,
    headerAlign: "center",
    sortable: false,
    width: 140,
    renderCell: (params: GridCellParams) => {
      return (
        <Stack
          component={Link}
          href={`/doi-bong/${params.row.team.code}`}
          direction={"row"}
          alignItems={"center"}
          gap={0.5}
        >
          {params.row.status === "up" && (
            <ArrowDropUpOutlinedIcon fontSize="small" color="primary" />
          )}
          {params.row.status === "down" && (
            <ArrowDropDownOutlinedIcon fontSize="small" color="error" />
          )}
          {params.row.status === "same" && (
            <ArrowDropDownOutlinedIcon fontSize="small" className="invisible" />
          )}
          <Avatar
            style={{
              width: 20,
              height: 20,
            }}
            src={params.row.team.icon || DEFAULT_TEAM_ICON}
          />
          <Typography
            fontSize={"small"}
            fontWeight={700}
            className="trucate max-w-[50px] text-gray-400"
          >
            {params.row.team.name || ""}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: "win",
    headerName: "W",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    headerClassName: "text-green-500",
    valueGetter: (params: GridValueGetterParams) => `${params.row.all.win}`,
  },
  {
    field: "draw",
    headerName: "D",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) => `${params.row.all.draw}`,
    headerClassName: "text-yellow-500",
    cellClassName: "text-center",
  },
  {
    field: "lose",
    headerName: "L",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    headerClassName: "text-red-500",
    valueGetter: (params: GridValueGetterParams) => `${params.row.all.lose}`,
  },
  {
    field: "BT",
    headerName: "BT",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.all.goals.for}`,
  },
  {
    field: "SBT",
    headerName: "SBT",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.all.goals.against}`,
  },
  {
    field: "HS",
    headerName: "HS",
    disableColumnMenu: true,
    sortable: false,
    width: 50,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) => `${params.row.goalsDiff}`,
  },
  {
    field: "LS",
    headerName: "5 Trận gần nhất",
    disableColumnMenu: true,
    sortable: false,
    width: 150,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridCellParams) => {
      return (
        <Stack direction={"row"} alignItems={"center"} gap={0.5}>
          {params.row.form.split("").map((item: string, index: number) => (
            <Typography
              key={index}
              fontSize={"small"}
              fontWeight={700}
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                item === "W" ? "bg-green-500" : ""
              } ${item === "L" ? "bg-red-500" : ""} ${
                item === "D" ? "bg-yellow-500" : ""
              }`}
            >
              {item}
            </Typography>
          ))}
        </Stack>
      );
    },
  },
];
