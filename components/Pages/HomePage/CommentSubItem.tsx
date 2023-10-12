import React from "react";
import CustomLink from "@/components/common/CustomLink";
import Avatar from "@mui/material/Avatar";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useSelector } from "react-redux";
import { formatDate, getMediaURL } from "@/utils";
import Tooltip from "@mui/material/Tooltip";
import { WolfIcon } from "@/assets/images/icons";
import { RootState, store } from "@/store";
import { Stack, Typography, MenuItem, IconButton } from "@mui/material";
import TimeAgoShort from "@/components/TimeAgoShort";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalReport from "@/components/Modal/ModalReport";
import { useTheme } from "@mui/material/styles";
import PopoverCustom from "@/components/common/PopoverCustom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModalDelete from "@/components/Modal/ModalDelete";
import ModalEdit from "@/components/Modal/ModalEdit";
import { toast } from "react-toastify";
import { postForumAPI } from "@/apis/forum_apis";
import { ItemCommentModel } from "@/models/comment_model";
import { FORUM_API_EDIT_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { deleteSubComment } from "@/reducers/commentsSlice";
import ChipLevel from "@/components/Chips/ChipLevel";
import AvatarCustom from "@/components/common/AvatarCustom";
import LikeButtonComment from "@/components/Pages/HomePage/LikeButtonComment";
import ListTrophies from "@/components/common/ListTrophies";

interface CommentSubItemProps {
  item: ItemCommentModel;
  data: any; // match , news, topic
  type: "topic" | "story" | "match";
}

function CommentSubItem({
  item,
  data,
  type = "topic",
  ...props
}: CommentSubItemProps) {
  const userStore = useSelector((state: RootState) => state.userStore.data);

  const { updateModal } = React.useContext(ModalContext);
  const theme: any = useTheme();

  if (!item)
    return (
      <p className="italic text-center text-xs">
        Bình luận không tồn tại hoặc đã bị xóa
      </p>
    );

  const onReportComment = () => {
    updateModal(
      `${item?.code}-report`,
      <ModalReport data={item} type="comment" />
    );
  };
  const onEditComment = () => {
    updateModal(
      `${item?.code}-edit`,
      <ModalEdit type="subcomment" data={item} />
    );
  };

  const onDeleteComment = () => {
    updateModal(
      `${item?.code}-delete`,
      <ModalDelete handleEvent={onConfirmDeleteComment} />
    );
  };

  const onConfirmDeleteComment = () => {
    postForumAPI(FORUM_API_EDIT_COMMENT, {
      code: item.code,
      content: item.contentMd,
      delete: "yes",
    })
      .then((r) => {
        store.dispatch(deleteSubComment(item));
      })
      .finally(() => {
        toast.success("Xóa bình luận thành công");
      })
      .catch((e) => {
        toast.error("Xóa bình luận thất bại");
      });
  };

  return (
    <Stack
      direction={"row"}
      gap={0.5}
      sx={{
        ".MuiBadge-root": {
          borderWidth: "1px",
        },
      }}
    >
      <CustomLink href={item.user.url} className="mt-1 w-fit h-fit">
        <AvatarCustom data={item.user} style={{ width: 28, height: 28 }} />
      </CustomLink>
      <Stack
        sx={{
          flex: 1,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
          p: 1,
        }}
        gap={0.5}
      >
        <Stack gap={0.5}>
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Stack
              flex={1}
              direction={"row"}
              gap={1}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <CustomLink
                href={item.user.url}
                className="link-hover text-sm font-bold truncate"
              >
                {item.user.name || item.user.username}
              </CustomLink>
              {item.user.isStaff && (
                <Tooltip title="Quản trị viên">
                  <span className="ml-2 text-blue-500 inline-flex">
                    <WolfIcon width={14} height={14} />
                  </span>
                </Tooltip>
              )}
              {item.user.favoriteTeamIcon && (
                <Tooltip title={`Fan ${item.user.favoriteTeam}`}>
                  <Avatar
                    alt=""
                    src={getMediaURL(item.user.favoriteTeamIcon)}
                    sx={{ width: 16, height: 16 }}
                    imgProps={{ className: "no-drag no-select" }}
                  />
                </Tooltip>
              )}
              <ListTrophies
                data={item.user}
                style={{ width: 16, height: 16 }}
              />
            </Stack>
            <Typography className="text-xs text-gray-400">
              <TimeAgoShort datetimeStr={item.createdAt} />
            </Typography>
            <PopoverCustom
              size="large"
              icon={
                <MoreHorizOutlinedIcon
                  fontSize={"small"}
                  color={theme.palette.text.primary}
                />
              }
            >
              {userStore.username === item.user.username && (
                <>
                  <MenuItem onClick={onEditComment}>
                    <EditOutlinedIcon fontSize={"small"} color="disabled" />
                    <Typography className="text-sm ml-2">
                      Chỉnh sửa bình luận
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onDeleteComment}>
                    <DeleteOutlineOutlinedIcon
                      fontSize={"small"}
                      color="disabled"
                    />
                    <Typography className="text-sm ml-2">
                      Xóa bình luận
                    </Typography>
                  </MenuItem>
                </>
              )}
              <MenuItem onClick={onReportComment}>
                <FlagOutlinedIcon fontSize={"small"} color="disabled" />
                <Typography className="text-sm ml-2">
                  Báo cáo bình luận
                </Typography>
              </MenuItem>
            </PopoverCustom>
          </Stack>

          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <ChipLevel data={item.user} />
            {type === "topic" && data.user.username === item.user.username && (
              <Typography className="badge text-blue-600 bg-blue-600/40 border-0 text-2xs font-bold px-1">
                Chủ thớt
              </Typography>
            )}
          </Stack>
        </Stack>
        <Typography className="mx-2 text-sm">{item.contentMd}</Typography>

        {item.editedAt && (
          <Typography className="text-2xs text-gray-400 italic mx-2">
            (Đã chỉnh sửa)
          </Typography>
        )}

        <Stack direction={"row"} alignItems={"center"}>
          <LikeButtonComment item={item} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default React.memo(CommentSubItem);
