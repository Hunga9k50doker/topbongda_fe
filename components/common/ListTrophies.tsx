import React from "react";
import { Avatar, Stack, Tooltip } from "@mui/material";
interface ListTrophiesProps {
  data: any;
  style?: any;
}

const ListTrophies = ({ data, style }: ListTrophiesProps) => {
  // const theme: any = useTheme();
  const styles = style
    ? style
    : {
        width: 24,
        height: 24,
      };

  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
      maxWidth={"50%"}
      gap={2}
      alignItems={"end"}
    >
      {/* {trophies.map((item, key) => (
        <Tooltip key={key} title={item.title}>
          <Avatar
            src={item.icon}
            alt=""
            imgProps={{
              style: {
                objectFit: "contain",
              },
            }}
            style={{
              background: theme.palette.background.paper,
              width: 24,
              height: 24,
            }}
          />
        </Tooltip>
      ))} */}

      {/* <Tooltip title={content.title}>
        <Avatar
          src={content.icon}
          alt=""
          imgProps={{
            style: {
              objectFit: "contain",
            },
          }}
          style={{
            background: theme.palette.background.paper,
            ...styles,
          }}
        />
      </Tooltip> */}
    </Stack>
  );
};

export default ListTrophies;
