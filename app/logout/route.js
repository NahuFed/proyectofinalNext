import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL("/login", request.url);
  const res = NextResponse.redirect(url);
  res.cookies.set("session", "", { maxAge: 0, path: "/" });
  return res;
}
