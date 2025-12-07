// src/app/(pages)/my-course/[id]/layout.tsx

import CourseSidebar from "@/app/components/pages/sidebar/CourseSideBar";
import { getCurrentUser } from "@/lib/auth";
import { getCourseDetail } from "@/app/services/courseService"; // Import hàm fetch mới
import CourseHeader from "@/app/components/pages/header/CourseHeader"; // Import UI mới

export default async function CourseDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  // Await params (Next.js 15 safe)
  const { id } = await params;

  // Gọi song song: User info + Course Detail
  const [currentUser, courseDetail] = await Promise.all([
    getCurrentUser(),
    getCourseDetail(id),
  ]);

  // --- Kiểm tra Auth ---
  if (!currentUser?.role) {
    return <div className="p-8">Unauthorized: Session expired or invalid.</div>;
  }

  // --- Kiểm tra Course Data ---
  // Đảm bảo dữ liệu trả về đúng cấu trúc
  if (!courseDetail || !courseDetail.course) {
    return (
      <div className="p-8 text-red-500">
        Error: Course not found or access denied.
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-128px)]">
      {/* Sidebar bên trái */}
      <CourseSidebar />

      {/* Khu vực nội dung bên phải */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Component đã tách riêng */}
        <CourseHeader
          courseId={id}
          courseName={courseDetail.course.courseName}
          courseCode={courseDetail.courseCode}
          classGroup={courseDetail.classGroup}
          userRole={currentUser.role}
        />

        {/* Nội dung chính (Page con sẽ được render ở đây) */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
