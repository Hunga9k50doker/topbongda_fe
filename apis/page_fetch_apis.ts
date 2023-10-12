import {
  PAGE_API_PAGE_DETAIL,
  PAGE_API_PAGES_LIST,
} from "@/configs/endpoints/page_endpoints";
import { fetchAPI } from "@/apis/fetchConfig";

export function getPageDetailAPI(params?: any) {
  return fetchAPI(PAGE_API_PAGE_DETAIL, params);
}

export function getPagesListAPI(params?: any) {
  return fetchAPI(PAGE_API_PAGES_LIST, params);
}
