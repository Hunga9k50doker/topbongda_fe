"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import WrapTitle from "@/components/common/WrapTitle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import RowCollapse from "@/components/common/RowCollapse";
import { Button, Stack, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import TopMembers from "@/components/Pages/HomePage/TopMembers";
import Link from "next/link";
interface ListUserProps {
  membersData?: any;
  searchQuery?: string;
  sortQuery?: string;
  topMembers?: any;
}

function ListUser({
  membersData,
  searchQuery,
  sortQuery,
  topMembers,
  ...props
}: ListUserProps) {
  const router = useRouter();
  const [q, setQ] = React.useState(searchQuery);
  const [sort, setSort] = React.useState(sortQuery);
  const pathName = usePathname();
  const time = useSearchParams().get("time");

  const isTopPage = pathName === "/thanh-vien/danh-sach/top/";

  const handleChangePage = (e: any, page1: number) => {
    router.push(`${pathName}?sort=${sort || ""}&q=${q || ""}&page=${page1}`);
  };

  const handleChangeSelectSort = (e: any) => {
    const val = e.target.value;
    setSort(val);
    router.push(`${pathName}?sort=${val}&q=${q || ""}&time=${time || ""}`);
  };

  const handleChangeSelectFillter = (e: any) => {
    const val = e.target.value;
    router.push(`${pathName}?sort=${sort || ""}&q=${q || ""}&time=${val}`);
  };

  const onSearch = () => {
    router.push(
      `${pathName}?sort=${sort || ""}&q=${q || ""}&time=${time || ""}`
    );
  };

  return (
    <>
      <Box sx={{ borderBottom: 2, borderColor: "divider", mb: 1 }}>
        <Tabs
          value={pathName}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="lab API tabs example"
        >
          <Tab
            LinkComponent={Link}
            href="/thanh-vien/danh-sach/"
            label="Danh sách thành viên"
            value="/thanh-vien/danh-sach/"
          />
          <Tab
            LinkComponent={Link}
            href="/thanh-vien/danh-sach/top"
            label="Top thành viên"
            value="/thanh-vien/danh-sach/top/"
          />
        </Tabs>
      </Box>
      <Stack sx={{ mx: 2, mb: 2 }} gap={2}>
        <Stack direction={"row"} alignItems={"center"}>
          <TextField
            fullWidth
            label="Nhập tên tài khoản..."
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            size="small"
          />
          <Button
            onClick={onSearch}
            className="btn btn-primary ml-2 h-10 min-h-0 inline-flex"
          >
            Tìm Kiếm
          </Button>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <FormControl sx={{ flex: 1, width: 200, maxWidth: 266 }}>
            <InputLabel size="small">Sắp xếp danh sách</InputLabel>
            <Select
              fullWidth
              label="Sắp xếp danh sách"
              name="sort"
              value={sort}
              onChange={handleChangeSelectSort}
              size="small"
            >
              <MenuItem value="AZ">Tên tài khoản A-Z</MenuItem>
              <MenuItem value="DJ">Ngày gia nhập</MenuItem>
              <MenuItem value="LV">Cấp độ</MenuItem>
            </Select>
          </FormControl>
          {isTopPage && (
            <FormControl sx={{ width: 120 }}>
              <Select
                name="time"
                value={time || "week"}
                onChange={handleChangeSelectFillter}
                size="small"
              >
                <MenuItem value="week">Top tuần (mặc định)</MenuItem>
                <MenuItem value="month">Top tháng</MenuItem>
                <MenuItem value="year">Top năm</MenuItem>
                <MenuItem value="all">Tất cả</MenuItem>
              </Select>
            </FormControl>
          )}
        </Stack>
      </Stack>
      {pathName === "/thanh-vien/danh-sach/" && (
        <>
          <WrapTitle component={"h1"} title="Thành viên của website" />
          {membersData.items.length === 0 && (
            <p className="text-center text-xs">
              {searchQuery ? (
                <em>Không tìm thấy thành viên nào.</em>
              ) : (
                <em>Chưa có thành viên nào trong danh sách.</em>
              )}
            </p>
          )}
          {membersData && membersData.items.length > 0 && (
            <div className="overflow-x-auto">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Thành viên</TableCell>
                      <TableCell align="right">Thông tin</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {membersData.items.map((item: any, key: number) => (
                      <RowCollapse key={key} isShowFavTeam={true} data={item} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {membersData.numPages > 1 && (
                <Pagination
                  color="primary"
                  count={membersData.numPages}
                  page={membersData.current}
                  onChange={handleChangePage}
                  className="mt-4 flex justify-center"
                />
              )}
            </div>
          )}
        </>
      )}
      {pathName === "/thanh-vien/danh-sach/top/" && (
        <>
          <WrapTitle component={"h1"} title="Top 50 thành viên trong tuần" />
          <TopMembers topMembers={topMembers} />
        </>
      )}
    </>
  );
}
export default ListUser;
