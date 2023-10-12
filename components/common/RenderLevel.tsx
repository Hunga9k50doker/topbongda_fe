import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { UserModel } from "@/models/user_model";

import { Gold, Silver, Bronze } from "@/assets/images";

interface RenderLevelProps {
  data?: UserModel;
  level: number;
}

const RenderLevel = ({ data, level }: RenderLevelProps) => {
  switch (level) {
    case 1:
      return (
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          src={Gold}
          alt={`${level}`}
        />
      );
    case 2:
      return (
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          src={Silver}
          alt={`${level}`}
        />
      );
    case 3:
      return (
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          src={Bronze}
          alt={`${level}`}
        />
      );
    default:
      return (
        <Typography
          sx={{ width: 24, height: 24, textAlign: "center" }}
          variant="h6"
          component={"p"}
        >
          {level}
        </Typography>
      );
  }
};

export default RenderLevel;
