import React from "react";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Divider from "@mui/material/Divider";
import CustomLink from "@/components/common/CustomLink";
import { getFromNowSmart, numberFormatter } from "@/utils";
import { TopicDetailModel } from "@/models/topic_model";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function RelatedTopicsHeadlineItem({
  item,
  ...props
}: {
  item: TopicDetailModel;
}) {
  if (!item) return null;
  return (
    <div className="related-post-item">
      <CustomLink
        href={item.url}
        className="block px-4 py-2 hover:bg-gray-200/20 active:bg-gray-200/40 text-sm"
      >
        <div>
          <small>@{item.user.name}</small>
        </div>

        <h3 className="font-bold x-line-clamp-2">{item.getTitle}</h3>
        <div className="flex items-center space-x-1 text-gray-400">
          <span>{getFromNowSmart(item.publishedAt)}</span>

          {item.numComments > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <QuestionAnswerOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{numberFormatter(item.numComments)}</span>
              </span>
            </>
          )}

          {item.numLikes > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                {item.isLiked ? (
                  <ThumbUpIcon color="primary" sx={{ width: 14, height: 14 }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ width: 14, height: 14 }} />
                )}
                <span>{numberFormatter(item.numLikes)}</span>
              </span>
            </>
          )}
        </div>
      </CustomLink>
      <Divider />
    </div>
  );
}

export default RelatedTopicsHeadlineItem;
