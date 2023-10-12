import { DJANGO_BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import queryString from "query-string";
import { refreshTokenAPI } from "@/apis/refresh_token_apis";

export async function fetchAPI(
  url: string,
  params = {},
  //@ts-ignore
  options: RequestInfo = {},
  method = "GET"
) {
  const token = cookies().get("jwt")?.value || "";
  const refresh = cookies().get("refresh")?.value || "";
  const csrftoken = cookies().get("csrftoken")?.value || "";

  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
    "X-CSRFToken": csrftoken || "",
  });

  const fullUrl = queryString.stringifyUrl({
    url: `${DJANGO_BASE_URL}${url}`,
    query: params,
  });
  try {
    const response = await fetch(fullUrl, {
      method: method,
      headers: headers,
      //@ts-ignore
      ...options,
    });
    if (!response.ok) {
      if ((response.status === 401 || response.status === 403) && refresh) {
        //auto refresh token and recall api
        const newAccessToken = await refreshTokenAPI(refresh, csrftoken);
        headers.set("Authorization", `Bearer ${newAccessToken.access}`);
        const res = await fetch(fullUrl, {
          method: method,
          headers: headers,
          credentials: "include",
          //@ts-ignore
          ...options,
        })
          .then((res) => res.json())
          .then((json) => json)
          .catch((err) => notFound());
        return res;
      } else if (
        response.status === 500 ||
        response.status === 501 ||
        response.status === 502 ||
        response.status === 503
      ) {
        return redirect(`/error/?status=${response.status}&path=${fullUrl}`);
      } else {
        throw new Error(response.statusText);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return notFound();
  }
}
