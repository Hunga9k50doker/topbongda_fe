import React from "react";
import Card from "@mui/material/Card";
import CustomLink from "@/components/common/CustomLink";
import { DEFAULT_NEWS_STORY_COVER } from "@/constants";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { getMediaURL } from "@/utils";
import dayjs from "dayjs";
import { StoryDetailModel } from "@/models/new_model";
import { useTheme } from "@mui/material/styles";
import { Space, Tag } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { Box, Stack } from "@mui/material";
import { bookmarkStoryAPI } from "@/apis/news_apis";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { useRouter } from "next/navigation";
import TimeAgoShort from "@/components/TimeAgoShort";

interface CardStoryProps {
  item: StoryDetailModel;
  showTag?: boolean;
}

function CardStory({ item, showTag = false, ...props }: CardStoryProps) {
  const theme: any = useTheme();
  const router = useRouter();
  const { updateModal } = React.useContext(ModalContext);
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  const searchExtra = item.searchExtra;
  const publishedAt = searchExtra
    ? dayjs.unix(item.publishedAt)
    : item.publishedAt;

  const [src, setSrc] = React.useState(item.cover);
  const [postSource, setPostSource] = React.useState(
    searchExtra ? searchExtra.postSource : item.postSource
  );

  const onBookmark = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    await bookmarkStoryAPI({ storyCode: item.code })
      .then((r) => {
        if (r.data.ok) toast.success(r.data.msg);
        else toast.warning(r.data.msg);
      })
      .catch(() => {
        toast.error("Đã có lỗi xảy ra!");
      });
  };

  const onRedirect = (e: React.SyntheticEvent, url: string) => {
    e.stopPropagation();
    e.preventDefault();
    router.push(url);
  };

  return (
    <CustomLink href={item.url} className="hover:text-primary">
      <Card
        sx={{
          display: "flex",
          minWidth: 300,
          boxShadow: `0 1px 4px ${theme.palette.custom.boxShadow}`,
        }}
        className="flex flex-col"
      >
        <Stack direction={"row"} flex={1}>
          <Box
            sx={{
              position: "relative",
              width: "120px",
              minHeight: "72px",
              height: "auto",
            }}
          >
            <Image
              src={
                src ||
                getMediaURL(searchExtra?.coverUrl) ||
                DEFAULT_NEWS_STORY_COVER
              }
              alt={item.title}
              style={{
                objectFit: "cover",
                borderBottomRightRadius: 8,
                maxHeight: "72px",
              }}
              width={120}
              height={72}
              onError={() => setSrc(DEFAULT_NEWS_STORY_COVER)}
            />
          </Box>
          <Stack className="gap-1 flex-1 p-1" justifyContent={"space-between"}>
            <p className="font-bold heading-font text-sm line-clamp-2">
              {item.title}
            </p>
            <div className="flex items-center justify-between space-x-2 text-xs">
              {postSource && (
                <div className="flex items-center justify-between space-x-2 max-w-[50%] truncate">
                  {postSource.icon ? (
                    <Avatar
                      src={getMediaURL(postSource.icon)}
                      alt={postSource.name}
                      sx={{ width: 20, height: 20 }}
                      onError={() =>
                        setPostSource({
                          ...postSource,
                          icon: DEFAULT_NEWS_STORY_COVER,
                        })
                      }
                      imgProps={{
                        width: 22,
                        height: 22,
                      }}
                      className="bg-blue-400"
                    />
                  ) : (
                    <Avatar
                      sx={{ width: 20, height: 20 }}
                      className="bg-blue-400"
                    >
                      <NewspaperIcon sx={{ width: 14, height: 14 }} />
                    </Avatar>
                  )}
                  <span>{postSource.name}</span>
                </div>
              )}
              <p className="text-gray-400 text-xs">
                <TimeAgoShort datetimeStr={publishedAt} showSuffix={true} />
              </p>
            </div>
          </Stack>
        </Stack>
        {showTag && (
          <Space
            size={[0, 8]}
            wrap
            className={`${Boolean(item.tags.length) ? "m-2" : ""}`}
          >
            {item.tags.map((tag) => (
              <Tag
                key={tag.name}
                className="flex items-center py-1/2"
                icon={<TagOutlined />}
                onClick={(e) => onRedirect(e, tag.url || "#")}
              >
                {tag.name}
              </Tag>
            ))}
          </Space>
        )}
      </Card>
    </CustomLink>
  );
}

export default React.memo(CardStory);
