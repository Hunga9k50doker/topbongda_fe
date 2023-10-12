import { createSlice } from "@reduxjs/toolkit";
import { TopicDetailModel } from "@/models/topic_model";
export const initState = {
  topics: {
    current: 0,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  relatedTopics: {
    current: 0,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  news: {
    current: 0,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  newTopics: { current: 0, hasNext: false, items: [], numPages: 0, total: 0 },
  popularTopics: {
    current: 0,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  collections: {
    current: 0,
    hasNext: false,
    items: [],
    numPages: 0,
    total: 0,
  },
  itemCurrent: null,
  isLoading: true,
};

const topicsSlice = createSlice({
  name: "topicsStore",
  initialState: initState,
  reducers: {
    updateTopics: (state, action) => {
      state.topics = action.payload;
      state.isLoading = false;
    },
    updateRelatedTopics: (state, action) => {
      state.relatedTopics = action.payload;
      state.isLoading = false;
    },
    updateRelatedNews: (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    },
    updateNewTopics: (state, action) => {
      state.newTopics = action.payload;
      state.isLoading = false;
    },
    updatePopularTopics: (state, action) => {
      state.popularTopics = action.payload;
      state.isLoading = false;
    },
    updateTopicCurrent: (state, action) => {
      state.itemCurrent = action.payload;
      state.isLoading = false;
    },
    updateCollections: (state, action) => {
      state.collections = action.payload;
    },
    deleteTopic: (state, action) => {
      state.topics.items = state.topics.items.filter(
        (item: TopicDetailModel) => item.code !== action.payload
      );
      state.newTopics.items = state.newTopics.items.filter(
        (item: TopicDetailModel) => item.code !== action.payload
      );
      state.popularTopics.items = state.popularTopics.items.filter(
        (item: TopicDetailModel) => item.topic.code !== action.payload
      );
      state.relatedTopics.items = state.relatedTopics.items.filter(
        (item: TopicDetailModel) => item.code !== action.payload
      );
      state.news.items = state.news.items.filter(
        (item: TopicDetailModel) => item.code !== action.payload
      );
      state.collections.items = state.collections.items.filter(
        (item: TopicDetailModel) => item.code !== action.payload
      );
      state.isLoading = false;
    },
    resetTopics: () => initState,
  },
});

export const {
  updateTopics,
  deleteTopic,
  updateTopicCurrent,
  updateNewTopics,
  updatePopularTopics,
  updateRelatedTopics,
  updateRelatedNews,
  updateCollections,
  resetTopics,
} = topicsSlice.actions;
export default topicsSlice;
