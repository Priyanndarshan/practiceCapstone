import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "demo-auth";

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME);
  if (!token?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/students", "/students/:path*"],
};
