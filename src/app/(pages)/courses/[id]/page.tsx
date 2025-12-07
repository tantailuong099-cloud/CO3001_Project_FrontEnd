// src/app/(pages)/my-course/[id]/page.tsx

import type { Metadata } from "next";
import CourseDetailClient from "@/app/components/pages/views/CourseDetailClient"; // 👈 Import component mới

// Metadata vẫn có thể để ở đây, nhưng nó sẽ là tĩnh
export const metadata: Metadata = {
  title: "Course Detail",
  description: "Tutor Support System",
};

// Component giờ đây rất đơn giản
export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Chỉ cần render Client Component và truyền ID vào
  const { id } = await params;
  return <CourseDetailClient courseId={id} />;
}
