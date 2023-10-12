export interface UserModel {
  avatarUrl: string;
  coverUrl: string;
  earnedExp: number;
  email: string;
  emailVerified: string;
  dateJoined: Date;
  birthYear: string;
  exp: string;
  favoriteTeamOther: string;
  levelIndex: number;
  nextLevel: {
    name: string;
    index: number;
    percent: number;
    requiredExp: number;
    requiredBreak: null;
  };
  location: string;
  numComments: number;
  numTopics: number;
  phoneNumber: string;
  updatedAt: string;
  name: string;
  fullUrl: string;
  userTitle: string;
  isAuth: boolean;
  numUnreadNotifications: number;
  searchExtra: { avatarUrl: string };
  socialLoginUrls: any;
  username: string;
  code: string;
  levelName: string;
  avatarSet: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    og: string;
  };
  coverSet: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    og: string;
  };
  url: string;
  numPosts: number;
  favoriteTeam: any;
  favoriteTeamIcon: string;
  favoriteTeamUrl: string;
  levelColor: string;
  isStaff: boolean;
  mytopics: {
    current: number;
    numPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
    items: any[];
  };
  mycomments: any;
  myLikes: string[];
}

export interface SettingModel {
  isNotifyFollowMatch: boolean;
  isNotifyFollowTeam: boolean;
  isNotifyFavoriteTeam: boolean;
  isNotifyComment: boolean;
  isNotifyGoals: boolean;
  isNotifyRedCard: boolean;
}

export interface HistoryAccumulationModel {
  total: number;
  numPages: number;
  current: number;
  hasNext: boolean;
  hasPrevious: boolean;
  data: Datum[];
}

export interface Datum {
  exp: number;
  desc: string;
  createdAt: Date;
}
