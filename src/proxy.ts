import { NextRequest, NextResponse } from "next/server";

const ALLOWED_COUNTRIES = new Set([
  "US",
  "CA",
  "GB",
  "IN",
]);

function getCountry(req: NextRequest): string | null {
  // Vercel commonly provides:
  const vercel = req.headers.get("x-vercel-ip-country");
  if (vercel) return vercel;

  // Cloudflare commonly provides:
  const cf = req.headers.get("cf-ipcountry");
  if (cf) return cf;

  // Some runtimes also provide:
  // @ts-expect-error - not always typed depending on runtime
  return req.geo?.country ?? null;
}

// Named export `proxy` is supported (or you can default export a function named proxy)
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals / common static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt)$/)
  ) {
    return NextResponse.next();
  }

  const country = getCountry(req);

  // Block if unknown OR not in allowlist
  if (!country || !ALLOWED_COUNTRIES.has(country)) {
    return new NextResponse("Access denied in your region.", { status: 403 });

    // Or redirect to a friendly page:
    // const url = req.nextUrl.clone();
    // url.pathname = "/blocked";
    // return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
