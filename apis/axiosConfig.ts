import { DJANGO_BASE_URL } from "@/constants";
import { redirect } from "next/navigation";
import { refreshTokenAPI } from "@/apis/refresh_token_apis";
import { getCookies, setCookies } from "@/utils";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

export const axiosConfig = axios.create({
  baseURL: DJANGO_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookies("csrftoken") || "",
  },
});

//Request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
    const token = getCookies("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosConfig.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired and the original request hasn't already been retried
      if (
        error.response.status === 401 ||
        (error.response.status === 403 && !originalConfig._retry)
      ) {
        originalConfig._retry = true;
        try {
          const rs = await refreshTokenAPI(
            getCookies("refresh") || "",
            getCookies("csrftoken") || ""
          );
          const { access } = rs;
          setCookies("jwt", access);
          axiosConfig.defaults.headers["Authorization"] = `Bearer ${access}`;
          // Retry the original request with the updated access token
          return axiosConfig(originalConfig);
        } catch (err: any) {
          return Promise.reject(err);
        }
      }
    } else if (
      error.response.status === 500 ||
      error.response.status === 501 ||
      error.response.status === 502 ||
      error.response.status === 503
    ) {
      return redirect(
        `/error/?status=${error.response.status}&path=${error.response.config.url}`
      );
    }
    throw new Error();
  }
);
