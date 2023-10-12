import {
  USER_API_GET_MY_PROFILE,
  USER_API_NOTIFICATIONS_LIST,
  USER_API_UPDATE_PROFILE,
  USER_API_LOGIN,
  USER_API_REGISTER,
  USER_API_RECOVER,
  USER_API_UPLOAD_AVATAR,
  USER_API_MARK_READ_NOTIFICATIONS,
  USER_API_GET_PUBLIC_PROFILE,
  USER_API_USER_LEVEL_LOGS,
  USER_API_TOP_USER_HEADLINES,
  USER_API_MEMBERS,
  USER_API_GET_LEVEL_LIST,
  USER_API_FOLOW_MATCH,
  USER_API_IS_FOLOW_MATCH,
  USER_API_LIST_FOLOW_MATCH,
  USER_API_FOLOW_TEAM,
  USER_API_IS_FOLOW_TEAM,
  USER_API_LIST_FOLOW_TEAM,
  USER_API_CHANGE_PASSWORD,
  USER_API_ANSWER_SECURITY_QUESTIONS,
  USER_API_CHECK_VERIFY_EMAIL,
  USER_API_GET_SECURITY_QUESTIONS,
  USER_API_RECOVER_BY_SECURITY_QUESTIONS,
  USER_API_VERIFY_EMAIL,
  USER_API_REGISTER_FCM_TOKEN,
  USER_API_REMOVE_FCM_TOKEN,
  USER_API_GET_SETTING,
  USER_API_GET_RECENT_ACTIVITY,
  USER_API_EDIT_SETTING,
  USER_API_TOKEN_REFRESH,
  USER_API_GOOGLE_AUTH,
} from "@/configs/endpoints/user_endpoints";
import { fetchAPI } from "@/apis/fetchConfig";

export async function getMyProfileAPI(options?: any) {
  return fetchAPI(USER_API_GET_MY_PROFILE, {}, options);
}

export function getPublicProfileAPI(params: string, options?: any) {
  return fetchAPI(USER_API_GET_PUBLIC_PROFILE, { userCode: params }, options);
}

export function getNotificationsListAPI(params?: any, options?: any) {
  return fetchAPI(USER_API_NOTIFICATIONS_LIST, params, options);
}

export function getMembersListAPI(params?: any, options?: any) {
  return fetchAPI(USER_API_MEMBERS, params, options);
}

export function getTopUserByEXPAPI(params?: any, options?: any) {
  return fetchAPI(USER_API_TOP_USER_HEADLINES, params, options);
}

export function getMySettingsAPI() {
  return fetchAPI(USER_API_GET_SETTING);
}
