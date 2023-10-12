"use client";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { Card, Divider, FormControl, MenuItem, Select } from "@mui/material";
import { COMPETITION_TABS } from "@/configs/constants";
import MatchItem from "@/components/Soccer/MatchItem";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Badge } from "antd";

interface LeagueScheduleProps {
  matchesData: any;
  isViewMatchSchedulePage?: boolean;
}

function LeagueSchedule({
  matchesData,
  isViewMatchSchedulePage = false,
  ...props
}: LeagueScheduleProps) {
  const router = useRouter();
  const status = useSearchParams().get("status") || "ALL";
  const handleFilter = (e: any) => {
    router.push(`${window.location.pathname}/?status=${e.target.value}`);
  };
  return (
    <>
      {isViewMatchSchedulePage && (
        <Box sx={{ p: 1 }}>
          <FormControl className="option-sort">
            <Select
              sx={{
                "&::before": {
                  border: "unset !important",
                },
              }}
              variant="standard"
              onChange={handleFilter}
              autoWidth
              value={status}
            >
              <MenuItem value={"ALL"}>Tất cả(mặc định)</MenuItem>
              <MenuItem value={"NS"}>Sắp diễn ra</MenuItem>
              <MenuItem value={"FT"}>Đã kết thúc</MenuItem>
            </Select>
          </FormControl>
          <Divider />
        </Box>
      )}
      {matchesData.map((item: any, idx: number) => (
        <Card className="mb-4" key={`${item.week}-${idx}`}>
          <Box className="pr-4 mt-4 mb-2 flex items-center justify-between">
            <h3 className="uppercase text-sm font-bold text-primary border-0 border-l-4 border-solid border-primary/40 pl-2">
              {item.date}
            </h3>
            <Badge
              color="green"
              className="mt-1"
              count={`${item.items.length} trận`}
            />
          </Box>
          {item.items.map((ma: any) => (
            <div key={ma.code}>
              <MatchItem matchItem={ma} viewStatus={true} style={styles} />
              <Divider />
            </div>
          ))}
        </Card>
      ))}
    </>
  );
}

export default React.memo(LeagueSchedule);

const TabLink = ({ label, value }: { label: string; value: string }) => {
  const { slugId } = useParams();
  return (
    <Tab
      LinkComponent={Link}
      label={label}
      value={value}
      href={`/giai-dau/${slugId}/${
        value === COMPETITION_TABS.TONG_QUAN ? "" : value
      }`}
    />
  );
};

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
