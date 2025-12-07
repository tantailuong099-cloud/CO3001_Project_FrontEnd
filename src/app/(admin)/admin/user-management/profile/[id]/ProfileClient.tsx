"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCircle,
  Mail,
  Clock,
  BookOpen,
  IdCard,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { api } from "@/app/services/api";

interface SubjectScore {
  Subject: string;
  scores: {
    [key: string]: number | undefined;
  };
  finalScore?: number;
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "Student" | "Tutor" | "Admin";
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  studentId?: string;
  major?: string;
  enrolledCourses?: string[] | string; // Cho phép nhận cả string để xử lý lỗi
  subjects?: SubjectScore[];
  tutorId?: string;
  department?: string;
  assignedCourses?: string[] | string;
  maxStudents?: number;
  phone?: string;
  address?: string;
}

interface ProfileClientProps {
  userId: string;
}

export default function ProfileClient({ userId }: ProfileClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const data = await api.get<UserProfile>(`/api/user/${userId}`);
        setUser(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Could not load user profile.");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 👇 Hàm mới: Xử lý dữ liệu khóa học bị lỗi format string "['CO3069']"
  const cleanCourseData = (
    courses: string[] | string | undefined
  ): string[] => {
    if (!courses) return [];

    // Nếu là mảng thật thì trả về luôn
    if (Array.isArray(courses)) return courses;

    // Nếu là string dạng "['CO101', 'CO102']" hoặc "CO101, CO102"
    if (typeof courses === "string") {
      // Loại bỏ dấu ngoặc vuông, nháy đơn, nháy kép
      const cleaned = courses.replace(/[\[\]'"]/g, "");
      return cleaned
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c !== "");
    }

    return [];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <p className="text-red-500 font-semibold">
          {error || "User not found"}
        </p>
        <button
          onClick={() => router.back()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const displayId =
    user.role === "Student"
      ? user.studentId
      : user.role === "Tutor"
      ? user.tutorId
      : user._id;
  const displayDepartment =
    user.role === "Student" ? user.major : user.department;

  // Xử lý dữ liệu courses qua hàm clean
  const rawCourses =
    user.role === "Student" ? user.enrolledCourses : user.assignedCourses;
  const courses = cleanCourseData(rawCourses);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Page</h1>
          <button
            onClick={() => router.push("/admin/user-management")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            Back to list
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {/* Header Info */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-100">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-16 h-16 text-blue-300" />
              )}
            </div>
            <div className="flex-1 mt-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {user.name}
              </h2>
              {/* Badge Role: Màu đậm hơn để dễ đọc */}
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wide ${
                  user.role === "Admin"
                    ? "bg-red-100 text-red-700"
                    : user.role === "Tutor"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cột trái: Thông tin cá nhân */}
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <h3 className="bg-gray-50 text-lg font-semibold text-gray-900 px-5 py-3 border-b border-gray-200">
                  User Detail
                </h3>
                <div className="bg-white p-5 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Email
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <IdCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.role === "Student"
                          ? "Student ID"
                          : user.role === "Tutor"
                          ? "Tutor ID"
                          : "User ID"}
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {displayId || "N/A"}
                      </p>
                    </div>
                  </div>

                  {user.role !== "Admin" && (
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">
                          {user.role === "Student" ? "Major" : "Department"}
                        </div>
                        <p className="text-base font-semibold text-gray-900">
                          {displayDepartment || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">
                        Joined Date
                      </div>
                      <p className="text-base font-semibold text-gray-900">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Courses */}
            <div className="space-y-6">
              {user.role !== "Admin" && (
                <div className="border border-gray-200 rounded-xl overflow-hidden h-full">
                  <h3 className="bg-gray-50 text-lg font-semibold text-gray-900 px-5 py-3 border-b border-gray-200">
                    {user.role === "Student"
                      ? "Enrolled Courses"
                      : "Assigned Courses"}
                  </h3>
                  <div className="bg-white p-5">
                    {courses && courses.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {courses.map((code, index) => (
                          // 👇 Badge Course: Màu nền rõ hơn, chữ đậm hơn
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-800 text-sm font-bold px-4 py-2 rounded-lg border border-blue-100"
                          >
                            {code}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No courses linked yet.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bảng điểm */}
          {user.role === "Student" && user.subjects && (
            <div className="mt-8 border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Academic Transcript
                </h3>
              </div>

              <div className="overflow-x-auto">
                {user.subjects.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-gray-200">
                        <th className="px-6 py-4 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                          Subject Code
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-sm uppercase tracking-wider">
                          Score Breakdown
                        </th>
                        <th className="px-6 py-4 font-semibold text-gray-500 text-sm uppercase tracking-wider text-center">
                          Final Score
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {user.subjects.map((sub, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {sub.Subject}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {sub.scores &&
                                Object.entries(sub.scores).map(
                                  ([key, value]) => (
                                    <span
                                      key={key}
                                      className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700"
                                    >
                                      {capitalize(key)}:{" "}
                                      <span className="ml-1 text-gray-900">
                                        {value}
                                      </span>
                                    </span>
                                  )
                                )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-block w-12 py-1 rounded text-sm font-bold ${
                                (sub.finalScore || 0) >= 5
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {sub.finalScore ?? "-"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    Student has not received any grades yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
