import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      const loginUrl = new URL('/auth/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/home',
    '/((?!api|_next/static|_next/image|auth/login|favicon.ico).*)',
  ],
};