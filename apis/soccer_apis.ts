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
  SOCCER_API_MATCH_HIT_VIEW,
} from "@/configs/endpoints/soccer_endpoints";
import { axiosConfig as soccerAxios } from "@/apis/axiosConfig";

export function getLeaguesAutoAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_LEAGUES_AUTO, { params });
}

export function getTeamsAutoAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAMS_AUTO, { params });
}

export function getTeamDetailAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAM_DETAIL, { params });
}

export function getTeamMemberDetailAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAM_MEMBER_DETAIL, { params });
}

export function getTeamMemberAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAM_MEMBER, { params });
}

export function getCompetitionsListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_COMPETITIONS_LIST, { params });
}

export function getCompetitionDetailAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_COMPETITION_DETAIL, { params });
}

export function getCompetitionMatchesListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_COMPETITION_MATCHES_LIST, { params });
}

export function getTeamsListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAMS_LIST, { params });
}

export function getTeamsSimpleListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAMS_SIMPLE_LIST, { params });
}

export function getMatchesListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_GET_MATCHES_LIST, { params });
}

export function getCompetitionsOptionListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_COMPETITIONS_OPTION_LIST, { params });
}

export function getTeamsOptionListAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_TEAMS_OPTION_LIST, { params });
}

export function getCalendarMatchesAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_GET_CALENDAR_MATCHES, { params });
}

export function getMatchHeadlinesAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_GET_MATCH_HEADLINES, { params });
}

export function getFeaturedMatchesAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_GET_FEATURED_MATCHES, { params });
}

export function getMatchDetailAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_MATCH_DETAIL, { params });
}

export function getHeadToHeadAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_HEAD_TO_HEAD, { params });
}

export function getStandingAPI(params?: any) {
  return soccerAxios.get(SOCCER_API_STANDING, { params });
}

export function putHitMatchViewCountAPI(data: any) {
  return soccerAxios.put(SOCCER_API_MATCH_HIT_VIEW, data);
}
