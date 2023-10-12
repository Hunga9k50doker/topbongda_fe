import { MatchDetailModel } from "./match_model";
import { StoryDetailModel } from "./new_model";
import { TopicDetailModel } from "./topic_model";
import { UserModel } from "./user_model";
export interface ItemCommentModel {
  user: UserModel;
  code: string;
  contentMd: string;
  createdAt: Date;
  editedAt: Date;
  editedByUsername: string;
  editedByUrl: string;
  numLikes: number;
  numComments: number;
  url: string;
  topicCode: string;
  matchCode: string;
  storyCode: string;
  parentCode: string;
  topic: TopicDetailModel;
  match: MatchDetailModel;
  story: StoryDetailModel;
  contentSafe: string;
  isLiked: boolean;
  parent: {
    code: string;
    url: string;
    username: string;
  };
  fullURL: string;
  fullUrl: string;
  pageDesc: string;
  image: null;
}

export interface ListCommentModel {
  count: number;
  next: string;
  previous: string;
  results: ItemCommentModel[];
}
