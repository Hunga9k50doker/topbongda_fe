import React from "react";
import Card from "@mui/material/Card";
import CustomLink from "@/components/common/CustomLink";
import CardMedia from "@mui/material/CardMedia";
import { DEFAULT_NEWS_STORY_COVER } from "@/constants";
import Avatar from "@mui/material/Avatar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { getFromNowShort, getMediaURL } from "@/utils";
import dayjs from "dayjs";
import Image from "next/image";
interface StoryCardItemProps {
  item: any;
}

function StoryCardItem({ item, ...props }: StoryCardItemProps) {
  if (!item) return null;
  const searchExtra = item.searchExtra;
  const publishedAt = searchExtra
    ? dayjs.unix(item.publishedAt)
    : item.publishedAt;
  const postSource = searchExtra ? searchExtra.postSource : item.postSource;

  return (
    <Card className="flex flex-col">
      <CustomLink href={item.url} className="active:opacity-90">
        <CardMedia
          component="img"
          image={
            item.cover ||
            getMediaURL(searchExtra?.coverUrl) ||
            DEFAULT_NEWS_STORY_COVER
          }
          height={100}
          className="max-h-[168px]"
          alt=""
        />
      </CustomLink>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold heading-font">
          <CustomLink
            href={item.url}
            className="link-hover active:text-primary"
          >
            {item.title}
          </CustomLink>
        </h3>

        <div className="grow" />

        <div className="flex items-center text-xs mt-2">
          {postSource && (
            <div className="flex items-center space-x-2">
              {postSource.icon ? (
                <Image
                  loading="lazy"
                  src={getMediaURL(postSource.icon)}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded"
                  // onError={(e: any) =>
                  //   (e.target.src = DEFAULT_NEWS_STORY_COVER)
                  // }
                />
              ) : (
                <Avatar sx={{ width: 20, height: 20 }} className="bg-blue-400">
                  <NewspaperIcon sx={{ width: 14, height: 14 }} />
                </Avatar>
              )}
              <span>{postSource.name}</span>
            </div>
          )}
          <div className="grow" />
          <div className="text-gray-400">
            {getFromNowShort(publishedAt, true)}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(StoryCardItem);
