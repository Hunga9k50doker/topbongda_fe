import { TeamMemberModel } from "./team_model";

export interface CompetitionDataModel {
  count: number;
  next: string;
  previous: string;
  results: CompetitionItemModel[];
  current: number;
  numPages: number;
  total: number;
  items: CompetitionItemModel[];
}

export interface CompetitionItemModel {
  name: string;
  nameAlt: string;
  icon: string;
  logo: string;
  country: string;
  numUpcomingMatches: number;
  numFans: number;
  url: string;
  leagueId: number;
  slug: string;
  objectID: string;
  searchExtra: {
    iconUrl: string;
  };
}

export interface TopBadgesDataModel {
  topGoal: Top[];
  topAssist: Top[];
  topYellowCard: Top[];
  topRedCard: Top[];
}

export interface Top {
  season: number;
  competition: number;
  player: TeamMemberModel;
  topType: TopType;
  statistics: Statistics;
}

export enum TopType {
  A = "A",
  R = "R",
  S = "S",
  Y = "Y",
}

export interface Statistics {
  goals: number;
  saves: number;
  assists: number;
  conceded: number;
}
