import type { Metadata } from "next";
import { cookies } from 'next/headers';
import { getCurrentUser } from '@/lib/auth';
import CourseDetailClient from '@/app/components/pages/views/CourseDetailClient';

export const metadata: Metadata = {
  title: "Courses Detail",
  description: "Tutor Support System",
};



async function getCourseDetail(courseId: string) {
    const token = cookies().get('access_token')?.value;
    if (!token) return null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/${courseId}`, {
             headers: { 'Cookie': `access_token=${token}` },
             cache: 'no-store',
        });
        if(!res.ok) return null;
        return res.json();
    } catch(e) {
        return null;
    }
}

// function groupMaterialsByCategory(materials: any[]) {
//     if (!materials || materials.length === 0) {
//         return [];
//     }
//     const grouped = materials.reduce((acc, material) => {
//         const category = material.category || 'General';
//         if (!acc[category]) {
//             acc[category] = { type: category, items: [] };
//         }
//         acc[category].items.push(material);
//         return acc;
//     }, {});
//     // Chuyển từ object sang mảng
//     return Object.values(grouped);
// }

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const [currentUser, courseDetail] = await Promise.all([
    getCurrentUser(),
    getCourseDetail(params.id)
  ]);

  if (!currentUser || !courseDetail) {
    return <div className="p-8">Error loading course data. Please try again.</div>;
  }

  return (
    <CourseDetailClient 
      currentUser={currentUser} 
      courseDetail={courseDetail}
      courseId={params.id}
    />
  );
}