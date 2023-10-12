import { Tab, Tabs } from "@mui/material";
import React from "react";

interface TabsCustomProps {
  value: string;
  data: any[];
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const TabsCustom = ({ value, data, handleChange }: TabsCustomProps) => {
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="scrollable auto tabs example"
      sx={{
        justifyContent: "space-between",
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        // borderColor: theme.palette.custom.gray,
      }}
      scrollButtons="auto"
      variant="scrollable"
    >
      {data.map((item, key) => (
        <Tab
          key={key}
          value={`tab_account_item_${key}`}
          label={item.tilte}
          sx={{ minWidth: "unset" }}
        />
      ))}
    </Tabs>
  );
};

export default TabsCustom;
