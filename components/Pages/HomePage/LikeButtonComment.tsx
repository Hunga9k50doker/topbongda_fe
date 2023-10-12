import React from "react";
import { postForumAPI } from "@/apis/forum_apis";
import { numberFormatter } from "@/utils";
import { toast } from "react-toastify";
import { Stack, Typography, IconButton } from "@mui/material";
import { FORUM_API_LIKE_COMMENT } from "@/configs/endpoints/forum_endpoints";
import { updateComment, updateSubComment } from "@/reducers/commentsSlice";
import { RootState, store } from "@/store";
import { useSelector } from "react-redux";
import { ItemCommentModel } from "@/models/comment_model";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import ModalAuth from "@/components/Modal/ModalAuth";

interface LikeButtonCommentProps {
  item: ItemCommentModel;
}
function LikeButtonComment({ item, ...props }: LikeButtonCommentProps) {
  const { updateModal } = React.useContext(ModalContext);
  const userStore = useSelector((state: RootState) => state.userStore.data);
  const [loading, setLoading] = React.useState(false);
  const [btnNumLikes, setBtnNumLikes] = React.useState(item.numLikes);
  const [btnLiked, setBtnLiked] = React.useState(false);
  const code = item.code;

  const onUpdateNumLikes = (item: ItemCommentModel) => {
    if (item?.parentCode || item?.parent?.code) {
      return store.dispatch(
        updateSubComment({
          ...item,
          numLikes: item.numLikes + 1,
          isLiked: true,
        })
      );
    }
    return store.dispatch(
      updateComment({ ...item, numLikes: item.numLikes + 1, isLiked: true })
    );
  };

  React.useEffect(() => {
    setBtnNumLikes(item.numLikes);
    setBtnLiked(item.isLiked);
  }, [item]);

  const handleLike = React.useCallback(() => {
    if (!userStore.isAuth) {
      updateModal(`modal-auth`, <ModalAuth />);
    } else {
      setLoading(true);
      const d = {
        code,
      };
      postForumAPI(FORUM_API_LIKE_COMMENT, d)
        .then((r) => {
          const d = r.data;
          if (d.ok) {
            toast.success("Thích bình luận thành công!");
            setBtnLiked(true);
            onUpdateNumLikes(item);
          } else {
            toast.error(d.msg);
          }
          setLoading(false);
        })
        .catch((reason) => {
          toast.error("Lỗi hệ thống!");
        })
        .finally(() => {
          setTimeout(() => setLoading(false));
        });
    }
  }, [item, userStore]);

  return (
    <Stack direction={"row"} alignItems={"center"}>
      {item.isLiked || btnLiked ? (
        <IconButton
          aria-label="Đã thích bài viết"
          onClick={handleLike}
          size="small"
          disabled
        >
          <ThumbUpIcon sx={{ py: 0, width: 16, height: 16 }} color="primary" />
          {btnNumLikes > 0 && (
            <Typography
              className="ml-1 text-gray-400 font-bold text-xs"
              color="text.secondary"
            >
              {numberFormatter(btnNumLikes)}
            </Typography>
          )}
        </IconButton>
      ) : (
        <IconButton
          aria-label="thích bài viết"
          onClick={handleLike}
          size="small"
          disabled={loading}
        >
          <ThumbUpIcon
            sx={{ py: 0, width: 16, height: 16 }}
            className="text-gray-400"
          />
          {btnNumLikes > 0 && (
            <Typography
              className="ml-1 text-gray-400 font-bold text-xs"
              color="text.secondary"
            >
              {numberFormatter(btnNumLikes)}
            </Typography>
          )}
        </IconButton>
      )}
    </Stack>
  );
}

export default LikeButtonComment;
