'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CourseNavProps {
  courseId: string;
  userRole: 'Student' | 'Tutor' | 'Admin';
}

export default function CourseNav({ courseId, userRole }: CourseNavProps) {
  const pathname = usePathname(); // 👈 Lấy URL hiện tại, ví dụ: "/courses/123/feedback"

  // Định nghĩa các đường dẫn
  const docPath = `/courses/${courseId}`;
  const managePath = `/courses/${courseId}/manage`;
  const feedbackPath = `/courses/${courseId}/feedback`;
  const progressPath = `/courses/${courseId}/student-progress`;

  // Style chung
  const baseStyle = "px-4 py-2 text-sm font-semibold rounded-md shadow-sm";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "bg-white border border-gray-300 hover:bg-gray-100";

  if (userRole === 'Tutor') {
    return (
      <div className="mt-4 flex space-x-2">
        <Link href={docPath} className={`${baseStyle} ${pathname === docPath ? activeStyle : inactiveStyle}`}>
          Document
        </Link>
        <Link href={managePath} className={`${baseStyle} ${pathname === managePath ? activeStyle : inactiveStyle}`}>
          Manage
        </Link>
        <Link href={feedbackPath} className={`${baseStyle} ${pathname === feedbackPath ? activeStyle : inactiveStyle}`}>
          Feedback
        </Link>
        <Link href={progressPath} className={`${baseStyle} ${pathname === progressPath ? activeStyle : inactiveStyle}`}>
          Student Progress
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Link href={docPath} className={`px-5 py-2 text-sm font-semibold rounded-md shadow-sm mr-2 ${pathname === docPath ? activeStyle : inactiveStyle}`}>
        Course
      </Link>
      <Link href={feedbackPath} className={`px-5 py-2 text-sm font-semibold rounded-md shadow-sm ${pathname === feedbackPath ? activeStyle : inactiveStyle}`}>
        Feedback
      </Link>
    </div>
  );
}