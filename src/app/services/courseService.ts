// src/services/courseService.ts
import { cookies } from "next/headers";
import { CourseDetail } from "@/app/components/pages/views/CourseDetailClient"; // Import Interface của bạn

export async function getCourseDetail(
  courseId: string
): Promise<CourseDetail | null> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // 1. Lấy Cookie Store (Await cho Next.js 15 tương thích)
    const cookieStore = await cookies();

    // 2. Gọi API server-to-server
    // Ở Server Component, ta không dùng { credentials: 'include' } của fetch client
    // Thay vào đó, ta thủ công gán header Cookie.
    const res = await fetch(`${API_URL}/api/matching/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Đây chính là hành động tương đương với credentials: true
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store", // Hoặc 'force-cache' tùy nhu cầu cache
    });

    if (!res.ok) {
      console.error(`Fetch Course Error [${res.status}]:`, await res.text());
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("getCourseDetail Exception:", error);
    return null;
  }
}
