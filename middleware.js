import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'session';
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET);

const PROTECTED = ['/profile', '/rankings'];

async function getUserFromToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(req) {
  const { pathname, search } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = await getUserFromToken(token);

  if (pathname.startsWith('/login')) {
    if (user) return NextResponse.redirect(new URL('/movies', req.url));
    return NextResponse.next();
  }

  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!user) {
      const url = new URL('/login', req.url);
      url.searchParams.set('error', 'Necesitas iniciar sesión');
      url.searchParams.set('next', pathname + search);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/profile/:path*', '/rankings/:path*'],
};
