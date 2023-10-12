import { UserModel } from "./user_model";

export interface PredictionModel {
  bookmakers: string;
  betType: string;
  matchCode: string;
  createdAt: Date;
  bets: BetModel[];
  usableExperience: number;
}
export interface PredictionInfoModel {
  goalsUserPrediction: GoalModel[];
  resultUserPrediction: ResultModel[];
}

export interface GoalModel {
  matchCode: string;
  homeGoals: number;
  awayGoals: number;
  user: UserModel;
  predictionStatus: string;
  receivedExp: number;
  exp: number;
}

export interface ResultModel {
  matchCode: string;
  prediction: string;
  user: UserModel;
  predictionStatus: string;
  createdAt: Date;
  receivedExp: number;
  exp: number;
}

export interface PredictionDataModel {
  data: PredictionModel[];
  usableExperience: number;
}

export interface BetModel {
  odd: number;
  value: string;
  betType: string;
  usableExperience: number;
}
