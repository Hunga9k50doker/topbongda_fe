import React from "react";
import { FloatButton } from "antd";
import SendToMobileOutlinedIcon from "@mui/icons-material/SendToMobileOutlined";
import { Box } from "@mui/material";

const FloatButtonCustom = ({
  data,
}: {
  data: any; //topic, story, comment,
}) => {
  const onOpenApp = () => {
    // window.location.href = `story_detail/:${data.code}`;
  };

  return (
    <Box
      sx={{
        ".ant-float-btn-content": {
          flexDirection: "row !important",
          gap: 1,
        },
        ".ant-float-btn-body:hover": {
          backgroundColor: (theme) =>
            `${theme.palette.background.default} !important`,
        },
      }}
    >
      <FloatButton
        onClick={onOpenApp}
        icon={<SendToMobileOutlinedIcon color="primary" />}
        description="Đọc trên App"
        shape="square"
        style={{
          left: 8,
          bottom: 8,
          width: "fit-content",
        }}
      />
    </Box>
  );
};

export default FloatButtonCustom;
