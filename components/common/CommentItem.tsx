import React from "react";
import CustomLink from "@/components/common/CustomLink";
import Avatar from "@mui/material/Avatar";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { getMediaURL, numberFormatter } from "@/utils";
import { WEBSOKET_URL_COMMENT } from "@/constants";
import Tooltip from "@mui/material/Tooltip";
import { getSubCommentsListAPI } from "@/apis/forum_apis";
import { WolfIcon } from "@/assets/images/icons";
import {
  Stack,
  Typography,
  MenuItem,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TimeAgoShort from "@/components/TimeAgoShort";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalReport from "@/components/Modal/ModalReport";
import { RootState, store } from "@/store";
import { useMount, useUnmount } from "react-use";
import { postForumAPI } from "@/apis/forum_apis";
import { toast } from "react-toastify";
import PopoverCustom from "@/components/common/PopoverCustom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ModalDelete from "@/components/Modal/ModalDelete";
import ModalEdit from "@/components/Modal/ModalEdit";
import { ItemCommentModel } from "@/models/comment_model";
import { deleteComment, updateSubComments } from "@/reducers/commentsSlice";
import { CommentsListLoader } from "@/loaders";
import camelcaseKeys from "camelcase-keys";
import {
  FORUM_API_EDIT_COMMENT,
  FORUM_API_SUBCOMMENTS_LIST,
} from "@/configs/endpoints/forum_endpoints";
import ChipLevel from "@/components/Chips/ChipLevel";
import AvatarCustom from "@/components/common/AvatarCustom";
import HTMLReactParser from "html-react-parser";
import ListTrophies from "@/components/common/ListTrophies";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import ModalCreateReplyComment from "@/components/Modal/ModalCreateReplyComment";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import LikeButtonComment from "@/components/Pages/HomePage/LikeButtonComment";
import CommentSubItem from "@/components/Pages/HomePage/CommentSubItem";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
interface CommentItemProps {
  item: ItemCommentModel;
  type: "topic" | "match" | "story";
  data: any; // topic, match, story
}

function CommentItem({
  type = "topic",
  item,
  data,
  ...props
}: CommentItemProps) {
  const { updateModal } = React.useContext(ModalContext);
  const ws = React.useRef<any>(null);
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const search = useSearchParams();
  const sortQuery = search.get("sort") || "";
  const { childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );
  const theme: any = useTheme();
  const refChild = React.useRef<any>(null);
  const [subComments, setSubComments] = React.useState<ItemCommentModel[]>([]);
  const [subListData, setSubListData] = React.useState<any>({});
  const [loading, setLoading] = React.useState(false);
  const [numComments, setNumComments] = React.useState(item.numComments);

  const codeReply = React.useMemo(() => {
    switch (type) {
      case "topic":
        return item.topicCode || item.topic.code;
      case "match":
        return item.matchCode || item.match.code;
      case "story":
        return item.storyCode || item.story.code;
    }
  }, [item, type]);

  const getSubCommentsList = React.useCallback(
    (prs?: any) => {
      const p = {
        parentCode: item.code,
        sort: sortQuery === "" ? "NF" : sortQuery,
        ...prs,
      };
      getSubCommentsListAPI(p)
        .then((r) => {
          setSubListData(r.data);
          store.dispatch(updateSubComments({ [item.code]: r.data.items }));
        })
        .catch((e) => {
          toast.error("Lỗi khi tải dữ liệu");
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [subListData, item]
  );

  const loadSubComments = () => {
    setLoading(true);
    getSubCommentsList({
      page: (subListData?.current || 0) + 1,
    });
  };

  const onReportComment = () => {
    updateModal(
      `${item?.code}-report`,
      <ModalReport data={item} type="comment" />
    );
  };
  const onEditComment = () => {
    updateModal(`${item?.code}-edit`, <ModalEdit type="comment" data={item} />);
  };

  const onDeleteComment = () => {
    updateModal(
      `${item?.code}-report`,
      <ModalDelete handleEvent={onConfirmDeleteComment} />
    );
  };

  const onReply = () => {
    updateModal(
      `${item?.code}-reply`,
      <ModalCreateReplyComment type={type} code={codeReply} data={item} />
    );
  };

  const onConfirmDeleteComment = () => {
    postForumAPI(FORUM_API_EDIT_COMMENT, {
      code: item.code,
      content: item.contentMd,
      delete: "yes",
    })
      .then((r) => {
        toast.success("Xóa bình luận thành công");
        store.dispatch(deleteComment(item.code));
      })
      .catch((e) => {
        toast.error("Xóa bình luận thất bại");
      });
  };

  useSWR(FORUM_API_SUBCOMMENTS_LIST, getSubCommentsList, {
    revalidateIfStale: true,
    revalidateOnReconnect: false,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  useMount(() => {
    ws.current = new WebSocket(`${WEBSOKET_URL_COMMENT}/${item.code}`);
    ws.current.onopen = () => {};
    ws.current.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data) {
        const formatData = camelcaseKeys(data.data, { deep: true });
        if (refChild.current && childrenComments[item.code]) {
          store.dispatch(
            updateSubComments({
              [item.code]: [formatData, ...childrenComments[item.code]],
            })
          );
        } else setNumComments((prev) => prev + 1);
      }
    };
  });

  useUnmount(() => {
    return ws.current.close();
  });

  React.useEffect(() => {
    refChild.current = childrenComments[item.code];
    setSubComments(childrenComments[item.code] || []);
    if (childrenComments[item.code]?.length === 0) {
      setNumComments(0);
    }
  }, [childrenComments]);

  React.useEffect(() => {
    setSubComments(childrenComments[item.code] || []);
    setNumComments(item.numComments || 0);
    setSubListData({});
  }, [item]);

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
        }}
      >
        <Stack
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            p: 1,
          }}
          gap={0.5}
        >
          <Stack direction={"row"} gap={1}>
            <Stack flex={1} gap={0.5}>
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                <Stack flex={1} direction={"row"} gap={1} alignItems={"center"}>
                  <CustomLink
                    href={item.user.url}
                    className="link-hover text-sm font-bold truncate"
                  >
                    {item.user.name || item.user.username}
                  </CustomLink>
                  {item.user.isStaff && (
                    <Tooltip
                      role="tooltip"
                      title="Quản trị viên"
                      aria-label="Quản trị viên"
                      className="ml-2 text-blue-500 inline-flex"
                    >
                      <Box>
                        <WolfIcon width={14} height={14} />
                      </Box>
                    </Tooltip>
                  )}
                  {item.user.favoriteTeamIcon && (
                    <Tooltip
                      role="tooltip"
                      aria-label="avatar"
                      title={`Fan ${item.user.favoriteTeam}`}
                    >
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
                {type === "topic" &&
                  data.user.username === item.user.username && (
                    <Typography className="badge text-blue-600 bg-blue-600/40 border-0 text-2xs font-bold px-1">
                      Chủ thớt
                    </Typography>
                  )}
              </Stack>
            </Stack>
          </Stack>

          <Typography className="mx-2 text-sm">
            {HTMLReactParser(item.contentMd)}
          </Typography>

          {item.editedAt && (
            <Typography className="text-2xs text-gray-400 italic mx-2">
              (Đã chỉnh sửa)
            </Typography>
          )}

          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ pr: 0, color: theme.palette.text.secondary }}
            gap={1}
          >
            <LikeButtonComment item={item} />
            <IconButton onClick={onReply} aria-label="reply">
              <ReplyOutlinedIcon
                className="text-gray-400"
                sx={{ width: 16, height: 16 }}
              />
            </IconButton>
          </Stack>
          {numComments > 0 && subComments.length === 0 && (
            <Button
              onClick={loadSubComments}
              className="inline-flex w-fit items-center text-primary px-2 rounded hover:bg-green-200/20 active:bg-green-600 active:text-white"
            >
              <ArrowDropDownIcon />
              <b className="text-sm">
                {numberFormatter(numComments)} trả lời khác
              </b>
            </Button>
          )}
        </Stack>
        {loading && <CommentsListLoader />}
        {subComments.length > 0 && (
          <Stack gap={1} sx={{ mt: 1 }}>
            {subComments.map((subComment: any, key) => (
              <CommentSubItem
                key={key}
                item={subComment}
                data={data}
                type={type}
              />
            ))}
          </Stack>
        )}
        {subListData?.items?.length > 0 &&
          subListData.current < subListData.numPages && (
            <LoadMoreButton
              title="Tải thêm trả lời"
              loadMore={loadSubComments}
            />
          )}
      </Stack>
    </Stack>
  );
}

export default CommentItem;
