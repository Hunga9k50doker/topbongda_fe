import { NextResponse } from "next/server";
import type { NextRequest as NextRequestAPI } from "next/server";

const routerRederict = [
  {
    oldRouter: "/tai-khoan/dang-nhap",
    newRouter: "/dang-nhap",
  },
  {
    oldRouter: "/tai-khoan/phuc-hoi-tai-khoan",
    newRouter: "/phuc-hoi-tai-khoan",
  },
  {
    oldRouter: "/tai-khoan/phuc-hoi-tai-khoan/ok",
    newRouter: "/dang-nhap",
  },
];

export function middleware(request: NextRequestAPI) {
  let cookie = request.cookies.get("jwt");

  const routerNeedRedrict = routerRederict.find((router) =>
    request.nextUrl.pathname.startsWith(router.oldRouter)
  );
  if (routerNeedRedrict) {
    return NextResponse.redirect(
      new URL(routerNeedRedrict.newRouter, request.url)
    );
  }
  if (
    (request.nextUrl.pathname.startsWith("/dang-bai") ||
      request.nextUrl.pathname.startsWith("/thong-bao")) &&
    !cookie?.value
  ) {
    return NextResponse.redirect(new URL("/dang-nhap", request.url));
  }
  return NextResponse.next();
}
