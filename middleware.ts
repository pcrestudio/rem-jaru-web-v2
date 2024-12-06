import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  // Allow requests to `/auth` if there's no session (login/logout flow)
  if (pathname === "/auth" && !session) {
    return NextResponse.next();
  }

  // Redirect logged-in users from `/auth` to `/admin`
  if (pathname === "/auth" && session) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  // Redirect unauthorized users trying to access `/admin/*` to `/auth`
  if (pathname.startsWith("/admin") && !session) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }

  // Allow requests to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth", "/"],
};
