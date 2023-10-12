import React, { useState, useMemo } from "react";
import { Tab, Tabs as TabsMUI } from "@mui/material";
import CustomLink from "@/components/common/CustomLink";
import { usePathname } from "next/navigation";

interface TabsProps {
  data: any[];
  children?: React.ReactNode;
  //   value: number | string;
  //   handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabProps {
  href?: string;
  icon?: any;
}

const Tabs = ({ data, children }: TabsProps) => {
  const [value, setValue] = React.useState(0);
  const path = usePathname();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //   useMemo(() => {
  //     const index = data.findIndex((item) => item.href === path);
  //     if (index !== -1) {
  //       setValue(index);
  //     } else {
  //       setValue(0);
  //     }
  //   }, [path]);

  return (
    <TabsMUI
      value={value}
      onChange={handleChange}
      aria-label="tabs"
      sx={{ justifyContent: "space-between" }}
    >
      {data.map((item, key) => (
        <Tab
          label={item.title}
          LinkComponent={CustomLink}
          href={item.href}
          key={key}
          value={key}
          icon={item.icon}
          sx={{ minWidth: "unset", flex: 1 }}
        />
      ))}
      {children}
    </TabsMUI>
  );
};

export default Tabs;
