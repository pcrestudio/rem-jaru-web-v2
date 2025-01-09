import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token && request.nextUrl.pathname.startsWith("/admin")) {
    // Build a redirect URL to the login page
    const redirectUrl = request.nextUrl.clone();

    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Protect these routes:
export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
