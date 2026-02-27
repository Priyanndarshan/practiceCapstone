import { NextResponse } from "next/server";
import { findUserByEmailAndPassword } from "@/data/mock/users";

const COOKIE_NAME = "demo-auth";
const COOKIE_MAX_AGE = 60 * 60 * 24;

export async function POST(req: Request) {
  const formData = await req.formData();
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  const user = findUserByEmailAndPassword(email, password);

  if (!user) {
    return NextResponse.redirect(new URL("/login?error=invalid", req.url));
  }

  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set(COOKIE_NAME, "1", { path: "/", maxAge: COOKIE_MAX_AGE });
  return res;
}
