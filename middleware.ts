import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isAuthRoute = request.nextUrl.pathname.startsWith('/api/auth');

  if (isAuthRoute) {
    return NextResponse.next();
  }

  if (!session && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api/:path*', '/login'],
};
