import React from "react";
import { useSelector } from "react-redux";
import WrapTitle from "@/components/common/WrapTitle";
import CardPost from "@/components/Cards/CardPost";
import { Box } from "@mui/material";
import { RootState, store } from "@/store";
import { updateLoading } from "@/reducers/loadingSlice";
import { toast } from "react-toastify";
import useSWR from "swr";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import { TopicDetailModel } from "@/models/topic_model";
import { getListSaveTopicAPI } from "@/apis/user_apis";
import { USER_API_GET_LIST_SAVED_TOPIC } from "@/configs/endpoints/user_endpoints";
import NoData from "@/components/common/NoData";
import { resetTopics, updateCollections } from "@/reducers/topicsSlice";
import { Select } from "antd";
import { getListBookmarkStoryAPI } from "@/apis/news_apis";
import { resetStories, updateStories } from "@/reducers/storiesSlice";
import CardBookmark from "@/components/Cards/CardBookmark";

const ITEMS_PER_PAGE = 10;

function MyCollections({}) {
  const { collections } = useSelector((state: RootState) => state.topicsStore);
  const { stories } = useSelector((state: RootState) => state.storiesStore);
  const { loading } = useSelector((state: RootState) => state.loadingStore);
  const [filter, setFilter] = React.useState("topic");
  const [pageData, setPageData] = React.useState({
    current: 0,
    hasNext: false,
  });

  useSWR(
    USER_API_GET_LIST_SAVED_TOPIC,
    () => {
      if (!Boolean(collections.items.length)) {
        return getTopics();
      }
    },
    {
      revalidateOnFocus: false,
    }
  );

  const getTopics = React.useCallback(
    (prs?: any) => {
      store.dispatch(updateLoading(true));
      getListSaveTopicAPI(
        prs || {
          page: pageData.current + 1,
          page_size: ITEMS_PER_PAGE,
        }
      )
        .then((r) => {
          store.dispatch(
            updateCollections({
              ...r.data,
              items: [...collections.items, ...r.data.items],
            })
          );
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        })
        .finally(() => {
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        });
    },
    [collections, pageData]
  );

  const getStories = React.useCallback(
    (prs?: any) => {
      store.dispatch(updateLoading(true));
      getListBookmarkStoryAPI(
        prs || {
          page: stories.current + 1,
          page_size: ITEMS_PER_PAGE,
        }
      )
        .then((r) => {
          store.dispatch(
            updateStories({
              ...r.data,
              data: [...stories.data, ...r.data.data],
            })
          );
        })
        .catch(() => {
          toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        })
        .finally(() => {
          setTimeout(() => store.dispatch(updateLoading(false)), 1000);
        });
    },
    [stories, pageData]
  );

  const handleFilter = (value: string) => {
    setFilter(value);
    setPageData({
      current: 0,
      hasNext: false,
    });
    if (value === "topic") {
      store.dispatch(resetStories());
      getTopics({
        page: 1,
        page_size: ITEMS_PER_PAGE,
      });
    } else {
      store.dispatch(resetTopics());
      getStories({
        page: 1,
        page_size: ITEMS_PER_PAGE,
      });
    }
  };

  React.useEffect(() => {
    setPageData(filter === "topic" ? collections : stories);
  }, [stories, collections]);

  return (
    <Box>
      <WrapTitle title="Bộ sưu tập của tôi">
        <Select
          defaultValue={"topic"}
          onChange={(value: string) => handleFilter(value)}
          options={[
            { value: "topic", label: "Bài viết(mặc định)" },
            { value: "new", label: "Tin tức" },
          ]}
        />
      </WrapTitle>
      {filter === "topic" && collections.items.length === 0 && !loading && (
        <NoData title="Bộ sưu tập trống" />
      )}
      {filter === "new" && stories.data.length === 0 && !loading && (
        <NoData title="Bộ sưu tập trống" />
      )}
      {filter === "topic" &&
        collections.items.map((item: TopicDetailModel, key) => (
          <CardPost key={key} data={item} />
        ))}
      {filter === "new" &&
        stories.data.map((item, key) => <CardBookmark key={key} item={item} />)}
      {pageData.hasNext ? (
        <LoadMoreButton
          loadMore={filter === "topic" ? getTopics : getStories}
          title="Tải thêm bài viết"
        />
      ) : (
        !loading &&
        (filter === "topic"
          ? collections.items.length > 0
          : stories.data.length > 0) && (
          <p className="text-xs text-center italic">~ hết danh sách ~</p>
        )
      )}
    </Box>
  );
}

export default React.memo(MyCollections);
