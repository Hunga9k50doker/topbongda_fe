export interface TeamModel {
  country: string;
  icon: string;
  logo: string;
  name: string;
  numFans: number;
  url: string;
  code: string;
  teamCode: string;
  foundedYear: string;
  nickName: string;
  nameAlt: string;
  city: string;
  desc: string;
  coverImg: string;
  fullUrl: string;
  venue: {
    name: string;
    capacity: number;
    address: string;
    city: string;
  };
}

export interface TeamDataModel {
  current: number;
  numPages: number;
  total: number;
  items: TeamModel[];
}

export interface TeamMemberModel {
  name: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  team: TeamModel;
  dateOfBirth: any;
  birthPlace: string;
  birthCountry: string;
  height: string;
  weight: string;
  injured: boolean;
  code: string;
  avatar: string;
  statistics: Statistics;
  career: Career[];
}

export interface TeamMemberDataModel {
  coach: TeamMemberModel;
  player: TeamMemberModel[];
  ok: boolean;
}

export interface Career {
  end: Date;
  team: TeamModel;
  start: Date;
}

export interface Statistics {
  team: StatisticsTeam;
  cards: Cards;
  duels: Duels;
  fouls: Fouls;
  games: Games;
  goals: Goals;
  shots: Shots;
  league: League;
  passes: Passes;
  penalty: Penalty;
  tackles: Tackles;
  dribbles: Dribbles;
  substitutes: Substitutes;
}

export interface Cards {
  red: number;
  yellow: number;
  yellowred: number;
}

export interface Dribbles {
  past: number;
  success: number;
  attempts: number;
}

export interface Duels {
  won: number;
  total: number;
}

export interface Fouls {
  drawn: number;
  committed: number;
}

export interface Games {
  number: number;
  rating: string;
  captain: boolean;
  lineups: number;
  minutes: number;
  position: string;
  appearences: number;
}

export interface Goals {
  saves: number;
  total: number;
  assists: number;
  conceded: number;
}

export interface League {
  id: number;
  flag: string;
  logo: string;
  name: string;
  season: number;
  country: string;
}

export interface Passes {
  key: number;
  total: number;
  accuracy: number;
}

export interface Penalty {
  won: number;
  saved: number;
  missed: number;
  scored: number;
  commited: number;
}

export interface Shots {
  on: number;
  total: number;
}

export interface Substitutes {
  in: number;
  out: number;
  bench: number;
}

export interface Tackles {
  total: number;
  blocks: number;
  interceptions: number;
}

export interface StatisticsTeam {
  id: number;
  logo: string;
  name: string;
}

export interface PlayerTeam {
  name: string;
  icon: string;
  code: string;
}
