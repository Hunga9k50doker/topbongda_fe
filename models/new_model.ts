export interface StoryDetailModel {
  code: string;
  title: string;
  url: string;
  summary: string;
  cover: any;
  getCoverThumbnailUrl: string;
  postSource: PostSource;
  publishedAt: any;
  searchExtra: any;
  tags: TagModel[];
  teams: any;
  numLikes: number;
  isLiked: boolean;
  isBookmark: boolean;
  postOriginUrl: string;
  competitions: any[];
  contentSafe: string;
}

export interface PostSource {
  name: string;
  icon: any;
}

export interface StoryModel {
  total: number;
  current: number;
  numPages: number;
  items: StoryDetailModel[];
  data: StoryDetailModel[];
}

export interface TagModel {
  name: string;
  url: string;
  numStories: number;
  slug: string;
}

export interface TagDataModel {
  total: number;
  current: number;
  numPages: number;
  items: TagModel[];
}
