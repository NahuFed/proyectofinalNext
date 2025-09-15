import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL("/login?ok=1", request.url);
  const res = NextResponse.redirect(url);
  res.cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
