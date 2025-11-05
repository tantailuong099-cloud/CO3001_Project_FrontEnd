// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Đường dẫn công khai (không cần đăng nhập)
const PUBLIC_PATHS = ["/login", "/register"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Bỏ qua kiểm tra nếu đường dẫn nằm trong PUBLIC_PATHS
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Bỏ qua các tài nguyên tĩnh hoặc Next.js nội bộ
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Kiểm tra token
  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `access_token=${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const loginUrl = new URL("/login", req.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("access_token");
      return response;
    }

    const data = await res.json();

    // ✅ Gắn thông tin user vào header để Next.js có thể đọc global (server-side)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", data.userId);
    requestHeaders.set("x-user-email", data.email);
    requestHeaders.set("x-user-role", data.role);

    // ✅ (Tuỳ chọn) lưu vào cookie tạm (không httpOnly) để FE client có thể dùng
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    response.cookies.set(
      "user_info",
      JSON.stringify({
        userId: data.userId,
        email: data.email,
        role: data.role,
      }),
      {
        httpOnly: false,
        sameSite: "lax",
        path: "/",
      }
    );

    return response;
    // Token hợp lệ → cho phép truy cập
    return NextResponse.next();
  } catch (err) {
    console.error("Middleware verify error:", err);
    const loginUrl = new URL("/login", req.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("access_token");
    return response;
  }
}

// Áp dụng cho tất cả các route (ngoại trừ static)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
