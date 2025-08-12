import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith("/admin")) {
    // Skip middleware for login page
    if (pathname === "/") {
      return NextResponse.next();
    }

    // For other admin routes, we'll handle authentication on the client side
    // since we need to check localStorage which is only available in the browser
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
