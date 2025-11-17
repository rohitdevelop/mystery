// import { NextRequest, NextResponse } from "next/server";
// export { default } from "next-auth/middleware";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;
//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/varify") ||
//       url.pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
//   }
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "/dashboard/:path*", "/varify/:path*"],
// };


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Protected routes middleware
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // 1️⃣ If user has token and tries to visit auth pages → redirect to dashboard
  if (
    token &&
    (
      url.pathname === "/sign-in" ||
      url.pathname === "/sign-up" ||
      url.pathname === "/varify"
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", url));
  }

  // 2️⃣ If user does NOT have token and tries to visit protected routes → redirect to sign-in
  if (
    !token &&
    (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/home") // add any other protected routes
    )
  ) {
    return NextResponse.redirect(new URL("/sign-in", url));
  }

  // 3️⃣ Allow all other pages
  return NextResponse.next();
}

// ✅ Matcher: only the routes you want to protect or handle
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/home",
    "/sign-in",
    "/sign-up",
    "/varify/:path*"
  ]
};
