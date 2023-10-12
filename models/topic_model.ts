import { UserModel } from "./user_model";

export interface TopicModel {
  code: string;
  title: string;
  getTitle: string;
  slug: string;
  user: UserModel;
  publishedAt: Date;
  lastUpdated: Date;
  url: string;
  category: {
    id: number;
    name: string;
    url: string;
    numPosts: number;
  };
  numViews: number;
  numLikes: number;
  numComments: number;
  contentPreview: string;
  teams: Array<any>;
  competitions: Array<any>;
}

export interface TopicDetailModel {
  topic: TopicDetailModel;
  points: number;
  publishedAt: Date;
  isLiked: boolean;
  code: string;
  title: string;
  getTitle: string;
  slug: string;
  user: UserModel;
  lastUpdated: Date;
  url: string;
  fullUrl: string;
  categoryUrl: string;
  category: any;
  numViews: number;
  numLikes: number;
  numComments: number;
  numMembers: number;
  numWords: number;
  numChars: number;
  contentSafe: string;
  teams: string[];
  editedAt: Date;
  editedByUsername: string;
  editedByUrl: string;
  loginRequired: true;
  lockComments: true;
  hideComments: true;
  pageDesc: string;
  contentPreview: string;
  competitions: Array<any>;
  contentMd: string;
  isSaved: boolean;
}

export interface TopicDataModel {
  current: number;
  hasNext: boolean;
  items: TopicDetailModel[];
  numPages: number;
  total: number;
}

export interface TopicHeadlineModel {
  code: string;
  title: string;
  getTitle: string;
  username: string;
  publishedAt: Date;
  publishedAtVerbose: string;
  url: string;
  numLikes: number;
  numComments: number;
}
