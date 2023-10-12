import React from "react";
import Card from "@mui/material/Card";
import CustomLink from "@/components/common/CustomLink";
import { DEFAULT_NEWS_STORY_COVER } from "@/constants";
import Image from "next/image";
import { getFromNowShort, getMediaURL } from "@/utils";
import dayjs from "dayjs";
import { StoryDetailModel } from "@/models/new_model";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import { unBookmarkStoryAPI } from "@/apis/news_apis";
import { toast } from "react-toastify";
import { RootState, store } from "@/store";
import { useSelector } from "react-redux";
import ModalAuth from "@/components/Modal/ModalAuth";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";
import { deleteStory } from "@/reducers/storiesSlice";

interface CardBookmarkProps {
  item: StoryDetailModel;
  showTag?: boolean;
}

function CardBookmark({ item, showTag = false, ...props }: CardBookmarkProps) {
  const theme: any = useTheme();
  const { updateModal } = React.useContext(ModalContext);
  const { data: userStore } = useSelector(
    (state: RootState) => state.userStore
  );
  if (!item) return null;
  const searchExtra = item.searchExtra;
  const publishedAt = searchExtra
    ? dayjs.unix(item.publishedAt)
    : item.publishedAt;

  const onBookmark = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    await unBookmarkStoryAPI({ storyCode: item.code })
      .then((r) => {
        if (r.data.ok) {
          store.dispatch(deleteStory(item.code));
          toast.success(r.data.msg);
        } else toast.warning(r.data.msg);
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
                item.cover ||
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
            />
          </Box>
          <Stack className="gap-1 flex-1 p-1" justifyContent={"space-between"}>
            <h3 className="font-bold heading-font text-sm line-clamp-2">
              {item.title}
            </h3>
            <div className="text-gray-400 text-xs flex items-center justify-between">
              {getFromNowShort(publishedAt, true)}

              <IconButton size="small" onClick={(e) => onBookmark(e)}>
                <BookmarkRemoveOutlinedIcon
                  fontSize="small"
                  className="text-gray-400"
                />
              </IconButton>
            </div>
          </Stack>
        </Stack>
      </Card>
    </CustomLink>
  );
}

export default React.memo(CardBookmark);
