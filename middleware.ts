import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

const protectedPaths = ['/profile'];

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const isProtected = protectedPaths.some((path) => req.url.endsWith(path));
    if (isProtected && !token) return NextResponse.redirect(`http://localhost:3000/login`);
  },
  {
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico|login).+)' };
