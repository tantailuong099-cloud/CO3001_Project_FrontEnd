// src/app/components/pages/my-course/MyCourseList.tsx

"use client"; // 👈 Bắt buộc: Chuyển thành Client Component

import { useEffect, useState } from "react";
import CourseCard from "@/app/components/pages/card/ClassCard";
import { Loader2 } from "lucide-react";

// Định nghĩa Type cho dữ liệu trả về từ API
interface ClassGroup {
  _id: string;
  courseCode: string;
  classGroup: string;
  tutor: string;
  semester: string;
  course: {
    courseName: string;
    department: string;
  };
}

// Type cho dữ liệu đã được nhóm theo học kỳ
type GroupedCourses = {
  [semester: string]: any[];
};

export default function MyCourseList() {
  const [groupedCourses, setGroupedCourses] = useState<GroupedCourses | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const response = await fetch(`${API_URL}/api/matching/my-course`, {
          // 👇 Quan trọng: Trình duyệt sẽ tự động gửi cookie đi cùng
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          // Lỗi 401 thường do chưa đăng nhập
          if (response.status === 401) {
            setError("Please log in to see your courses.");
          } else {
            setError(errorData.message || "Failed to fetch courses.");
          }
          setGroupedCourses({}); // Set rỗng để không hiển thị loading mãi
          return;
        }

        const classGroups: ClassGroup[] = await response.json();

        // Xử lý và nhóm dữ liệu
        const processedData = classGroups.reduce((acc, classGroup) => {
          const semester = classGroup.semester || "Uncategorized";
          if (!acc[semester]) {
            acc[semester] = [];
          }

          const courseCardData = {
            _id: classGroup._id,
            code: classGroup.courseCode,
            name: classGroup.course.courseName,
            instructor: classGroup.tutor,
            department: classGroup.course.department,
            classCodes: [classGroup.classGroup],
          };

          acc[semester].push(courseCardData);
          return acc;
        }, {} as GroupedCourses);

        setGroupedCourses(processedData);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("An unexpected error occurred.");
        setGroupedCourses({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyCourses();
  }, []); // Chạy 1 lần khi component được mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  if (groupedCourses && Object.keys(groupedCourses).length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        You are not enrolled in any courses for this semester.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {groupedCourses &&
        Object.entries(groupedCourses).map(([semester, courses]) => (
          <div key={semester}>
            <h2 className="text-lg font-bold text-blue-700 mb-3">
              • {semester}
            </h2>
            <div className="space-y-3">
              {(courses as any[]).map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
