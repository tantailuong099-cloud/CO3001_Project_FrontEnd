// src/app/(pages)/my-course/page.tsx

import type { Metadata } from "next";
// import CourseDropDown from "@/app/components/pages/button/CourseDropDown";
import { getCurrentUser } from "@/lib/auth"; // Vẫn dùng để lấy role cho tiêu đề
import MyCourseList from "./MyCourseList"; // 👈 Import component mới

export const metadata: Metadata = {
  title: "My Courses",
  description: "Tutor Support System",
};

export default async function CoursesPage() {
  // Lấy role từ server để hiển thị tiêu đề cho đúng
  const currentUser = await getCurrentUser();
  const userRole = currentUser?.role || "Student"; // Mặc định là Student nếu chưa login

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {userRole === "Student" ? "My Enrolled Courses" : "My Assigned Classes"}
      </h1>
      {/* <CourseDropDown /> */}

      {/* 👇 Gọi Client Component để nó tự fetch dữ liệu */}
      <MyCourseList />
    </div>
  );
}
