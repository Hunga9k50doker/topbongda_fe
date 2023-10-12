"use client";
import React from "react";
import CreateNewComment from "@/components/Pages/HomePage/CreateNewComment";
import { getCommentsListAPI } from "@/apis/forum_apis";
import CommentItem from "@/components/common/CommentItem";
import { useRouter, useSearchParams } from "next/navigation";
import { Element, scroller } from "react-scroll";
import { CommentsListLoader } from "@/loaders";
import {
  Box,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ItemCommentModel } from "@/models/comment_model";
import { RootState, store } from "@/store";
import { resetComments, updateComments } from "@/reducers/commentsSlice";
import {
  WEBSOKET_URL_MATCH,
  WEBSOKET_URL_STORY,
  WEBSOKET_URL_TOPIC,
} from "@/constants";
import { useMount, useUnmount } from "react-use";
import camelcaseKeys from "camelcase-keys";
import { useSelector } from "react-redux";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import useSWR, { useSWRConfig } from "swr";
import { FORUM_API_COMMENTS_LIST } from "@/configs/endpoints/forum_endpoints";
import { Empty } from "antd";
import WrapTitle from "@/components/common/WrapTitle";
import { numberFormatter } from "@/utils";

interface WrapCommentsProps {
  type: "topic" | "story" | "match";
  code: string;
  data: any; // matchDetail, storyDetail, topicDetail
  codeSlug?: any;
}

function WrapComments({
  type = "topic",
  code,
  data,
  codeSlug,
  ...props
}: WrapCommentsProps) {
  const { comments, childrenComments } = useSelector(
    (state: RootState) => state.commentsStore
  );
  const router = useRouter();
  const search = useSearchParams();
  const sortQuery = search.get("sort") || "";
  const { mutate } = useSWRConfig();
  const ws = React.useRef<any>(null);
  const [items, setItems] = React.useState<ItemCommentModel[]>(comments);
  const [commentsListData, setCommentsListData] = React.useState<any>({});
  const [loadingComments, setLoadingComments] = React.useState(true);
  const [newComment, setNewComment] = React.useState(null);
  const options = React.useMemo(() => {
    switch (type) {
      case "topic":
        return {
          endPoint: `${WEBSOKET_URL_TOPIC}/${data.code}`,
          params: {
            code: data.code,
            sort: sortQuery === "" ? "NF" : sortQuery,
          },
        };
      case "story":
        return {
          endPoint: `${WEBSOKET_URL_STORY}/${data.code}`,
          params: {
            story_code: data.code,
            sort: sortQuery === "" ? "NF" : sortQuery,
          },
        };
      case "match":
        return {
          endPoint: `${WEBSOKET_URL_MATCH}/${data.code}`,
          params: {
            match_code: data.code,
            sort: sortQuery === "" ? "NF" : sortQuery,
          },
        };
      default:
        return {
          endPoint: `${WEBSOKET_URL_TOPIC}/${data.code}`,
          params: {
            code: data.code,
            sort: sortQuery === "" ? "NF" : sortQuery,
          },
        };
    }
  }, [type, sortQuery]);

  useSWR(
    FORUM_API_COMMENTS_LIST,
    () => {
      getCommentsListAPI(options.params)
        .then((r) => {
          setCommentsListData(r.data);
          store.dispatch(updateComments(r.data.items));
        })
        .catch((e) => {
          setLoadingComments(false);
        })
        .finally(() => setLoadingComments(false));
    },
    {
      // revalidateOnFocus: false,
    }
  );

  const handleLoadMore = React.useCallback(() => {
    getCommentsListAPI({
      ...options.params,
      page: commentsListData.current + 1,
    })
      .then((r) => {
        setCommentsListData(r.data);
        store.dispatch(updateComments([...items, ...r.data.items]));
      })
      .catch((e) => {});
  }, [commentsListData, options, items]);

  const handleFilter = (e: any) => {
    router.push(`${window.location.pathname}/?sort=${e.target.value}`);
  };

  React.useEffect(() => {
    if (sortQuery) {
      scroller.scrollTo("WrapComments", {
        duration: 800,
        delay: 100,
        smooth: true,
        offset: -50,
      });
      mutate(FORUM_API_COMMENTS_LIST);
    }
  }, [sortQuery]);

  React.useEffect(() => {
    const newcomments = comments.filter(
      (c: ItemCommentModel) => !c?.parentCode
    );
    setItems(newcomments);
  }, [comments]);

  React.useEffect(() => {
    if (newComment) {
      store.dispatch(updateComments([newComment, ...comments]));
    }
  }, [newComment]);

  useMount(() => {
    ws.current = new WebSocket(`${options.endPoint}`);
    ws.current.onopen = () => {};
    ws.current.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data) {
        const formatData = camelcaseKeys(data.data, { deep: true });
        setNewComment({ ...formatData });
      }
    };
  });

  useUnmount(() => {
    ws.current.close();
    store.dispatch(resetComments());
  });

  return (
    <Element name="WrapComments">
      <WrapTitle
        title={`Bình luận ${
          data.numComments > 0
            ? "(" + numberFormatter(data.numComments) + ")"
            : ""
        }`}
      />
      {items.length === 0 && loadingComments && <CommentsListLoader />}
      {!loadingComments && (
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
              value={sortQuery || "NF"}
            >
              <MenuItem value={"NF"}>Mới lên trước (mặc định)</MenuItem>
              <MenuItem value={"ML"}>Nhiều lượt thích lên trước</MenuItem>
              <MenuItem value={"OF"}>Cũ lên trước</MenuItem>
            </Select>
          </FormControl>
          <Divider />
          <CreateNewComment type={type} code={data.code} />
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
            <Stack gap={1}>
              {items.map((item: any, key) => (
                <CommentItem key={key} item={item} type={type} data={data} />
              ))}
            </Stack>
          )}
          {commentsListData.current < commentsListData.numPages && (
            <LoadMoreButton
              loadMore={handleLoadMore}
              title="Tải thêm bình luận"
            />
          )}
        </Box>
      )}
    </Element>
  );
}

export default WrapComments;
