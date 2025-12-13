// src/app/components/pages/views/CourseDetailClient.tsx

"use client";

import { useEffect, useState } from "react";
import StudentView from "./StudentView";
import TutorView from "./TutorView";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

// --- 1. Cập nhật Interface theo đúng JSON ---

interface User {
  userId: string;
  email: string;
  role: "Student" | "Tutor" | "Admin";
}

interface Session {
  day: string;
  startTime: string;
  endTime: string;
  form?: string;
  location?: string;
}

export interface MaterialItem {
  _id: string;
  materialName: string;
  pdfUrl: string;
  type: string;
  sharedType?: string;
  // các trường khác nếu cần
}

// 2. Cập nhật Interface MaterialsObject
interface MaterialsObject {
  general: MaterialItem[];
  reference: MaterialItem[];
  slide: MaterialItem[];
}

// Interface cho object "course" lồng bên trong
interface CourseInfo {
  _id: string;
  courseCode: string;
  courseName: string;
  department: string;
  description: string;
  duration?: string;
  semester?: string;
  classGroups?: string; // JSON trả về string dạng "['CC01', ...]"
  capacity?: number;
  tutors?: string; // JSON trả về string dạng "['Name', ...]"
}

// Interface chính cho response từ API /matching/:id
export interface CourseDetail {
  _id: string;
  courseCode: string; // Mã môn của lớp học phần (VD: CO3069)
  classGroup: string; // Nhóm lớp (VD: CC01)
  tutor: string; // Tên giảng viên đứng lớp này
  students: string[]; // Danh sách email sinh viên
  registeredCount: number;
  sessions: Session[]; // Lịch học
  status: string;
  semester: string;
  materials: MaterialsObject;
  course: CourseInfo; // Thông tin chi tiết môn học gốc
  createdAt: string;
  updatedAt: string;
}

export interface GroupedContent {
  type: string;
  items: any[];
}

interface CourseDetailClientProps {
  courseId: string;
}

// Hàm helper để nhóm tài liệu
function groupMaterials(
  materials: MaterialsObject | undefined
): GroupedContent[] {
  if (!materials) return [];
  return Object.entries(materials)
    .map(([category, items]) => ({
      type: category.charAt(0).toUpperCase() + category.slice(1),
      items: items || [],
    }))
    .filter((group) => group.items.length > 0);
}

export default function CourseDetailClient({
  courseId,
}: CourseDetailClientProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

        // 2. Sửa đường dẫn API cho đúng: /api/matching/${courseId}
        const [userResponse, courseResponse] = await Promise.all([
          fetch(`${API_URL}/api/auth/verify`, {
            method: "POST",
            credentials: "include",
          }),
          fetch(`${API_URL}/api/matching/${courseId}`, {
            credentials: "include",
          }),
        ]);

        if (!userResponse.ok) {
          throw new Error("Authentication failed. Please log in.");
        }
        const userData = await userResponse.json();
        setCurrentUser(userData);

        if (!courseResponse.ok) {
          throw new Error("Failed to load course details.");
        }
        const courseData = await courseResponse.json();
        setCourseDetail(courseData);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // --- HÀM MỚI ĐỂ XỬ LÝ XÓA ---
  const handleDeleteMaterial = async (
    materialId: string,
    sharedType: string
  ) => {
    // Hiển thị xác nhận trước khi xóa
    if (
      !confirm(
        "Are you sure you want to delete this material? This action cannot be undone."
      )
    ) {
      return;
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const toastId = toast.loading("Deleting material...");

    try {
      const response = await fetch(`${API_URL}/api/materials/${materialId}`, {
        method: "DELETE",
        credentials: "include", // Đừng quên gửi cookie xác thực
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete material.");
      }

      // Xóa thành công, cập nhật UI ngay lập tức
      toast.success("Material deleted successfully!", { id: toastId });

      // Cập nhật state để xóa item khỏi giao diện
      setCourseDetail((prevDetails) => {
        if (!prevDetails) return null;

        // Tạo một bản sao sâu của object để tránh thay đổi state trực tiếp
        const newDetails = JSON.parse(JSON.stringify(prevDetails));

        // Lọc ra item đã bị xóa
        newDetails.materials[sharedType] = newDetails.materials[
          sharedType
        ].filter((item: MaterialItem) => item._id !== materialId);

        return newDetails;
      });
    } catch (err: any) {
      console.error("Deletion error:", err);
      toast.error(err.message || "An error occurred.", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return <p className="p-8 text-center text-red-500">{error}</p>;
  }

  if (!currentUser || !courseDetail) {
    return <p className="p-8 text-center text-gray-500">No data available.</p>;
  }

  const courseContent = groupMaterials(courseDetail.materials);

  return currentUser.role === "Tutor" ? (
    <TutorView
      courseContent={courseContent}
      courseDetail={courseDetail}
      courseId={courseId}
      onDeleteMaterial={handleDeleteMaterial}
    />
  ) : (
    <StudentView courseContent={courseContent} courseDetail={courseDetail} />
  );
}
