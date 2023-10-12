import * as React from "react";
import { ModalContext } from "@/context/ModalContext/ModalContext";
import { Chip, Skeleton, Stack, Typography } from "@mui/material";
import Marquee from "react-fast-marquee";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import CommentsDisabledOutlinedIcon from "@mui/icons-material/CommentsDisabledOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { Drawer } from "antd";
import CreateNewComment from "@/components/Pages/HomePage/CreateNewComment";
import { MatchDetailModel } from "@/models/match_model";
import { styled } from "@mui/material/styles";
import { useDebounce, useInterval } from "react-use";
import { useSWRConfig } from "swr";
import { FORUM_API_COMMENTS_LIST } from "@/configs/endpoints/forum_endpoints";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { ItemCommentModel } from "@/models/comment_model";
import AvatarCustom from "@/components/common/AvatarCustom";
import ModalCreateReplyComment from "@/components/Modal/ModalCreateReplyComment";
import { useTheme } from "@mui/material/styles";
import { getSubCommentsListAPI } from "@/apis/forum_apis";
import { updateSubComments } from "@/reducers/commentsSlice";
interface ModalVideoProps {
  url: string;
  matchDetail: MatchDetailModel;
}

export default React.memo(function ModalVideo({
  url,
  matchDetail,
}: ModalVideoProps) {
  const { isOpenModal, handleCloseModal, updateModal } =
    React.useContext(ModalContext);
  const { comments, childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );
  const theme: any = useTheme();
  const { mutate } = useSWRConfig();
  const embedId = url.split("=").pop();
  const ws = React.useRef<any>(null);
  const [isLoad, setIsLoad] = React.useState(true);
  const [isHidden, setIsHidden] = React.useState(false);
  const [openComment, setOpenComment] = React.useState(false);
  const [parentComment, setParentComment] = React.useState<ItemCommentModel>(
    comments[0]
  );
  const [subComments, setSubComments] = React.useState<ItemCommentModel[]>([]);
  const [isMountComment, setisMountComment] = React.useState(false);
  const [indexHasSubComments, setIndexHasSubComments] = React.useState(0);
  const showDrawer = () => {
    setOpenComment(true);
  };

  const onReply = (item: ItemCommentModel, childrenComment?: boolean) => {
    if (childrenComment) {
      const parent = comments.find(
        (c: ItemCommentModel) => c.code === item.parentCode
      );
      return updateModal(
        `modal-video-${item?.code}-reply`,
        <ModalCreateReplyComment
          type={"match"}
          code={matchDetail.code}
          data={parent}
          tooltip={true}
          tagUser={item.user}
        />
      );
    }
    return updateModal(
      `modal-video-${item?.code}-reply`,
      <ModalCreateReplyComment
        type={"match"}
        code={matchDetail.code}
        data={item}
      />
    );
  };

  const onClose = () => {
    setOpenComment(false);
  };

  const getSubCommentsList = React.useCallback(
    (prs?: any) => {
      const p = {
        parentCode: parentComment.code,
        sort: "NF",
        ...prs,
      };
      getSubCommentsListAPI(p)
        .then((r) => {
          store.dispatch(
            updateSubComments({ [parentComment.code]: r.data.items })
          );
        })
        .catch((e) => {})
        .finally(() => {
          const newIndex = comments.findIndex(
            (item: ItemCommentModel, index: number) =>
              item.numComments > 0 &&
              index > indexHasSubComments &&
              item.code !== parentComment.code
          );
          if (newIndex) {
            setIndexHasSubComments(newIndex);
            setParentComment(comments[newIndex]);
          }
        });
    },
    [parentComment]
  );

  useDebounce(() => {
    mutate(FORUM_API_COMMENTS_LIST);
  }, 5000);

  // useInterval(() => {
  //   mutate(FORUM_API_COMMENTS_LIST);
  // }, 1000 * 60 * 5);

  useDebounce(() => {
    setisMountComment(true);
  }, 10000);

  useInterval(() => {
    if (indexHasSubComments === -1) return;
    if (indexHasSubComments !== -1 && parentComment) getSubCommentsList();
  }, 12000);

  React.useEffect(() => {
    setTimeout(() => {
      return setIsLoad(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (childrenComments) {
      const newSubcomments: any = Object.values(childrenComments).reduce(
        (a: any, b) => a.concat(b),
        []
      );
      setSubComments(newSubcomments);
    }
  }, [childrenComments]);

  return (
    <Drawer
      open={isOpenModal}
      onClose={handleCloseModal}
      placement="bottom"
      height={"100vh"}
      style={{ marginTop: 40 }}
      headerStyle={{ padding: "auto 8px" }}
      bodyStyle={{ padding: "0 8px 80px 8px" }}
      title={
        <Typography className="text-center">
          {matchDetail.homeTeam.name} - {matchDetail.awayTeam.name}{" "}
        </Typography>
      }
    >
      {!isLoad ? (
        <iframe
          width="100%"
          height="240"
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      ) : (
        <Skeleton variant="rectangular" width={"100%"} height={240} />
      )}
      {isMountComment && Boolean(comments.length) && (
        <Stack
          gap={4}
          sx={{
            mt: 2,
            visibility: isHidden ? "hidden" : "visable",
            color: theme.palette.text.primary,
          }}
        >
          <Marquee
            autoFill={true}
            pauseOnClick={true}
            speed={45}
            style={{ overflowY: "hidden" }}
          >
            <Stack direction="row" gap={4} paddingRight={4}>
              {comments.map((comment: ItemCommentModel, key: number) => (
                <Chip
                  onClick={() => onReply(comment)}
                  key={key}
                  avatar={
                    <AvatarCustom
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      data={comment.user}
                    />
                  }
                  label={comment.contentMd}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Marquee>
          <Marquee
            autoFill={true}
            pauseOnClick={true}
            speed={45}
            style={{ overflowY: "hidden" }}
          >
            <Stack direction="row" gap={4} paddingRight={4}>
              {subComments.map((subComment: ItemCommentModel, key: number) => (
                <Chip
                  onClick={() => onReply(subComment, true)}
                  key={key}
                  avatar={
                    <AvatarCustom
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      data={subComment.user}
                    />
                  }
                  label={subComment.contentMd}
                  variant="outlined"
                />
              ))}
            </Stack>
          </Marquee>
        </Stack>
      )}
      <SpeedDial
        ariaLabel="SpeedDial live video playback"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          onClick={showDrawer}
          icon={<RateReviewOutlinedIcon />}
          tooltipTitle={"Bình luận"}
        />
        {isHidden ? (
          <SpeedDialAction
            onClick={() => setIsHidden(!isHidden)}
            icon={<CommentOutlinedIcon />}
            tooltipTitle={"Hiện bình luận"}
          />
        ) : (
          <SpeedDialAction
            onClick={() => setIsHidden(!isHidden)}
            icon={<CommentsDisabledOutlinedIcon />}
            tooltipTitle={"Ẩn bình luận"}
          />
        )}
      </SpeedDial>
      <Drawer
        title="Thêm bình luận"
        onClose={onClose}
        open={openComment}
        bodyStyle={{ paddingBottom: 80, paddingTop: 0 }}
        placement="bottom"
        zIndex={theme.zIndex.modal + 1}
      >
        <NewStyle>
          <CreateNewComment
            type={"match"}
            code={matchDetail.code}
            callBack={onClose}
          />
        </NewStyle>
      </Drawer>
    </Drawer>
  );
});

const NewStyle = styled("div")`
  .avatar_create_comment {
    display: none;
  }
  textarea {
    min-height: 120px !important;
  }
`;
