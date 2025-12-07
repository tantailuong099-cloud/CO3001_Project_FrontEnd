"use client";

import { useState, useEffect } from "react";
import { Search, UserCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/app/services/api";

// 1. Cập nhật Interface UIUser: Thêm mongoId để lưu _id
interface UIUser {
  mongoId: string; // 👇 ID thực của MongoDB (ẩn) dùng để redirect
  id: string; // 👇 ID hiển thị (studentId/tutorId)
  name: string;
  major: string;
  type: "student" | "tutor";
}

interface BackendUser {
  _id: string;
  name: string;
  role: string;
  studentId?: string;
  tutorId?: string;
  major?: string;
  department?: string;
}

export default function UserManagementClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"student" | "tutor">("student");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UIUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const roleParam =
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

        // Gọi API lấy danh sách
        const data = await api.get<BackendUser[]>(`/api/user/role/${roleParam}`);

        // 2. Map dữ liệu: Tách biệt _id và display ID
        const mappedUsers: UIUser[] = data.map((u) => ({
          mongoId: u._id, // Lưu _id vào đây để dùng khi click

          // ID hiển thị ưu tiên studentId/tutorId, nếu thiếu thì fallback
          id: u.studentId || u.tutorId || "N/A",

          name: u.name,
          major: u.major || u.department || "N/A",
          type: u.role.toLowerCase() as "student" | "tutor",
        }));

        setUsers(mappedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]);

  const filteredUsers = users.filter(
    (user) =>
      user.type === activeTab &&
      (user.id?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        user.major?.toLowerCase().includes(searchText.toLowerCase()))
  );

  // 3. Sửa hàm xử lý click: Nhận vào mongoId thay vì displayId
  const handleUserDoubleClick = (mongoId: string) => {
    // Redirect bằng _id của MongoDB
    router.push(`/admin/user-management/profile/${mongoId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">User Management</h1>
          <button
            onClick={() => router.push("/admin/user-management/create-user")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            + Add user
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            {/* Tabs */}
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab("student")}
                className={`text-xl font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === "student"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab("tutor")}
                className={`text-xl font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === "tutor"
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                Tutor
              </button>
            </div>

            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search by ID, Name, Major..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600 font-semibold">Error</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 text-sm text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          )}

          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.mongoId} // Dùng mongoId làm key React cho chuẩn
                  // 4. Truyền mongoId vào hàm xử lý
                  onClick={() => handleUserDoubleClick(user.mongoId)}
                  className="flex items-center gap-4 p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors cursor-pointer"
                >
                  <UserCircle className="w-8 h-8 text-blue-600" />
                  {/* Vẫn hiển thị ID đẹp (Student/Tutor ID) */}
                  <span className="font-semibold text-gray-800 min-w-[100px]">
                    {user.id}
                  </span>
                  <span className="text-gray-700 flex-1">{user.name}</span>
                  <span className="text-gray-600 w-1/3 text-right">
                    {activeTab === "student" ? "Major: " : "Department: "}
                    {user.major}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No users found.
              </div>
            )}

            {!isLoading &&
              [...Array(Math.max(0, 8 - filteredUsers.length))].map(
                (_, index) => (
                  <div
                    key={`empty-${index}`}
                    className={`p-4 rounded-lg ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{ height: "64px" }}
                  />
                )
              )}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
            >
              PREVIOUS
            </button>
            <span className="text-lg font-semibold text-gray-700">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
