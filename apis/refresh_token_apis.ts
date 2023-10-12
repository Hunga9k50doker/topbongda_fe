import { USER_API_TOKEN_REFRESH } from "@/configs/endpoints/user_endpoints";
import { DJANGO_BASE_URL } from "@/constants";
import { notFound, redirect } from "next/navigation";
import queryString from "query-string";

export async function refreshTokenAPI(
  refreshTokenAPI: string,
  csrftoken: string
) {
  const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRFToken": csrftoken,
  });
  const fullUrl = queryString.stringifyUrl({
    url: `${DJANGO_BASE_URL}${USER_API_TOKEN_REFRESH}`,
    query: {},
  });

  try {
    const response = await fetch(fullUrl, {
      method: "POST",
      body: JSON.stringify({ refresh: refreshTokenAPI }),
      headers: headers,
    });
    const data = await response.json();
    if (response.status === 401 || response.status === 403) {
      return redirect("/403");
    }
    return data;
  } catch (error) {
    console.error(error);
    return notFound();
  }
}
