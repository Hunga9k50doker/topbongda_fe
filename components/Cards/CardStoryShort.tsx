import React from "react";
import Card from "@mui/material/Card";
import CustomLink from "@/components/common/CustomLink";
import { DEFAULT_NEWS_STORY_COVER } from "@/constants";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { getFromNowSmart, getMediaURL } from "@/utils";
import dayjs from "dayjs";
import { StoryDetailModel } from "@/models/new_model";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { bookmarkStoryAPI } from "@/apis/news_apis";
import { toast } from "react-toastify";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import { useRouter } from "next/navigation";

interface CardStoryShortProps {
  item: StoryDetailModel;
  showTag?: boolean;
}

function CardStoryShort({
  item,
  showTag = false,
  ...props
}: CardStoryShortProps) {
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
        <Stack direction={"row"}>
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
              }}
              sizes="100%"
              fill
              onError={() => setSrc(DEFAULT_NEWS_STORY_COVER)}
            />
          </Box>
          <Stack className="gap-1 flex-1 p-1">
            <h3 className="font-bold heading-font text-sm line-clamp-2">
              {item.title}
            </h3>

            <Stack direction={"row"} justifyContent={"space-between"}>
              <div className="flex items-center space-x-2 text-xs">
                {postSource && (
                  <>
                    {postSource.icon ? (
                      <Image
                        src={getMediaURL(postSource.icon)}
                        alt={postSource.name}
                        width={20}
                        height={20}
                        style={{
                          borderRadius: "50%",
                          height: 20,
                        }}
                        onError={() =>
                          setPostSource({
                            ...postSource,
                            icon: DEFAULT_NEWS_STORY_COVER,
                          })
                        }
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
                  </>
                )}
              </div>
              <div className="text-gray-400 text-xs">
                {getFromNowSmart(publishedAt, true)}
                <IconButton size="small" onClick={(e) => onBookmark(e)}>
                  {item.isBookmark ? (
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
              </div>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </CustomLink>
  );
}

export default React.memo(CardStoryShort);
