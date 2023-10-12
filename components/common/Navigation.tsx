import React, { useMemo, memo } from "react";
import { Tab, Tabs } from "@mui/material";
import { navigations } from "@/assets/database/navigation";
import CustomLink from "@/components/common/CustomLink";
import { usePathname } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navigation = () => {
  const [value, setValue] = React.useState(0);
  const path = usePathname();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useMemo(() => {
    const index = navigations.findIndex((item) => item.href === path);
    if (index !== -1) {
      setValue(index);
    } else {
      setValue(0);
    }
  }, [path]);

  return (
    <NewStyle>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="tabs"
        sx={{ justifyContent: "space-between" }}
      >
        {navigations.map((item, key) => (
          <Tab
            LinkComponent={CustomLink}
            href={item.href}
            key={key}
            value={key}
            icon={item.icon}
            sx={{ minWidth: "unset", flex: 1 }}
          />
        ))}
      </Tabs>
    </NewStyle>
  );
};

export default memo(Navigation);

const NewStyle = styled("div")(({ theme }: any) => ({
  marginTop: "56px",
  marginBottom: "8px",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  boxShadow: `0px 1px 2px ${theme.palette.custom.boxShadow}`,
}));
