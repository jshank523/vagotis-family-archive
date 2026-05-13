import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/home", "/family-tree", "/stories", "/recipes", "/photos", "/places", "/documents"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const hasAccess = request.cookies.get("family-access")?.value === "true";

  if (!hasAccess) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/family-tree/:path*", "/stories/:path*", "/recipes/:path*", "/photos/:path*", "/places/:path*", "/documents/:path*"],
};