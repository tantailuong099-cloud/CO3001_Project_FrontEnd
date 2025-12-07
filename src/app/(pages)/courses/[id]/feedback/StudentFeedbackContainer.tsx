// src/app/components/pages/container/StudentFeedbackContainer.tsx
"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import StudentFeedbackForm from "@/app/components/form/StudentFeedbackForm";

export default function StudentFeedbackContainer({
  courseId,
}: {
  courseId: string;
}) {
  const [courseDetail, setCourseDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseInfo = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        // Fetch thông tin lớp học để hiển thị tên môn, giảng viên
        const res = await fetch(`${API_URL}/api/matching/${courseId}`, {
          credentials: "include", // Tự động gửi cookie
        });

        if (!res.ok) throw new Error("Course not found");
        const data = await res.json();
        setCourseDetail(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseInfo();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-8 h-8" />
      </div>
    );
  }

  if (!courseDetail) {
    return (
      <div className="p-8 text-red-500">Course information not available.</div>
    );
  }

  return (
    <StudentFeedbackForm
      courseId={courseId}
      courseName={courseDetail.course.courseName}
      tutorName={courseDetail.tutor}
      classGroup={courseDetail.classGroup}
    />
  );
}
