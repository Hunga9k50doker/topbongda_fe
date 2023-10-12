"use client";
import React from "react";
import { DEFAULT_COMPETITION_ICON, DEFAULT_TEAM_ICON } from "@/constants";
import Image from "next/image";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import CustomLink from "@/components/common/CustomLink";
import HTMLReactParser from "html-react-parser";
import dynamic from "next/dynamic";
import { getFromNowSmart, getMediaURL } from "@/utils";
import { StoryDetailModel } from "@/models/new_model";
import WrapTitle from "@/components/common/WrapTitle";
import { IconButton, Stack } from "@mui/material";
import { useEffectOnce } from "react-use";
import { bookmarkStoryAPI, getSameTagsStoriesAPI } from "@/apis/news_apis";
import CardStory from "@/components/Cards/CardStory";
import Link from "next/link";
import { Space, Tag } from "antd";
import { TagOutlined } from "@ant-design/icons";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import { toast } from "react-toastify";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import ModalShare from "@/components/Modal/ModalShare";
const FloatButtonCustom = dynamic(
  () => import("@/components/common/FloatButtonCustom"),
  {
    ssr: false,
  }
);
const WrapComments = dynamic(() => import("@/components/common/WrapComments"), {
  ssr: false,
});
interface NewDetailProps {
  storySlugCode: string;
  story: StoryDetailModel;
  relatedStories: StoryDetailModel[];
}

function NewDetail({
  storySlugCode,
  story,
  relatedStories,
  ...props
}: NewDetailProps) {
  const breadcrumbs = [
    {
      label: "Tin bóng đá",
      href: "/tin-bong-da",
    },
    {
      label: `#${story.code}`,
    },
  ];
  const { updateModal } = React.useContext(ModalContext);
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const [items, setItems] = React.useState([]);
  const [isBookmarked, setIsBookmarked] = React.useState(story.isBookmark);

  useEffectOnce(() => {
    getSameTagsStoriesAPI({ slugCode: storySlugCode })
      .then((r) => {
        setItems(r.data);
      })
      .catch(() => []);
  });

  const onBookmark = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    await bookmarkStoryAPI({ storyCode: story.code })
      .then((r) => {
        if (r.data.ok) {
          setIsBookmarked(!isBookmarked);
          toast.success(r.data.msg);
        } else toast.warning(r.data.msg);
      })
      .catch(() => {
        toast.error("Đã có lỗi xảy ra!");
      });
  };

  const onShare = () => {
    updateModal(
      `${story.code}-share`,
      <ModalShare data={story} type="story" />
    );
  };

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <FloatButtonCustom data={story} />
      {story.cover ? (
        <Image
          src={story.cover}
          alt=""
          width={600}
          height={300}
          priority={true}
          style={{
            objectFit: "cover",
            maxHeight: "300px",
          }}
        />
      ) : (
        <></>
      )}
      <div className="container mx-auto px-2 mt-4 mb-4">
        <header>
          <h1 className="uppercase font-bold text-lg m2-4">{story.title}</h1>
        </header>
        <Stack
          direction={"row"}
          className="items-center text-gray-400 text-sm italic space-x-1"
        >
          <DateRangeOutlinedIcon
            color="disabled"
            sx={{ width: 14, height: 14 }}
          />
          {getFromNowSmart(story.publishedAt)}
        </Stack>
        <div className="text-lg mt-4">
          {HTMLReactParser(story.contentSafe || "")}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {story.postOriginUrl && (
              <p className="text-gray-400">
                {story.postSource ? (
                  <a
                    href={story.postOriginUrl}
                    rel="noreferrer nofollow"
                    target="_blank"
                  >
                    <span>Nguồn: {story.postSource.name}</span>
                  </a>
                ) : (
                  <span className="font-bold">Tổng Hợp Trên Internet</span>
                )}
              </p>
            )}
          </div>
          <Space size={[8, 8]} wrap>
            <IconButton
              className="bg-green-600 bg-opacity-20"
              size="small"
              onClick={(e) => onBookmark(e)}
              aria-label="saved"
            >
              {isBookmarked ? (
                <BookmarkOutlinedIcon
                  fontSize="small"
                  className="text-primary"
                />
              ) : (
                <BookmarkAddOutlinedIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              )}
            </IconButton>
            <IconButton
              className="bg-green-600 bg-opacity-20"
              size="small"
              onClick={onShare}
              aria-label="share"
            >
              <ShareOutlinedIcon fontSize="small" className="text-gray-400" />
            </IconButton>
          </Space>
        </div>
      </div>
      <Divider />
      <div className="mt-6">
        <WrapComments code={story.code} data={story} type="story" />
      </div>
      {relatedStories.length > 0 && (
        <>
          <WrapTitle title="Các tin bóng đá liên quan"></WrapTitle>
          {relatedStories.map((item) => (
            <RelatedArticleItem key={item.code} item={item} />
          ))}
        </>
      )}
      <div className="mt-8">
        {Boolean(
          story.teams.length || story.competitions.length || story.tags.length
        ) && (
          <h2>
            <WrapTitle title="Nhắc đến trong bài viết này" />
          </h2>
        )}
        <Space size={[0, 8]} wrap className="mx-4">
          {story.teams.map((item: any) => (
            <TagItem
              key={item.url}
              url={item.url}
              iconSrc={getMediaURL(item.icon) || DEFAULT_TEAM_ICON}
              label={item.name}
            />
          ))}
          {story.competitions.map((item: any) => (
            <TagItem
              key={item.url}
              url={item.url}
              iconSrc={getMediaURL(item.icon) || DEFAULT_COMPETITION_ICON}
              label={item.name}
            />
          ))}
          {story.tags.map((item: any) => (
            <TagItem key={item.url} url={item.url} label={item.name} isTag />
          ))}
        </Space>
      </div>
      {items.length > 0 && (
        <>
          <WrapTitle title="Các tin liên quan tới chủ đề" />
          {items.map((item: any) => (
            <CardStory key={item.code} item={item} />
          ))}
        </>
      )}
    </>
  );
}

export default NewDetail;

function RelatedArticleItem({ item, ...props }: { item: any }) {
  return (
    <div className="related-post-item">
      <CustomLink
        href={item.url}
        className="block px-4 py-2 hover:bg-gray-200/20 active:bg-gray-200/40 text-sm"
      >
        <h3 className="font-bold">{item.title}</h3>
        <div className="flex items-center space-x-1 text-gray-400">
          <span>{item.publishedAtVerbose}</span>
          {item.numComments > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <QuestionAnswerOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{item.numComments}</span>
              </span>
            </>
          )}

          {item.numLikes > 0 && (
            <>
              <span>&middot;</span>
              <span className="inline-flex items-center space-x-1">
                <ThumbUpOutlinedIcon sx={{ width: 14, height: 14 }} />
                <span>{item.numLikes}</span>
              </span>
            </>
          )}
        </div>
      </CustomLink>
      <Divider />
    </div>
  );
}

function TagItem({
  iconSrc,
  isTag,
  label,
  url,
  ...props
}: {
  iconSrc?: string;
  isTag?: boolean;
  label: string;
  url?: string;
}) {
  return (
    <Link href={url || "#"}>
      <Tag
        className="flex items-center py-1/2"
        icon={
          isTag ? (
            <TagOutlined />
          ) : (
            <Avatar src={iconSrc} alt={label} sx={{ width: 16, height: 16 }} />
          )
        }
      >
        {label}
      </Tag>
    </Link>
  );
}
