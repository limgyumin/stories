import type { NextRequest } from "next/server";
import { NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const { device } = userAgent(request);

  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  url.searchParams.set("viewport", viewport);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
