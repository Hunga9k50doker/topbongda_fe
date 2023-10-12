export interface MatchDetailModel {
  code: string;
  matchCode: string;
  homeTeam: TeamClass;
  awayTeam: TeamClass;
  title: string;
  homeGoals: number;
  awayGoals: number;
  timeElapsed: number;
  kickOffAt: any;
  url: string;
  fullUrl: string;
  competition: Competition;
  alertContent: string;
  desc: string;
  round: string;
  venue: VenueModel;
  referee: string;
  numComments: number;
  numViews: number;
  numMembers: number;
  matchEvent: MatchEvent[];
  awayStatistics: Statistic[];
  homeStatistics: Statistic[];
  matchStatus: string;
  matchStatusTitle: string;
  homeLineup: LineupModel;
  liveVideoUrl: string;
  awayLineup: LineupModel;
  season: number;
  competitionName: string;
  weather: Weather;
}

export interface VenueModel {
  capacity: number;
  city: string;
  image: string;
  name: string;
  address: string;
  surface: string;
  venueId: number;
}

export interface Competition {
  name: string;
  url: string;
  icon: string;
  numNextMatches: number;
  slug: string;
  country: string;
}

export interface StartXi {
  player: StartXiPlayer;
}

export interface StartXiPlayer {
  id: number;
  pos: Pos;
  grid: string;
  name: string;
  number: number;
}

export interface Team {
  name: string;
  numFans: number;
  icon: string;
  url: string;
  numNextMatches: number;
}

export interface MatchDataModel<T> {
  total: number;
  numPages: number;
  current: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: T[];
}

export interface LineupModel {
  team: Team;
  coach: Coach;
  formation: string;
  startXi: StartXi[];
  substitutes: StartXi[];
}

export interface Coach {
  name: string;
  position: string;
  avatar: string;
  firstName: string;
  lastName: string;
  code: string;
}

export interface TeamClass {
  name: string;
  numFans: number;
  icon: string;
  url: string;
  code: string;
}

export interface Player {
  id: number;
  pos: Pos;
  grid: string;
  name: string;
  number: number;
  code: string;
  team: string;
}

export enum Pos {
  D = "D",
  F = "F",
  G = "G",
  M = "M",
}

export interface MatchEvent {
  timeElapsed: number;
  timeExtra: any;
  match: number;
  eventType: string;
  detail: string;
  comments: string;
  player: AssistClass;
  assist: AssistClass;
  eventTeam: string;
}

export interface Statistic {
  type: string;
  value: number | string;
}

export interface AssistClass {
  code: string;
  name: string;
  team: string;
}

export interface HeadToHeadModel {
  competition: Competition;
  items: MatchDetailModel[];
}

export interface Weather {
  main: Main;
  status: Status[];
}

export interface Main {
  temp: number;
  humidity: number;
  pressure: number;
  tempMax: number;
  tempMin: number;
  feelsLike: number;
}

export interface Status {
  id: number;
  icon: string;
  main: string;
  description: string;
}
