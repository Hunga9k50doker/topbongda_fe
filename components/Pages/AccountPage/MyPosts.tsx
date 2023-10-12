import React from "react";
import { useSelector } from "react-redux";
import CardPost from "@/components/Cards/CardPost";
import { Box } from "@mui/material";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import { toast } from "react-toastify";
import useSWR from "swr";
import { FORUM_API_NEW_TOPICS_LIST } from "@/configs/endpoints/forum_endpoints";
import { updateTopics } from "@/reducers/topicsSlice";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import { TopicDetailModel } from "@/models/topic_model";
import { getNewTopicsListAPI } from "@/apis/forum_apis";
import NoData from "@/components/common/NoData";

const ITEMS_PER_PAGE = 10;

function MyPosts({}) {
  const { topics } = useSelector((state: RootState) => state.topicsStore);
  const { loading } = useSelector((state: RootState) => state.loadingStore);
  const [pageData, setPageData] = React.useState({
    current: 0,
  });

  useSWR(
    FORUM_API_NEW_TOPICS_LIST,
    () => {
      if (!Boolean(topics.items.length)) {
        return getTopics();
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getTopics = React.useCallback(() => {
    store.dispatch(updateLoading(true));
    getNewTopicsListAPI({
      page: pageData.current + 1,
      self: "yes",
      page_size: ITEMS_PER_PAGE,
    })
      .then((r) => {
        store.dispatch(
          updateTopics({ ...r.data, items: [...topics.items, ...r.data.items] })
        );
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      })
      .finally(() => {
        setTimeout(() => store.dispatch(updateLoading(false)), 1000);
      });
  }, [topics.items]);

  React.useEffect(() => {
    setPageData(topics);
  }, [topics]);

  return (
    <Box>
      {topics.items.length === 0 && !loading && (
        <NoData title="Chưa có bài viết nào" />
      )}
      {topics.items.map((item: TopicDetailModel, key) => (
        <CardPost isViewPorifile={true} key={key} data={item} />
      ))}

      {topics.hasNext ? (
        <LoadMoreButton loadMore={getTopics} title="Tải thêm bài viết" />
      ) : (
        !loading &&
        topics.items.length > 0 && (
          <p className="text-xs text-center italic">~ hết danh sách ~</p>
        )
      )}
    </Box>
  );
}

export default React.memo(MyPosts);
