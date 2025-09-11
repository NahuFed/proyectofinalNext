import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED = ["/movies", "/perfil", "/ratings"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (!PROTECTED.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get("session")?.value;
  if (!token) {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "Necesitas iniciar sesión");
    return NextResponse.redirect(url);
  }

  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    const url = new URL("/login", req.url);
    url.searchParams.set("error", "Sesión inválida o expirada");
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/movies/:path*", "/perfil/:path*", "/ratings/:path*"] };
