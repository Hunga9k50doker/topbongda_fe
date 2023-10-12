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
  USER_API_UPLOAD_COVER,
  USER_API_SAVE_TOPIC,
  USER_API_GET_LIST_SAVED_TOPIC,
  USER_API_GET_SETTING,
  USER_API_GET_RECENT_ACTIVITY,
  USER_API_EDIT_SETTING,
  USER_API_LOGOUT,
  USER_API_GOOGLE_AUTH,
  USER_API_FACEBOOK_AUTH,
} from "@/configs/endpoints/user_endpoints";
import { axiosConfig as usersAxios } from "@/apis/axiosConfig";

export function getMyProfileAPI() {
  return usersAxios.get(USER_API_GET_MY_PROFILE);
}

export function getNotificationsListAPI(params?: any) {
  return usersAxios.get(USER_API_NOTIFICATIONS_LIST, params);
}

export function postUsersAPI(action: any, data: any) {
  let url = "";
  switch (action) {
    case USER_API_UPDATE_PROFILE:
      url = USER_API_UPDATE_PROFILE;
      break;
    case USER_API_LOGIN:
      url = USER_API_LOGIN;
      break;
    case USER_API_REGISTER:
      url = USER_API_REGISTER;
      break;
    case USER_API_RECOVER:
      url = USER_API_RECOVER;
      break;
  }
  if (!url) {
    throw new Error("URL không đúng!");
  }
  return usersAxios.post(`${url}`, data);
}

export function uploadAvatarAPI(params?: any) {
  return usersAxios.postForm(USER_API_UPLOAD_AVATAR, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function uploadCoverAPI(params?: any) {
  return usersAxios.postForm(USER_API_UPLOAD_COVER, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function markReadNotificationsAPI(params?: any) {
  return usersAxios.post(USER_API_MARK_READ_NOTIFICATIONS, params);
}

export function getPublicProfileAPI(params?: any) {
  return usersAxios.get(USER_API_GET_PUBLIC_PROFILE, { params });
}

export function getListLevelAPI(params?: any) {
  return usersAxios.get(USER_API_GET_LEVEL_LIST, params);
}
export function getLevelLogsAPI(params?: any) {
  return usersAxios.get(USER_API_USER_LEVEL_LOGS, params);
}

export function getTopUserByEXPAPI(params?: any) {
  return usersAxios.get(USER_API_TOP_USER_HEADLINES, { params });
}

export function getMembersListAPI(params?: any) {
  return usersAxios.get(USER_API_MEMBERS, { params });
}

export function followMatchAPI(params?: any) {
  return usersAxios.post(USER_API_FOLOW_MATCH, params);
}

export function checkIsFollowMatchAPI(params?: any) {
  return usersAxios.get(USER_API_IS_FOLOW_MATCH, { params });
}

export function getListFollowMatchAPI(params?: any) {
  return usersAxios.get(USER_API_LIST_FOLOW_MATCH, { params });
}

export function followTeamAPI(params?: any) {
  return usersAxios.post(USER_API_FOLOW_TEAM, params);
}

export function checkIsFollowTeamAPI(params?: any) {
  return usersAxios.get(USER_API_IS_FOLOW_TEAM, { params });
}

export function getListFollowTeamAPI(params?: any) {
  return usersAxios.get(USER_API_LIST_FOLOW_TEAM, { params });
}

export function getListSaveTopicAPI(params?: any) {
  return usersAxios.get(USER_API_GET_LIST_SAVED_TOPIC, { params });
}

export function getHistoryAccumulationAPI(params?: any) {
  return usersAxios.get(USER_API_GET_RECENT_ACTIVITY, { params });
}

export function getMySettingsAPI(params?: any) {
  return usersAxios.get(USER_API_GET_SETTING, { params });
}

export function updateSettingsAPI(params?: any) {
  return usersAxios.post(USER_API_EDIT_SETTING, params);
}

export function saveTopicAPI(params?: any) {
  return usersAxios.post(USER_API_SAVE_TOPIC, params);
}

export function changePasswordAPI(params?: any) {
  return usersAxios.post(USER_API_CHANGE_PASSWORD, params);
}

export function checkVerifyEmailAPI(params?: any) {
  return usersAxios.post(USER_API_CHECK_VERIFY_EMAIL, params);
}

export function verifyEmailAPI(params?: any) {
  return usersAxios.post(USER_API_VERIFY_EMAIL, params);
}

export function answerSecurityQuestionsAPI(params?: any) {
  return usersAxios.post(USER_API_ANSWER_SECURITY_QUESTIONS, params);
}

export function recoverBySecurityQuestionsAPI(params?: any) {
  const config = {
    headers: {
      Authorization: "",
    },
  };
  return usersAxios.post(
    USER_API_RECOVER_BY_SECURITY_QUESTIONS,
    params,
    config
  );
}

export function getSecurityQuestionsAPI(params?: any) {
  return usersAxios.get(USER_API_GET_SECURITY_QUESTIONS, { params });
}

export function registerFcmTokenAPI(params?: any) {
  return usersAxios.post(USER_API_REGISTER_FCM_TOKEN, params);
}

export function removeFcmTokenAPI(params?: any) {
  return usersAxios.post(USER_API_REMOVE_FCM_TOKEN, params);
}

export function logoutAPI() {
  return usersAxios.post(USER_API_LOGOUT);
}

export function googleAuthAPI(params?: any) {
  return usersAxios.post(USER_API_GOOGLE_AUTH, params);
}

export function facebookAuthAPI(params?: any) {
  return usersAxios.post(USER_API_FACEBOOK_AUTH, params);
}
