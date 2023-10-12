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
} from "@/configs/endpoints/news_endpoints";
import { fetchAPI } from "@/apis/fetchConfig";

export function getStoryDetailAPI(params: string) {
  const newCode = params.split("-").pop();
  return fetchAPI(NEWS_API_STORY_DETAIL, { code: newCode });
}

export function getStoriesShortListAPI(params?: any) {
  return fetchAPI(NEWS_API_STORIES_SHORT_LIST, params);
}

export function getStoriesListAPI(params?: any) {
  return fetchAPI(NEWS_API_STORIES_LIST, params);
}

export function getTagDetailAPI(params?: any) {
  return fetchAPI(NEWS_API_TAG_DETAIL, params);
}

export function getAllTagsAPI(params?: any) {
  return fetchAPI(NEWS_API_ALL_TAGS_LIST, params);
}
