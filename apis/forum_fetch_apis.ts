import {
  FORUM_API_CREATE_NEW_TOPIC,
  FORUM_API_EDIT_TOPIC,
  FORUM_API_CREATE_NEW_COMMENT,
  FORUM_API_EDIT_COMMENT,
  FORUM_API_LIKE_COMMENT,
  FORUM_API_LIKE_TOPIC,
  FORUM_API_CATEGORIES_LIST,
  FORUM_API_CATEGORIES_SELECT,
  FORUM_API_CATEGORIE_DETAIL,
  FORUM_API_NEW_TOPICS_LIST,
  FORUM_API_TOP_TOPICS_LIST,
  FORUM_API_NEW_TOPICS_HEADLINES,
  FORUM_API_SEARCH,
  FORUM_API_TOPIC_DETAIL,
  FORUM_API_RELATED_TOPICS_LIST,
  FORUM_API_COMMENT_DETAIL,
  FORUM_API_COMMENTS_LIST,
  FORUM_API_SUBCOMMENTS_LIST,
  FORUM_API_GET_LIKED_COMMENTS,
  FORUM_API_TOPIC_HIT_VIEW,
  FORUM_API_GET_MOST_LIKES_TOPICS,
  FORUM_API_EDITOR_PICK_ITEMS,
  FORUM_API_OUTLINK,
  FORUM_API_REPORT,
} from "@/configs/endpoints/forum_endpoints";
import { fetchAPI } from "@/apis/fetchConfig";

export async function getTopicsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_NEW_TOPICS_LIST, params, {
    ...(options || {
      cache: "no-store",
    }),
  });
}

export async function getTopTopicsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_TOP_TOPICS_LIST, params, {
    ...(options || {
      cache: "no-store",
    }),
  });
}

export async function getTopicsDetailAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_TOPIC_DETAIL, params, {
    ...(options || {}),
  });
}

export async function getMostLikesTopicsAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_GET_MOST_LIKES_TOPICS, params, {
    ...(options || {}),
  });
}

export async function getCategoryDetailAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_CATEGORIE_DETAIL, params, {
    ...(options || {}),
  });
}

export function getRelatedTopicsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_RELATED_TOPICS_LIST, params, {
    ...(options || {}),
  });
}

export function getNewTopicsHeadlinesAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_NEW_TOPICS_HEADLINES, params, {
    ...(options || {}),
  });
}

export function getCommentDetailAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_COMMENT_DETAIL, params, options || {});
}

export function getCommentEditAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_EDIT_COMMENT, params, options || {});
}

export function getCategoriesListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_CATEGORIES_LIST, params, options || {});
}

export function getCategoriesOptionsAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_CATEGORIES_SELECT, params, options || {});
}

export function getNewTopicsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_NEW_TOPICS_LIST, params, options || {});
}

export function searchAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_SEARCH, params, options || {});
}

export function getTopicDetailAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_TOPIC_DETAIL, params, options || {});
}

export function getCommentsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_COMMENTS_LIST, params, options || {});
}

export function getSubCommentsListAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_SUBCOMMENTS_LIST, params, options || {});
}

export function getLikedCommentsAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_GET_LIKED_COMMENTS, params, options || {});
}

export function getEditorPickItemsAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_EDITOR_PICK_ITEMS, params, options || {});
}

export function getOutLinkAPI(params?: any, options?: any) {
  return fetchAPI(FORUM_API_OUTLINK, params, options || {});
}
