"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import CustomLink from "@/components/common/CustomLink";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

interface WrapTitleProps {
  title: string;
  link?: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  component?: any; // component của Typography h1,h2,h3,h4,h5,h6...
}
const WrapTitle = ({
  title,
  link,
  subtitle,
  children,
  className,
  component = "p",
}: WrapTitleProps) => {
  return (
    <Stack
      sx={{
        py: "2px",
        my: 1,
        mr: 1,
        pl: "6px",
        gap: 4,
      }}
      className={`wrap-title border-l-4 border-solid border-primary ${
        className || ""
      }`}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      color="text.primary"
    >
      <Typography
        component={component}
        variant="body2"
        sx={{ fontWeight: 700, fontSize: 14, textTransform: "uppercase" }}
      >
        {title}
      </Typography>

      {children}

      {link && subtitle && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          className="text-gray-400 hover:text-gray-700"
          gap={1}
          sx={{ fontSize: 14, fontWeight: 500 }}
        >
          <Typography
            variant="body2"
            sx={{ whiteSpace: "nowrap" }}
            component={CustomLink}
            href={link}
          >
            {subtitle}
          </Typography>
          <HiOutlineArrowLongRight />
        </Stack>
      )}
    </Stack>
  );
};

export default WrapTitle;
