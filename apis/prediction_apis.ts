import {
  PREDICTION_API_CREATE_GOALS_PREDICTION,
  PREDICTION_API_CREATE_RESULT_PREDICTION,
  PREDICTION_API_ODDS,
  PREDICTION_API_PREDICTIONS_COUNT,
  PREDICTION_API_PREDICTIONS_LIST,
} from "@/configs/endpoints/prediction_endpoints";
import { axiosConfig } from "@/apis/axiosConfig";

export function createGoalsPreditionAPI(params?: any) {
  return axiosConfig.post(PREDICTION_API_CREATE_GOALS_PREDICTION, params);
}

export function createResultPredictionAPI(params?: any) {
  return axiosConfig.post(PREDICTION_API_CREATE_RESULT_PREDICTION, params);
}

export function getOddsAPI(params?: any) {
  return axiosConfig.get(PREDICTION_API_ODDS, { params });
}
export function getPredictionListAPI(params?: any) {
  return axiosConfig.get(PREDICTION_API_PREDICTIONS_LIST, { params });
}

export function getPredictionCountAPI(params?: any) {
  return axiosConfig.get(PREDICTION_API_PREDICTIONS_COUNT, { params });
}
