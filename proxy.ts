import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./utils/jwt";
import { getNewAccessToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/gear", "/about", "/categories"];

export const proxy = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const cookieStore = request.cookies;
  const response = NextResponse.next();

  let accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  // refresh the access token if it is expired and the refresh token is valid
  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getNewAccessToken();

    if (result.success && result.data?.accessToken) {
      // update the access token in the cookie

      const newAccessToken = result.data.accessToken;

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });

      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string,
      );
    }
  }

  let userRole = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as any).role; // ADMIN, PROVIDER, CUSTOMER
  }

  // Logged in user trying to access auth routes, redirect them to their respective dashboard
  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } else if (userRole === "PROVIDER") {
      return NextResponse.redirect(new URL("/provider-dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/customer-dashboard", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  //   If the user is not logged in and trying to access a private route, redirect to login
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. Role-Based Access Control (RBAC) with your specific hierarchy rules:
  // - ADMIN can access Admin & Customer dashboards (not Provider)
  // - PROVIDER can access Provider & Customer dashboards (not Admin)
  // - CUSTOMER can access only Customer dashboard (not Admin or Provider)

  if (pathname.startsWith("/admin-dashboard")) {
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  } else if (pathname.startsWith("/provider-dashboard")) {
    if (userRole !== "PROVIDER") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  } else if (pathname.startsWith("/customer-dashboard")) {
    // Admin, Provider, and Customer all can access customer dashboard/features
    if (userRole !== "CUSTOMER" && userRole !== "ADMIN" && userRole !== "PROVIDER") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp)$).*)",
  ],
};
