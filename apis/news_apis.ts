import {
  NEWS_API_CREATE_NEW_TOPIC,
  NEWS_API_STORY_DETAIL,
  NEWS_API_STORIES_SHORT_LIST,
  NEWS_API_SLIDER_TAGS_LIST,
  NEWS_API_TAG_DETAIL,
  NEWS_API_ALL_TAGS_LIST,
  NEWS_API_STORIES_LIST,
  NEWS_API_RELATED_STORIES,
  NEWS_API_SAME_TAGS_STORIES,
  NEWS_API_BOOKMARK_STORY,
} from "@/configs/endpoints/news_endpoints";
import { axiosConfig as newsAxios } from "@/apis/axiosConfig";

export function postNewsAPI(action: any, data: any) {
  let url = "";
  switch (action) {
    case NEWS_API_CREATE_NEW_TOPIC:
      url = NEWS_API_CREATE_NEW_TOPIC;
      break;
  }
  if (!url) {
    throw new Error("URL không đúng!");
  }
  return newsAxios.post(url, data);
}

export function getStoryDetailAPI(params?: any) {
  return newsAxios.get(NEWS_API_STORY_DETAIL, { params });
}

export function getStoriesShortListAPI(params?: any) {
  return newsAxios.get(NEWS_API_STORIES_SHORT_LIST, { params });
}

export function getSliderTagsListAPI(params?: any) {
  return newsAxios.get(NEWS_API_SLIDER_TAGS_LIST, { params });
}

export function getTagDetailAPI(params?: any) {
  return newsAxios.get(NEWS_API_TAG_DETAIL, { params });
}

export function getAllTagsAPI(params?: any) {
  return newsAxios.get(NEWS_API_ALL_TAGS_LIST, { params });
}

export function getStoriesListAPI(params?: any) {
  return newsAxios.get(NEWS_API_STORIES_LIST, { params });
}

export function getRelatedStoriesAPI(params?: any) {
  return newsAxios.get(NEWS_API_RELATED_STORIES, { params });
}

export function getSameTagsStoriesAPI(params?: any) {
  return newsAxios.get(NEWS_API_SAME_TAGS_STORIES, { params });
}

export function getListBookmarkStoryAPI(params?: any) {
  return newsAxios.get(NEWS_API_BOOKMARK_STORY, { params });
}

export function bookmarkStoryAPI(params?: any) {
  return newsAxios.post(NEWS_API_BOOKMARK_STORY, params);
}

export function unBookmarkStoryAPI(params?: any) {
  return newsAxios.post(NEWS_API_BOOKMARK_STORY, params);
}
