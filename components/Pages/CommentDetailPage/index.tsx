"use client";
import React from "react";
import { ItemCommentModel } from "@/models/comment_model";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Stack,
  Divider,
  Box,
  IconButton,
  FormControl,
  Select,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CustomLink from "@/components/common/CustomLink";
import { formatDate, getFromNowSmart, handleAfterCopy } from "@/utils";
import HTMLReactParser from "html-react-parser";
import ParagraphSmall from "@/components/common/Text/ParagraphSmall";
import AvatarCustom from "@/components/common/AvatarCustom";
import ChipLevel from "@/components/Chips/ChipLevel";
import ListTrophies from "@/components/common/ListTrophies";
import ParagraphBold from "@/components/common/Text/ParagraphBold";
import { MenuItem } from "@mui/material";
import { getSubCommentsListAPI, postForumAPI } from "@/apis/forum_apis";
import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import { toast } from "react-toastify";
import PopoverCustom from "@/components/common/PopoverCustom";
import CopyToClipboard from "react-copy-to-clipboard";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { numberFormatter } from "@/utils";
import {
  AiOutlineCopy,
  AiOutlineFlag,
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineRollback,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import ModalDelete from "@/components/Modal/ModalDelete";
import { FORUM_API_EDIT_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { WEBSOKET_URL_COMMENT } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffectOnce, useMount, useSearchParam, useUnmount } from "react-use";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import BreadCrumbCustom from "@/components/common/BreadCrumbCustom";
import Link from "next/link";
import ModalAuth from "@/components/Modal/ModalAuth";
import ModalReport from "@/components/Modal/ModalReport";
import ModalCreateReplyComment from "@/components/Modal/ModalCreateReplyComment";
import LikeButtonComment from "@/components/Pages/HomePage/LikeButtonComment";
import CircularProgress from "@mui/material/CircularProgress";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import { Empty } from "antd";
import WrapTitle from "@/components/common/WrapTitle";
import CommentSubItem from "@/components/Pages/CommentDetailPage/SubComment";
import {
  resetComments,
  updateComments,
  updateSubComments,
} from "@/reducers/commentsSlice";
import camelcaseKeys from "camelcase-keys";

interface CommentDetailPageProps {
  commentDetail: ItemCommentModel;
}

function CommentDetailPage({ commentDetail }: CommentDetailPageProps) {
  const breadcrumbs = [
    {
      label: commentDetail.topic.category,
      href: commentDetail.topic.categoryUrl,
    },
    {
      label:
        commentDetail.topic.title || `Bài viết #${commentDetail.topic.code}`,
      href: commentDetail.topic.url,
    },
    {
      label: `Bình luận #${commentDetail.code}`,
    },
  ];
  const sort = useSearchParam("sort");
  const ws = React.useRef<any>(null);
  const refChild = React.useRef<any>(null);
  const theme: any = useTheme();
  const { updateModal } = React.useContext(ModalContext);
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [subCommentsData, setSubCommentsData] = React.useState<any>({});
  const [items, setItems] = React.useState<any>([]);
  const { user } = commentDetail;
  const type = commentDetail.topic ? "topic" : "match";
  const { childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );

  useEffectOnce(() => {
    setLoading(true);
    getSubCommentsListAPI({ parentCode: commentDetail.code, sort: sort })
      .then((r) => {
        setItems(r.data.items);
        setSubCommentsData(r.data);
        setLoading(false);
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 5000);
      });
  });

  const onReply = () => {
    const type = commentDetail.topic ? "topic" : "match";
    updateModal(
      `${commentDetail?.code}-reply`,
      <ModalCreateReplyComment
        type={type}
        code={commentDetail?.topic?.code || commentDetail?.match?.code}
        data={commentDetail}
      />
    );
  };
  const onEdit = () => {
    router.push(`/binh-luan/${commentDetail.code}/bien-tap`);
  };
  const onDelete = () => {
    updateModal(
      `${commentDetail.code}-delete`,
      <ModalDelete handleEvent={onConfirmDeleteComment} />
    );
  };

  const onReport = () => {
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    updateModal(
      `${commentDetail.code}-report`,
      <ModalReport data={commentDetail} type="comment" />
    );
  };
  const onBack = () => {
    router.push(commentDetail?.topic?.url || commentDetail?.match?.url);
  };

  const isOwner = React.useMemo(() => {
    return userStore.username === user.username;
  }, [commentDetail, userStore]);

  const onConfirmDeleteComment = () => {
    postForumAPI(FORUM_API_EDIT_COMMENT, {
      code: commentDetail.code,
      content: commentDetail.contentMd,
      delete: "yes",
    })
      .then((r) => {
        toast.success("Xóa bình luận thành công");
        router.push(commentDetail?.topic?.url || commentDetail?.match?.url);
      })
      .catch((e) => {
        toast.error("Xóa bình luận thất bại");
      });
  };

  const handleFilter = (e: any) => {
    router.push(`${window.location.pathname}/?sort=${e.target.value}`);
  };

  useEffectOnce(() => {
    setLoading(true);
    getSubCommentsListAPI({ parentCode: commentDetail.code, sort: sort })
      .then((r) => {
        store.dispatch(
          updateSubComments({ [commentDetail.code]: r.data.items })
        );
        setSubCommentsData(r.data);
        setLoading(false);
      })
      .catch((e) => {})
      .finally(() => {
        setTimeout(() => setLoading(false), 5000);
      });
  });

  const handleLoadMore = () => {
    setLoading(true);
    const p = {
      page: subCommentsData.current + 1,
      parentCode: commentDetail.code,
      sort: sort,
    };
    getSubCommentsListAPI(p)
      .then((r) => {
        setSubCommentsData(r.data);
        store.dispatch(updateComments([...items, ...r.data.items]));
      })
      .catch((e) => {})
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    refChild.current = childrenComments[commentDetail.code];
    if (childrenComments[commentDetail.code]?.length > 0) {
      setItems(childrenComments[commentDetail.code]);
    }
  }, [childrenComments]);

  useMount(() => {
    ws.current = new WebSocket(`${WEBSOKET_URL_COMMENT}/${commentDetail.code}`);
    ws.current.onopen = () => {};
    ws.current.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data) {
        const formatData = camelcaseKeys(data.data, { deep: true });
        if (refChild.current && childrenComments[commentDetail.code]) {
          store.dispatch(
            updateSubComments({
              [commentDetail.code]: [
                formatData,
                ...childrenComments?.[commentDetail.code],
              ],
            })
          );
        }
      }
    };
  });

  useUnmount(() => {
    ws.current.close();
    store.dispatch(resetComments());
  });

  return (
    <>
      <BreadCrumbCustom data={breadcrumbs} />
      <Card
        sx={{
          width: "100vw",
          maxWidth: "100vw",
          overflowX: "hidden",
          boxShadow: `0 1px 4px ${theme.palette.custom.boxShadow}`,
        }}
      >
        <CardHeader
          avatar={
            <CustomLink href={user.url}>
              <AvatarCustom data={user} />
            </CustomLink>
          }
          color="text.primary"
          sx={{
            fontWeight: 600,
            p: 1,
            "& .MuiCardHeader-avatar": {
              marginRight: "8px",
            },
          }}
          titleTypographyProps={{
            variant: "h6",
            component: CustomLink,
            href: user.url,
            fontSize: 14,
          }}
          subheaderTypographyProps={{ fontSize: 12 }}
          title={
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <Typography component={"h1"}>{user.name}</Typography>
              <ListTrophies data={user} style={{ width: 16, height: 16 }} />
            </Stack>
          }
          subheader={
            <Stack direction={"row"} alignItems={"center"} gap={0.5}>
              <ChipLevel data={user} />
              <FiberManualRecordIcon sx={{ width: 8, height: 8 }} />
              <ParagraphSmall variant="body2" color="text.secondary">
                {getFromNowSmart(commentDetail.createdAt)}&nbsp;
                {commentDetail.editedAt && "(Đã chỉnh sửa)"}
              </ParagraphSmall>
            </Stack>
          }
        />
        <Divider />

        <CardContent sx={{ pb: 1, pt: 0, px: 1 }}>
          {HTMLReactParser(commentDetail.contentSafe || "")}
          {commentDetail.editedAt && (
            <>
              {commentDetail.editedByUsername ? (
                <div className="text-xs text-gray-400 italic">
                  Chỉnh sửa lúc {formatDate(commentDetail.editedAt)} bởi{" "}
                  <a href={commentDetail.editedByUrl} className="link-hover">
                    {commentDetail.editedByUsername}
                  </a>
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic">
                  Chỉnh sửa lúc {formatDate(commentDetail.editedAt)}
                </div>
              )}
            </>
          )}
        </CardContent>
        <Divider sx={{ mx: 2 }} />
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          sx={{ gap: 2, color: theme.palette.text.secondary, py: 1 }}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <LikeButtonComment item={commentDetail} />
          </Stack>
          {commentDetail.parent ? (
            <Stack direction={"row"} alignItems={"center"} gap={0.5}>
              <IconButton size="small" onClick={onBack} aria-label="comment">
                <ReplyOutlinedIcon
                  className="text-gray-400"
                  sx={{ width: 20, height: 20 }}
                />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction={"row"} alignItems={"center"} gap={0.5}>
              <IconButton size="small" onClick={onReply} aria-label="comment">
                <ReplyOutlinedIcon
                  className="text-gray-400"
                  sx={{ width: 20, height: 20 }}
                />
                <ParagraphBold className="text-gray-400" variant="body1">
                  {Boolean(items.length) && numberFormatter(items.length)}
                </ParagraphBold>
              </IconButton>
            </Stack>
          )}
          <Stack direction={"row"} alignItems={"center"} gap={0.5}>
            <PopoverCustom
              size="large"
              icon={
                <HiOutlineEllipsisVertical
                  fontSize={20}
                  color={theme.palette.text.primary}
                />
              }
            >
              {commentDetail.topic && (
                <MenuItem LinkComponent={Link} href={commentDetail.topic.url}>
                  <AiOutlineRollback />
                  <Typography className="text-sm ml-2">
                    Trở lại bài viết
                  </Typography>
                </MenuItem>
              )}
              {commentDetail.match && (
                <MenuItem LinkComponent={Link} href={commentDetail.match.url}>
                  <AiOutlineRollback />
                  <Typography className="text-sm ml-2">
                    Trở lại trận đấu
                  </Typography>
                </MenuItem>
              )}
              {commentDetail.story && (
                <MenuItem LinkComponent={Link} href={commentDetail.story.url}>
                  <AiOutlineRollback />
                  <Typography className="text-sm ml-2">
                    Trở lại tin bóng đá
                  </Typography>
                </MenuItem>
              )}

              {commentDetail.parent && (
                <MenuItem LinkComponent={Link} href={commentDetail.parent.url}>
                  <AiOutlineRollback />
                  <Typography className="text-sm ml-2">
                    Đi đến bình luận mẹ
                  </Typography>
                </MenuItem>
              )}
              {isOwner && (
                <>
                  <MenuItem onClick={onEdit}>
                    <AiOutlineEdit />
                    <Typography className="text-sm ml-2">
                      Chỉnh sửa bình luận
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={onDelete}>
                    <AiOutlineDelete />
                    <Typography className="text-sm ml-2">
                      Xóa bình luận
                    </Typography>
                  </MenuItem>
                </>
              )}
              <CopyToClipboard
                text={commentDetail.fullUrl}
                onCopy={handleAfterCopy}
              >
                <MenuItem>
                  <AiOutlineCopy />
                  <Typography className="text-sm ml-2">
                    Sao chép liên kết bình luận
                  </Typography>
                </MenuItem>
              </CopyToClipboard>
              {!isOwner && (
                <MenuItem onClick={onReport}>
                  <AiOutlineFlag />
                  <Typography className="text-sm ml-2">
                    Báo cáo bình luận
                  </Typography>
                </MenuItem>
              )}
            </PopoverCustom>
          </Stack>
        </Stack>
      </Card>

      {subCommentsData?.items?.length > 0 && (
        <>
          <WrapTitle
            title={`Bình luận ${
              items.length > 0 ? "(" + numberFormatter(items.length) + ")" : ""
            }`}
          />
          <Box sx={{ px: 1, mb: 4 }}>
            <FormControl className="option-sort">
              <Select
                sx={{
                  "&::before": {
                    border: "unset !important",
                  },
                }}
                variant="standard"
                onChange={handleFilter}
                autoWidth
                value={sort || "NF"}
              >
                <MenuItem value={"NF"}>Mới lên trước (mặc định)</MenuItem>
                <MenuItem value={"ML"}>Nhiều lượt thích lên trước</MenuItem>
                <MenuItem value={"OF"}>Cũ lên trước</MenuItem>
              </Select>
            </FormControl>
            <Divider />
            {items.length === 0 && (
              <Empty
                description={
                  <p className="text-gray-400">
                    Hãy là người bình luận đầu tiên!
                  </p>
                }
              />
            )}
            {items.length > 0 && (
              <Stack gap={1} mt={1}>
                {items.map((item: any, key: any) => (
                  <CommentSubItem
                    key={key}
                    item={item}
                    type={type}
                    data={commentDetail.topic || commentDetail.match}
                  />
                ))}
              </Stack>
            )}
            {loading && (
              <div className="flex items-center space-x-2 text-primary text-xs font-bold">
                <CircularProgress
                  aria-busy={loading}
                  aria-describedby="loading-progress"
                  color="primary"
                  size={20}
                />
                <span>Đang tải...</span>
              </div>
            )}
            {subCommentsData.current < subCommentsData.numPages && (
              <LoadMoreButton
                loadMore={handleLoadMore}
                title="Tải thêm bình luận"
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default CommentDetailPage;
