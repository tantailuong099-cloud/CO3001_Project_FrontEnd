// src/app/components/pages/views/TutorView.tsx
"use client";

import SessionCard from "@/app/components/pages/card/SessionsCard";
import UploadDocumentForm from "@/app/components/pages/card/UploadDocumentForm";
import { CourseDetail, GroupedContent } from "./CourseDetailClient";
//... import các interface cần thiết

interface TutorViewProps {
  courseContent: GroupedContent[];
  courseDetail: CourseDetail; // 👈 Nhận thêm prop này
  courseId: string;
}

export default function TutorView({
  courseContent,
  courseDetail,
  courseId,
}: TutorViewProps) {
  const handleUploadSuccess = () => {
    // Cách đơn giản nhất để refresh là reload lại trang
    // router.refresh() của Next.js cũng là một lựa chọn tốt
    window.location.reload();
    console.log("Upload successful! Refreshing data...");
  };
  return (
    <div className="p-8">
      {/* Hiển thị tên môn học và nhóm lớp */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{courseDetail.course.courseName}</h1>
        <p className="text-lg text-gray-600">
          Class Group: {courseDetail.classGroup}
        </p>
      </div>

      <div className="space-y-4">
        {courseContent.length === 0 ? (
          <p>
            This course has no documents yet. You can start by uploading one
            below.
          </p>
        ) : (
          courseContent.map((section) => (
            <SessionCard
              key={section.type}
              section={section}
              iconName={section.type}
              isManageable={true}
              defaultOpen={section.type === "Reference"}
            />
          ))
        )}
      </div>

      <hr className="my-8" />

      <UploadDocumentForm
        courseId={courseId}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
}
