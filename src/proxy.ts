// proxy.ts
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set(["US", "CA", "GB", "IN"]);

function getCountry(req: NextRequest): string | null {
  const vercel = req.headers.get("x-vercel-ip-country");
  if (vercel) return vercel;

  const cf = req.headers.get("cf-ipcountry");
  if (cf) return cf;

  // @ts-expect-error
  return req.geo?.country ?? null;
}

export function proxy(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const isLocal =
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1") ||
    host.startsWith("0.0.0.0");

  if (isLocal) return NextResponse.next();

  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/blocked") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt)$/)
  ) {
    return NextResponse.next();
  }

  const country = getCountry(req);

  if (!country || !ALLOWED_COUNTRIES.has(country)) {
    const url = req.nextUrl.clone();
    url.pathname = "/blocked";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
