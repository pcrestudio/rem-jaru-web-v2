import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (session?.name && !request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth"],
};
