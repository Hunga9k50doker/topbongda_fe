import React from "react";
import { getTopicsListAPI } from "@/apis/forum_apis";
import CardPost from "@/components/Cards/CardPost";
import { TopicDetailModel, TopicDataModel } from "@/models/topic_model";
import { UserModel } from "@/models/user_model";
import { useSelector } from "react-redux";
import { RootState, store } from "@/store";
import { useEffectOnce, useUnmount } from "react-use";
import { resetTopics, updateTopics } from "@/reducers/topicsSlice";
import LoadMoreButton from "@/components/common/LoadMoreButton";
import NoData from "@/components/common/NoData";
import { HomeCardLoader } from "@/loaders";

const ITEMS_PER_PAGE = 10;

interface UserTopicsListProps {
  userCode: string;
  topicsData: TopicDataModel;
}

function UserTopicsList({
  userCode,
  topicsData,
  ...props
}: UserTopicsListProps) {
  const { topics, isLoading } = useSelector(
    (state: RootState) => state.topicsStore
  );

  const handleLoadMore = () => {
    getTopics();
  };
  const getTopics = React.useCallback(() => {
    const p = {
      userCode,
      page_size: ITEMS_PER_PAGE,
      page: topics.current + 1,
    };
    getTopicsListAPI(p)
      .then((r) => {
        store.dispatch(
          updateTopics({
            ...r.data,
            items: [...topics.items, ...r.data.items],
          })
        );
      })
      .catch((e) => {});
  }, [topics]);

  useEffectOnce(() => {
    if (!Boolean(topics.items.length)) store.dispatch(updateTopics(topicsData));
  });

  useUnmount(() => {
    store.dispatch(resetTopics());
  });

  return (
    <>
      {isLoading && <HomeCardLoader />}
      {topics.items.length === 0 && !isLoading && (
        <NoData title="Chưa có bài viết nào" />
      )}
      {topics?.items?.length > 0 &&
        !isLoading &&
        topics.items.map((item: TopicDetailModel, key) => (
          <CardPost
            isViewPorifile={true}
            isShowFolows={false}
            key={key}
            data={item}
          />
        ))}
      {topics.hasNext ? (
        <LoadMoreButton loadMore={handleLoadMore} title="Tải thêm bài viết" />
      ) : (
        !isLoading &&
        topics.items.length > 0 && (
          <p className="text-xs w-full text-center italic">~ hết danh sách ~</p>
        )
      )}
    </>
  );
}

export default React.memo(UserTopicsList);
