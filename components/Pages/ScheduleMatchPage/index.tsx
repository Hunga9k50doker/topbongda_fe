"use client";
import React from "react";
import Card from "@mui/material/Card";
import MatchItem from "@/components/Soccer/MatchItem";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import AboutFixturesFoot from "@/components/Soccer/AboutFixturesFoot";
import CardContent from "@mui/material/CardContent";
import CustomLink from "@/components/common/CustomLink";
import Banner from "@/components/common/Banner";
import NewTopicsItem from "@/components/Pages/NewsPage/NewTopicsItem";
import Typography from "@mui/material/Typography";
import { FiFilter } from "react-icons/fi";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import DrawerCustom from "@/components/common/DrawerCustom";
import { MatchScheduleContext } from "@/context/MatchScheduleContext/MatchScheduleContext";
import WrapTitle from "@/components/common/WrapTitle";
import Chip from "@mui/material/Chip";
import isEqual from "lodash/isEqual";
import SidebarCalendar from "@/components/Soccer/SidebarCalendar";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import CompetitionSelect from "@/components/common/CompetitionSelect";
import TeamSelect from "@/components/Pages/CreatePostPage/TeamSelect";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import { Badge } from "antd";

const Matches = () => {
  const {
    query,
    dataBanner,
    searchParameters,
    open,
    isMajorLeagues,
    isToday,
    hasNext,
    status,
    items,
    topicHeadlines,
    selectedCompetition,
    selectedTeam,
    handleLoadMore,
    toggleDrawer,
    renderFilter,
    handleClear,
    handleUpdateFilter,
    handleFilter,
  } = React.useContext(MatchScheduleContext);
  const theme: any = useTheme();
  const breadcrumbs = [
    {
      label: "Lịch thi đấu",
    },
  ];

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Banner
        typebanner="match"
        dataSwipper={dataBanner?.[0]?.[2].length > 0 ? dataBanner[0][2] : []}
      ></Banner>
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        gap={1}
        sx={{ m: 1 }}
      >
        <Button
          startIcon={<FiFilter />}
          variant="outlined"
          onClick={() => toggleDrawer()}
          sx={{
            py: "2px",
            px: 1,
          }}
          className="w-fit whitespace-nowrap"
        >
          <Typography
            variant="subtitle1"
            component={"p"}
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            Bộ lọc
          </Typography>
        </Button>
        {Object.keys(searchParameters).length > 0 && (
          <React.Fragment>
            {Object.entries(searchParameters).map((item, index) => (
              <Chip
                key={index}
                size="small"
                onDelete={() => handleClear(item[0])}
                label={renderFilter(item[0])}
              />
            ))}
            <Chip
              size="small"
              onDelete={() => handleClear("all")}
              label={"Xóa tất cả"}
            />
          </React.Fragment>
        )}
      </Stack>

      <SidebarCalendar />
      <DrawerCustom isOpen={open} toggleDrawer={toggleDrawer}>
        <Stack
          onClick={(e) => e.stopPropagation()}
          justifyContent={"space-between"}
          sx={{
            px: 1,
            width: "100%",
            background: theme.palette.custom.gradientLight,
          }}
          role="presentation"
        >
          <List>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <CompetitionSelect
                multiple={false}
                value={selectedCompetition}
                onChange={(value: any) => {
                  handleUpdateFilter("competition", value);
                }}
              />
            </ListItem>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <TeamSelect
                multiple={false}
                value={selectedTeam}
                onChange={(value: any) => {
                  handleUpdateFilter("team", value);
                }}
              />
            </ListItem>
            <ListItem onClick={(e) => e.stopPropagation()}>
              <FormControl className="option-sort" fullWidth>
                <InputLabel htmlFor="status">Trạng thái</InputLabel>
                <Select
                  label="Trạng thái"
                  labelId="status"
                  variant="outlined"
                  onChange={(e: any) => {
                    handleUpdateFilter("status", e.target.value);
                  }}
                  fullWidth
                  value={status}
                >
                  <MenuItem value={"NS"}>
                    Đang và sắp diễn ra (mặc định)
                  </MenuItem>
                  <MenuItem value={"FT"}>Đã kết thúc</MenuItem>
                  <MenuItem value={"ALL"}>Tất cả</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Chỉ hôm nay"
                sx={{
                  ".MuiFormControlLabel-label": { fontWeight: "500" },
                }}
                checked={isToday}
                onChange={(event, checked) =>
                  handleUpdateFilter("today", checked)
                }
                className="whitespace-nowrap"
              />
            </ListItem>
            <ListItem>
              <FormControlLabel
                control={<Checkbox />}
                label="Chỉ giải lớn"
                sx={{
                  ".MuiFormControlLabel-label": { fontWeight: "500" },
                }}
                checked={isMajorLeagues}
                onChange={(event, checked) =>
                  handleUpdateFilter("majorLeagues", checked)
                }
                className="whitespace-nowrap"
              />
            </ListItem>
            <ListItem>
              <Button
                disabled={isEqual(searchParameters, query)}
                onClick={handleFilter}
                variant="outlined"
              >
                Lọc
              </Button>
            </ListItem>
            <ListItem>
              <Typography className="text-xs text-gray-400">
                (*) Bạn có thể nhập từ khóa để tìm kiếm đội bóng, giải đấu. Mặc
                định là những đội bóng, giải đấu được đề cử.
              </Typography>
            </ListItem>
          </List>
          <Divider />
        </Stack>
      </DrawerCustom>

      {items?.map((item, idx) => (
        <Card className="mb-4" key={`${item[0]}-${idx}`}>
          <div className="pr-4 mt-4 mb-2 flex items-center justify-between">
            <h3 className="uppercase text-sm font-bold text-primary border-0 border-l-4 border-solid border-primary/40 pl-2">
              {item[1]}
            </h3>
            <Badge
              color="green"
              className="mt-1"
              count={`${item[2].length} trận`}
            />
          </div>

          {item[2].map((mi: any) => (
            <MatchItem
              key={mi.code}
              viewScore={true}
              viewStatus={true}
              matchItem={mi}
              showLeagueName
              style={styles}
            />
          ))}
          <Divider />
        </Card>
      ))}

      {items?.length === 0 && (
        <p className="text-xs italic text-center">Không có trận đấu nào.</p>
      )}

      {hasNext && <LoadMoreButton loadMore={handleLoadMore} />}
      <AboutFixturesFoot />
      <Card className="mb-4">
        <CardContent>
          <div className="mb-4">
            <CustomLink
              href="/giai-dau/"
              className="btn btn-primary btn-sm w-full text-xs"
            >
              Danh sách giải đấu
            </CustomLink>
          </div>
          <div>
            <CustomLink
              href="/doi-bong/"
              className="btn btn-primary btn-sm w-full text-xs"
            >
              Danh sách đội bóng
            </CustomLink>
          </div>
        </CardContent>
      </Card>

      <WrapTitle title="Bài viết mới đăng" />
      {topicHeadlines.map((item: any) => (
        <NewTopicsItem key={item.code} item={item} />
      ))}
    </>
  );
};

export default Matches;

const styles = {
  "& img": {
    width: "24px",
    height: "24px",
  },
  "& h4": {
    fontSize: "16px",
  },

  "& .MuiTypography-body1": {
    fontSize: "12px",
  },
};
