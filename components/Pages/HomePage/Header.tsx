import React from "react";
import { HOME_TABS } from "@/configs/constants";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import Banner from "@/components/common/Banner";
import { homeTabs } from "@/assets/database/homeTabs";
import { MatchDetailModel } from "@/models/match_model";

interface HeaderProps {
  matchHeadLines: MatchDetailModel[];
}

const Header = ({ matchHeadLines }: HeaderProps) => {
  const { tab } = useParams();
  const value = tab || HOME_TABS.PHO_BIEN;
  return (
    <Box>
      <Tabs
        value={value}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs home"
      >
        {homeTabs.map((item, key) => (
          <Tab
            LinkComponent={Link}
            href={item.href}
            className="text-gray-400"
            key={key}
            value={item.href.replaceAll("/", "") || HOME_TABS.PHO_BIEN}
            label={item.label}
            sx={{
              textTransform: "initial",
              minWidth: "unset",
              fontWeight: 600,
            }}
          />
        ))}
      </Tabs>
      <Divider />
      <Banner dataSwipper={matchHeadLines} />
    </Box>
  );
};

export default Header;
