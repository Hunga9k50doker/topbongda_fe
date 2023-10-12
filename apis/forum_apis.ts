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
  FORUM_API_REPORT_ERROR_SYSTEM,
} from "@/configs/endpoints/forum_endpoints";
import { axiosConfig as forumAxios } from "@/apis/axiosConfig";

export function postForumAPI(action: any, data: any) {
  let url = "";
  switch (action) {
    case FORUM_API_CREATE_NEW_TOPIC:
      url = FORUM_API_CREATE_NEW_TOPIC;
      break;
    case FORUM_API_EDIT_TOPIC:
      url = FORUM_API_EDIT_TOPIC;
      break;
    case FORUM_API_CREATE_NEW_COMMENT:
      url = FORUM_API_CREATE_NEW_COMMENT;
      break;
    case FORUM_API_EDIT_COMMENT:
      url = FORUM_API_EDIT_COMMENT;
      break;
    case FORUM_API_LIKE_COMMENT:
      url = FORUM_API_LIKE_COMMENT;
      break;
    case FORUM_API_LIKE_TOPIC:
      url = FORUM_API_LIKE_TOPIC;
      break;
    case FORUM_API_REPORT:
      url = FORUM_API_REPORT;
      return forumAxios.postForm(url, data);
    case FORUM_API_REPORT_ERROR_SYSTEM:
      url = FORUM_API_REPORT_ERROR_SYSTEM;
      return forumAxios.postForm(url, data);
  }
  if (!url) {
    throw new Error("URL không đúng!");
  }
  return forumAxios.post(url, data);
}

export function getCategoriesListAPI(params?: any) {
  return forumAxios.get(FORUM_API_CATEGORIES_LIST, { params });
}

export function getCategoriesOptionsAPI(params?: any) {
  return forumAxios.get(FORUM_API_CATEGORIES_SELECT, { params });
}

export function getCategoryDetailAPI(params?: any) {
  return forumAxios.get(FORUM_API_CATEGORIE_DETAIL, { params });
}

export async function getTopicsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_NEW_TOPICS_LIST, { params });
}

export function getTopTopicsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_TOP_TOPICS_LIST, { params });
}

export function getNewTopicsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_NEW_TOPICS_LIST, { params });
}

export function getNewTopicsHeadlinesAPI(params?: any) {
  return forumAxios.get(FORUM_API_NEW_TOPICS_HEADLINES, { params });
}

export function searchAPI(params?: any) {
  return forumAxios.get(FORUM_API_SEARCH, { params });
}

export function getTopicDetailAPI(params?: any) {
  return forumAxios.get(FORUM_API_TOPIC_DETAIL, { params });
}

export function getRelatedTopicsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_RELATED_TOPICS_LIST, { params });
}

export function getCommentDetailAPI(params?: any) {
  return forumAxios.get(FORUM_API_COMMENT_DETAIL, { params });
}

export function getCommentsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_COMMENTS_LIST, { params });
}

export function getSubCommentsListAPI(params?: any) {
  return forumAxios.get(FORUM_API_SUBCOMMENTS_LIST, { params });
}

export function getLikedCommentsAPI(params?: any) {
  return forumAxios.get(FORUM_API_GET_LIKED_COMMENTS, { params });
}

export function putHitViewCountAPI(data: any) {
  return forumAxios.put(FORUM_API_TOPIC_HIT_VIEW, data);
}

export function getMostLikesTopicsAPI(params?: any) {
  return forumAxios.get(FORUM_API_GET_MOST_LIKES_TOPICS, { params });
}

export function getEditorPickItemsAPI(params?: any) {
  return forumAxios.get(FORUM_API_EDITOR_PICK_ITEMS, { params });
}

export function getCommentEditAPI(params?: any) {
  return forumAxios.get(FORUM_API_EDIT_COMMENT, { params });
}

export function getOutLinkAPI(params?: any) {
  return forumAxios.get(FORUM_API_OUTLINK, { params });
}
