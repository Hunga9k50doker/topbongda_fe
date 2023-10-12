import {
  PREDICTION_API_CREATE_GOALS_PREDICTION,
  PREDICTION_API_CREATE_RESULT_PREDICTION,
  PREDICTION_API_ODDS,
  PREDICTION_API_PREDICTIONS_COUNT,
  PREDICTION_API_PREDICTIONS_LIST,
} from "@/configs/endpoints/prediction_endpoints";
import { DJANGO_BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import queryString from "query-string";
