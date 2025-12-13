// src/app/components/pages/card/ClassCard.tsx

import Link from "next/link";

// 1. Định nghĩa Type cho props, khớp với dữ liệu đã được xử lý
interface Course {
  _id: string; // Hoặc id, tùy vào dữ liệu bạn truyền
  name: string;
  code: string;
  instructor: string;
  department: string;
  classCodes: string[];
}

interface Tutor {
  _id: string;
  name: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    // Link đến trang chi tiết của lớp học (thay đổi URL nếu cần)
    <Link
      href={`/courses/${course._id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
    >
      <div className="flex flex-col">
        {/* Dòng 1: Tên môn học (Mã môn) [Mã lớp] */}
        <h3 className="font-semibold text-gray-800">
          {course.name} ({course.code})
          {/* Hiển thị các mã lớp học, ví dụ: (CLC HK251) [CC01] */}
          <span className="ml-2 font-normal text-gray-600">
            ({course.classCodes.join(" ")})
          </span>
        </h3>

        {/* Dòng 2: Tên giảng viên / Khoa */}
        <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
        <p className="text-sm text-gray-500">{course.department}</p>
      </div>
    </Link>
  );
}
