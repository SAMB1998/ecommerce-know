import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

/*
export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.ADMIN_HASHED_PASSWORD as string
    ))
  );
}
*/
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      (request.nextUrl.pathname.startsWith("/admin") &&
        request.nextauth.token?.role !== "admin") ||
      !request.nextauth.token
    ) {
      return NextResponse.redirect(new URL("/denied", request.url));
    } else if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role === "admin"
    ) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/denied", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: "/admin/:path*",
};
