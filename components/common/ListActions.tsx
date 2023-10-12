import * as React from "react";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Stack, MenuItem } from "@mui/material";
import { TopicDetailModel } from "@/models/topic_model";
import { buildFullUrl } from "@/utils";
import { postForumAPI } from "@/apis/forum_apis";
import ParagraphBold from "@/components/common/Text/ParagraphBold";
import { FaRegComments } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEllipsisVertical } from "react-icons/hi2";
import { RiShareForward2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import PopoverCustom from "@/components/common/PopoverCustom";
import CopyToClipboard from "react-copy-to-clipboard";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { numberFormatter } from "@/utils";
import {
  AiOutlineCopy,
  AiOutlineFlag,
  AiOutlineShareAlt,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsBookmarkPlus, BsBookmarkDash } from "react-icons/bs";
import ModalShare from "@/components/Modal/ModalShare";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import ModalDelete from "@/components/Modal/ModalDelete";
import {
  FORUM_API_EDIT_TOPIC,
  FORUM_API_LIKE_TOPIC,
} from "@/configs/endpoints/forum_endpoints";
import {
  deleteTopic,
  updatePopularTopics,
  updateTopicCurrent,
  updateTopics,
  updateNewTopics,
  updateRelatedTopics,
  updateRelatedNews,
  updateCollections,
} from "@/reducers/topicsSlice";
import { useRouter, usePathname, useParams } from "next/navigation";
import { updateUser } from "@/reducers/userSlice";
import { updateLoading } from "@/reducers/loadingSlice";
import ModalAuth from "@/components/Modal/ModalAuth";
import CircularProgress from "@mui/material/CircularProgress";
import { StoryDetailModel } from "@/models/new_model";
import ModalComment from "@/components/Modal/ModalComment";
import { useUnmount } from "react-use";
import { saveTopicAPI } from "@/apis/user_apis";
import ModalReport from "@/components/Modal/ModalReport";
interface ListActionsProps {
  data: TopicDetailModel;
  type: "topic" | "match" | "news";
  isViewDetail?: boolean;
}

export default React.memo(function ListActions({
  data,
  type = "topic",
  isViewDetail = false,
}: ListActionsProps) {
  const { updateModal, handleCloseModal } = React.useContext(ModalContext);
  const { topics, popularTopics, newTopics, news, relatedTopics, collections } =
    useSelector((state: RootState) => state.topicsStore);
  const pathname = usePathname();
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const router = useRouter();
  const [btnNumLikes, setBtnNumLikes] = React.useState(data.numLikes || 0);
  const [btnLiked, setBtnLiked] = React.useState(data.isLiked || false);
  const [isSave, setIsSave] = React.useState(data.isSaved || false);
  const [loading, setLoading] = React.useState(false);
  const theme: any = useTheme();
  const { user } = data;
  const { codeSlug } = useParams();

  const handleUpdateLikeTopicStore = React.useCallback(
    (code: string) => {
      const resTopics = topics.items.map((item: TopicDetailModel) =>
        item.code === code
          ? { ...item, isLiked: true, numLikes: item.numLikes + 1 }
          : item
      );
      const resPopularTopics = popularTopics.items.map(
        (item: TopicDetailModel) => {
          if (item.code === code) {
            return { ...item, isLiked: true, numLikes: item.numLikes + 1 };
          } else if (item?.topic?.code === code) {
            return {
              ...item,
              topic: {
                ...item.topic,
                isLiked: true,
                numLikes: item.numLikes + 1,
              },
            };
          } else {
            return item;
          }
        }
      );
      const resNewTopics = newTopics.items.map((item: TopicDetailModel) =>
        item.code === code
          ? { ...item, isLiked: true, numLikes: item.numLikes + 1 }
          : item
      );
      const resRelatedTopics = relatedTopics.items.map(
        (item: TopicDetailModel) =>
          item.code === code
            ? { ...item, isLiked: true, numLikes: item.numLikes + 1 }
            : item
      );
      const resNews = news.items.map((item: StoryDetailModel) =>
        item.code === code
          ? { ...item, isLiked: true, numLikes: item.numLikes + 1 }
          : item
      );
      const resCollections = collections.items.map((item: StoryDetailModel) =>
        item.code === code
          ? { ...item, isLiked: true, numLikes: item.numLikes + 1 }
          : item
      );
      store.dispatch(updateTopics({ ...topics, items: resTopics }));
      store.dispatch(
        updatePopularTopics({ ...popularTopics, items: resPopularTopics })
      );
      store.dispatch(updateNewTopics({ ...newTopics, items: resNewTopics }));
      store.dispatch(
        updateRelatedTopics({ ...relatedTopics, items: resRelatedTopics })
      );
      store.dispatch(updateRelatedNews({ ...news, items: resNews }));
      store.dispatch(
        updateCollections({ ...collections, items: resCollections })
      );
    },
    [topics, popularTopics, newTopics, relatedTopics, news, collections]
  );

  const handleLike = React.useCallback(() => {
    const d = { code: data.code };
    if (!userStore.isAuth) {
      updateModal(`modal-auth`, <ModalAuth />);
    } else {
      setLoading(true);
      postForumAPI(FORUM_API_LIKE_TOPIC, d)
        .then((r) => {
          const d = r.data;
          if (d.ok) {
            setBtnNumLikes(d.numLikes);
            setBtnLiked(true);
            toast.success("Thích bài viết thành công");
            handleUpdateLikeTopicStore(data.code);
          } else {
            toast.error(d.msg);
          }
        })
        .finally(() => {
          setLoading(false);
        })
        .catch((reason) => {
          if (reason.response.status === 403) {
            toast.error("Chức năng đòi hỏi đăng nhập!");
          }
          setLoading(false);
        });
    }
  }, [data, userStore]);

  const onShare = () => {
    updateModal(`${data.code}-share`, <ModalShare data={data} />);
  };

  const onComment = () => {
    updateModal(`${data.code}-comment`, <ModalComment data={data} />);
  };

  const onReport = () => {
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    updateModal(`${data.code}-report`, <ModalReport data={data} type="post" />);
  };

  const onDelete = () => {
    updateModal(
      `${data.code}-delete`,
      <ModalDelete handleEvent={onConfirmDeleteTopic} />
    );
  };

  const onEdit = () => {
    store.dispatch(updateTopicCurrent(data));
    router.push(`/bai-viet/${data.code}/bien-tap`);
  };

  const onSave = (isUnSave?: string) => {
    if (!userStore.isAuth) {
      return updateModal(`modal-auth`, <ModalAuth />);
    }
    saveTopicAPI({
      topic_code: data.code,
      is_remove: isUnSave,
    })
      .then((r) => {
        if (r.data.ok) {
          toast.success(r.data.msg);
          setIsSave(!isSave);
          const resTopics = topics.items.map((item: TopicDetailModel) =>
            item.code === data.code ? { ...item, isSaved: !isSave } : item
          );
          if (isSave) {
            const resCollections = collections.items.filter(
              (item: TopicDetailModel) => item.code !== data.code
            );
            store.dispatch(
              updateCollections({ ...collections, items: resCollections })
            );
          } else {
            store.dispatch(
              updateCollections({
                ...collections,
                items: [...collections.items, { ...data, isSaved: true }],
              })
            );
          }
          store.dispatch(updateTopics({ ...topics, items: resTopics }));
        } else toast.warning(r.data.msg);
      })
      .catch((e) => {
        toast.error("Đã xảy ra lỗi");
      });
  };

  const onCopy = () => {
    toast.success("Đã copy liên kết!");
  };

  const onConfirmDeleteTopic = () => {
    store.dispatch(updateLoading(true));
    const isTopicDetailPage =
      window.location.pathname.split("/")[1] === "bai-viet";
    postForumAPI(FORUM_API_EDIT_TOPIC, {
      code_slug: data.code,
      content_md: data.contentSafe,
      title: data.title,
      delete: "yes",
    })
      .then((r) => {
        if (r.data.ok) {
          toast.success("Xóa bài viết thành công");
          store.dispatch(deleteTopic(data.code || data.topic.code));
          store.dispatch(
            updateUser({ ...userStore, numTopics: userStore.numTopics - 1 })
          );
          if (isTopicDetailPage) router.push(r.data.redirectUrl);
        } else {
          toast.warn(r.data.msg);
        }
      })
      .catch((e) => {
        toast.error("Xóa bài viết thất bại");
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      })
      .finally(() => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  };

  useUnmount(() => {
    handleCloseModal();
  });

  const isOwner = React.useMemo(() => {
    if (type !== "topic") return false;
    return userStore.username === user.username;
  }, [data, userStore]);

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-around"}
      sx={{ gap: 2, color: theme.palette.text.secondary, py: 1 }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {loading ? (
          <CircularProgress
            aria-busy={loading}
            aria-describedby="loading-progress"
            color="primary"
            size={16}
          />
        ) : (
          <>
            {btnLiked ? (
              <IconButton size="small" disabled aria-label="like">
                <ThumbUpIcon sx={{ pr: 0 }} fontSize="small" color="primary" />
              </IconButton>
            ) : (
              <IconButton
                size="small"
                onClick={handleLike}
                aria-label="dislike"
              >
                <ThumbUpOutlinedIcon sx={{ pr: 0 }} fontSize="small" />
              </IconButton>
            )}
          </>
        )}

        <ParagraphBold variant="body1">
          {Boolean(btnNumLikes) && numberFormatter(btnNumLikes)}
        </ParagraphBold>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <IconButton
          size="small"
          onClick={onComment}
          disabled={isViewDetail}
          aria-label="comment"
        >
          <FaRegComments fontSize={20} />
        </IconButton>
        <ParagraphBold variant="body1">
          {Boolean(data.numComments) && numberFormatter(data.numComments)}
        </ParagraphBold>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <IconButton size="small" disabled={true} aria-label="share">
          <RiShareForward2Line fontSize={20} />
        </IconButton>
        <ParagraphBold variant="body1">
          {Boolean(0) && numberFormatter(0)}
        </ParagraphBold>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} gap={0.5}>
        <IconButton size="small" disabled={true} aria-label="view">
          <HiOutlineEye fontSize={20} />
        </IconButton>
        <ParagraphBold variant="body1">
          {Boolean(data.numViews) && numberFormatter(data.numViews)}
        </ParagraphBold>
      </Stack>
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
          {isOwner && (
            <>
              <MenuItem onClick={onEdit}>
                <AiOutlineEdit />
                <Typography className="text-sm ml-2">
                  Chỉnh sửa bài viết
                </Typography>
              </MenuItem>
              <MenuItem onClick={onDelete}>
                <AiOutlineDelete />
                <Typography className="text-sm ml-2">Xóa bài viết</Typography>
              </MenuItem>
            </>
          )}
          <CopyToClipboard
            text={data.fullUrl || buildFullUrl(data.url)}
            onCopy={onCopy}
          >
            <MenuItem>
              <AiOutlineCopy />
              <Typography className="text-sm ml-2">
                Sao chép liên kết bài viết
              </Typography>
            </MenuItem>
          </CopyToClipboard>
          {!isSave ? (
            <MenuItem onClick={() => onSave()}>
              <BsBookmarkPlus />
              <Typography className="text-sm ml-2">Lưu bài viết</Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={() => onSave("yes")}>
              <BsBookmarkDash />
              <Typography className="text-sm ml-2">Bỏ lưu bài viết</Typography>
            </MenuItem>
          )}
          {!isOwner && (
            <MenuItem onClick={onReport}>
              <AiOutlineFlag />
              <Typography className="text-sm ml-2">Báo cáo bài viết</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={onShare}>
            <AiOutlineShareAlt />
            <Typography className="text-sm ml-2">Chia sẻ bài viết</Typography>
          </MenuItem>
        </PopoverCustom>
      </Stack>
    </Stack>
  );
});
