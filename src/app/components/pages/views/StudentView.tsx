// src/app/components/pages/views/StudentView.tsx
"use client";

import SessionCard from "@/app/components/pages/card/SessionsCard";
import { CourseDetail, GroupedContent } from "./CourseDetailClient";

interface StudentViewProps {
  courseContent: GroupedContent[];
  courseDetail: CourseDetail;
}

export default function StudentView({
  courseContent,
  courseDetail,
}: StudentViewProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{courseDetail.course.courseName}</h1>
        {/* Lấy đúng tên Tutor của lớp học phần này từ root object */}
        <p className="text-lg text-gray-600">
          Instructor:{" "}
          <span className="font-semibold">{courseDetail.tutor}</span>
        </p>
        <p className="text-sm text-gray-500">
          Class Group: {courseDetail.classGroup} | Semester:{" "}
          {courseDetail.semester}
        </p>
      </div>

      {courseContent.length === 0 ? (
        <p>This course has no documents yet.</p>
      ) : (
        courseContent.map((section) => (
          <SessionCard
            key={section.type}
            section={section}
            iconName={section.type}
          />
        ))
      )}
    </div>
  );
}
