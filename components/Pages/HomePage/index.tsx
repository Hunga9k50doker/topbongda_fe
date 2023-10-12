"use client";
import React from "react";
import Topics from "@/components/Pages/HomePage/Topics";
import { HOME_TABS } from "@/configs/constants";
import NewTopics from "@/components/Pages/HomePage/NewTopics";
import { TopicDataModel } from "@/models/topic_model";
import { Box } from "@mui/material";
import WrapTitle from "@/components/common/WrapTitle";
import { useParams } from "next/navigation";
import Header from "@/components/Pages/HomePage/Header";
import { MatchDetailModel } from "@/models/match_model";
import { updateNewTopics, updatePopularTopics } from "@/reducers/topicsSlice";
import { RootState, store } from "@/store";
import { useSelector } from "react-redux";

interface HomePageProps {
  topTopicsData?: TopicDataModel;
  newTopicsData?: TopicDataModel;
  matchHeadLines: MatchDetailModel[];
}

const HomePage = ({
  topTopicsData,
  newTopicsData,
  matchHeadLines,
}: HomePageProps) => {
  const { popularTopics, newTopics } = useSelector(
    (state: RootState) => state.topicsStore
  );
  const { tab } = useParams();
  const value = tab || HOME_TABS.PHO_BIEN;

  React.useEffect(() => {
    if (topTopicsData)
      store.dispatch(
        updatePopularTopics({ ...popularTopics, ...topTopicsData })
      );
    if (newTopicsData)
      store.dispatch(updateNewTopics({ ...newTopics, ...newTopicsData }));
  }, [topTopicsData, newTopicsData]);

  return (
    <Box>
      <Header matchHeadLines={matchHeadLines} />
      {value === HOME_TABS.PHO_BIEN && topTopicsData && (
        <>
          <h1>
            <WrapTitle title={"Danh sách bài viết phổ biến"} />
          </h1>
          <Topics topTopics={topTopicsData} />
        </>
      )}
      {value === HOME_TABS.BAI_MOI && newTopicsData && (
        <>
          <h1>
            <WrapTitle title={"Danh sách bài viết mới đăng"} />
          </h1>
          <NewTopics newTopicsData={newTopicsData} />
        </>
      )}
    </Box>
  );
};

export default HomePage;
