"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CategoryModel } from "@/models/category_model";
import HTMLReactParser from "html-react-parser";
import CustomLink from "@/components/common/CustomLink";
import { numberWithCommas } from "@/utils";

interface dataProps {
  data: CategoryModel;
  isShort?: boolean;
  type: "category" | "tag";
}

const CardCategory = ({
  data,
  isShort = true,
  type = "category",
}: dataProps) => {
  const theme: any = useTheme();
  return (
    <Stack
      component={CustomLink}
      href={data.url}
      sx={{
        background: theme.palette.background.paper,
        my: 1,
        p: 1,
        borderRadius: 1,
        boxShadow: `0 1px 2px ${theme.palette.custom.boxShadow}`,
      }}
    >
      <Typography variant="h6" component={"p"} sx={{ fontSize: 16 }}>
        {data.name || ""}
      </Typography>
      {type === "category" && (
        <Typography variant="body2" component={"div"}>
          {HTMLReactParser(isShort ? data.descShort : data.desc)}
        </Typography>
      )}
      <Stack
        gap={1}
        direction={"row"}
        justifyContent={"space-between"}
        color={theme.palette.primary.main}
      >
        {type === "tag" && (
          <>
            <Typography variant="body2">
              {numberWithCommas(data.numStories)} bài viết
            </Typography>
          </>
        )}
        {type === "category" && (
          <>
            <Typography variant="body2">
              {numberWithCommas(data.numTopics)} bài viết
            </Typography>
            <Typography variant="body2">
              {numberWithCommas(data.numComments)} bình luận
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default React.memo(CardCategory);
