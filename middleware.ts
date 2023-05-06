import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/conversations', '/browse', '/profile'];

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith('/login');
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/conversations/:path*', '/browse', '/profile', '/login'],
};
