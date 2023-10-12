import React from "react";
import { Tab, Tabs } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface TabListProps {
  value: string;
  data: any;
  handleChange: (event: React.SyntheticEvent, newValue: string) => void;
}
const TabList = ({ value, data = [], handleChange }: TabListProps) => {
  const theme: any = useTheme();

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {data.map((item: any, key: number) => (
        <Tab
          className="normal-case"
          key={key}
          value={key.toString()}
          label={item.tilte}
          sx={{
            minWidth: "unset",
            color: theme.palette.text.secondary,
            fontWeight: 600,
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabList;
