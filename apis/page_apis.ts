import {
  PAGE_API_PAGE_DETAIL,
  PAGE_API_PAGES_LIST,
} from "@/configs/endpoints/page_endpoints";
import { axiosConfig as pagesAxios } from "@/apis/axiosConfig";

export function getPageDetailAPI(params?: any) {
  return pagesAxios.get(PAGE_API_PAGE_DETAIL, { params });
}

export function getPagesListAPI(params?: any) {
  return pagesAxios.get(PAGE_API_PAGES_LIST, { params });
}
