import {
  SOCCER_API_LEAGUES_AUTO,
  SOCCER_API_TEAMS_AUTO,
  SOCCER_API_TEAM_DETAIL,
  SOCCER_API_COMPETITIONS_LIST,
  SOCCER_API_COMPETITION_DETAIL,
  SOCCER_API_COMPETITION_MATCHES_LIST,
  SOCCER_API_TEAMS_LIST,
  SOCCER_API_TEAMS_SIMPLE_LIST,
  SOCCER_API_GET_MATCHES_LIST,
  SOCCER_API_COMPETITIONS_OPTION_LIST,
  SOCCER_API_TEAMS_OPTION_LIST,
  SOCCER_API_GET_CALENDAR_MATCHES,
  SOCCER_API_GET_MATCH_HEADLINES,
  SOCCER_API_GET_FEATURED_MATCHES,
  SOCCER_API_MATCH_DETAIL,
  SOCCER_API_HEAD_TO_HEAD,
  SOCCER_API_TEAM_MEMBER,
  SOCCER_API_TEAM_MEMBER_DETAIL,
  SOCCER_API_STANDING,
  SOCCER_API_TEAM_COACH_DETAIL,
  SOCCER_API_GET_TOP_PLAYER,
} from "@/configs/endpoints/soccer_endpoints";
import { fetchAPI } from "@/apis/fetchConfig";

export function getTeamDetailAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_TEAM_DETAIL, params, {
    ...(options || {}),
  });
}

export function getCompetitionDetailAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_COMPETITION_DETAIL, params, {
    ...(options || {}),
  });
}

export function getMatchDetailAPI(params: string, options?: any) {
  const newCode = params.split("-").pop();
  return fetchAPI(
    SOCCER_API_MATCH_DETAIL,
    { slugCode: newCode },
    options || {}
  );
}

export function getTeamPlayerDetailAPI(params: any, options?: any) {
  return fetchAPI(SOCCER_API_TEAM_MEMBER_DETAIL, params, options || {});
}

export function getTeamCoachDetailAPI(params: any, options?: any) {
  return fetchAPI(SOCCER_API_TEAM_COACH_DETAIL, params, options || {});
}

export function getCompetitionMatchesListAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_COMPETITION_MATCHES_LIST, params, options || {});
}

export function getStandingAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_STANDING, params, options || {});
}

export function getTopBadgesAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_GET_TOP_PLAYER, params, options || {});
}

export function getCompetitionsListAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_COMPETITIONS_LIST, params, options || {});
}

export function getMatchesListAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_GET_MATCHES_LIST, params, options || {});
}

export function getTeamMemberAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_TEAM_MEMBER, params, options || {});
}

export function getMatchHeadlinesAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_GET_MATCH_HEADLINES, params, options || {});
}

export function getTeamsListAPI(params?: any, options?: any) {
  return fetchAPI(SOCCER_API_TEAMS_LIST, params, options || {});
}
