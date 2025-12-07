// src/app/components/pages/header/CourseHeader.tsx
import CourseNav from "@/app/components/pages/nav/CourseNav";

interface CourseHeaderProps {
  courseName: string;
  courseCode: string;
  classGroup: string;
  courseId: string;
  userRole: "Student" | "Tutor" | "Admin";
}

export default function CourseHeader({
  courseName,
  courseCode,
  classGroup,
  courseId,
  userRole,
}: CourseHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
      <h1 className="text-xl font-bold text-gray-800">
        {courseName} ({courseCode} - {classGroup})
      </h1>
      <CourseNav courseId={courseId} userRole={userRole} />
    </div>
  );
}
