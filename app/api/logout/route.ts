import { NextResponse } from "next/server";

const COOKIE_NAME = "demo-auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const res = NextResponse.redirect(new URL("/login", url.origin));
  res.cookies.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}
