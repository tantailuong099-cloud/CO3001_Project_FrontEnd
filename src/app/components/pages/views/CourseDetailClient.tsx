'use client'; // 👈 BẮT BUỘC: Biến toàn bộ phần hiển thị thành client

import StudentView from './StudentView';
import TutorView from './TutorView';

// Định nghĩa lại các kiểu dữ liệu để component này biết nó đang nhận gì
interface User {
  userId: string;
  email: string;
  role: 'Student' | 'Tutor' | 'Admin';
}

interface CourseDetail {
  // Thêm các trường dữ liệu của course mà bạn cần
  _id: string;
  materials?: any[]; // Mảng tài liệu
  // ... các trường khác
}

interface GroupedContent {
  type: string;
  items: any[];
}

interface CourseDetailClientProps {
  currentUser: User;
  courseDetail: CourseDetail;
  courseId: string;
}

// Hàm helper để nhóm tài liệu, chuyển nó vào đây
function groupMaterialsByCategory(materials: any[]): GroupedContent[] {
    if (!materials || materials.length === 0) return [];
    const grouped = materials.reduce((acc, material) => {
        const category = material.category || 'General';
        if (!acc[category]) {
            acc[category] = { type: category, items: [] };
        }
        acc[category].items.push(material);
        return acc;
    }, {});
    return Object.values(grouped) as GroupedContent[];
}


export default function CourseDetailClient({ currentUser, courseDetail, courseId }: CourseDetailClientProps) {
  // Xử lý dữ liệu bên trong Client Component
  const courseContent = groupMaterialsByCategory(courseDetail.materials || []);

  // Logic render có điều kiện giờ đây nằm hoàn toàn trên client
  return currentUser.role === 'Tutor' 
    ? <TutorView courseContent={courseContent} courseId={courseId} /> 
    : <StudentView courseContent={courseContent} />;
}