"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2 } from "lucide-react";

// Import FilePond và CSS
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

// Đăng ký plugin cho FilePond
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function CreateUserClient() {
  const router = useRouter();
  const [userType, setUserType] = useState<"Tutor" | "Student">("Tutor");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // State quản lý file ảnh
  const [files, setFiles] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

    // Student specific
    major: "",

    // Tutor specific
    department: "",
    maxStudents: 20,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    setIsLoading(true);

    try {
      // 1. Tạo FormData (Bắt buộc dùng FormData để gửi file)
      const submitData = new FormData();

      // Append các trường text
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      submitData.append("role", userType);

      if (userType === "Student") {
        submitData.append("major", formData.major);
        // Không gửi studentId nữa, BE tự sinh
      } else {
        submitData.append("department", formData.department);
        submitData.append("maxStudents", formData.maxStudents.toString());
        // Không gửi tutorId nữa, BE tự sinh
      }

      // 2. Append file Avatar (nếu có)
      if (files.length > 0) {
        submitData.append("avatar", files[0].file);
      }

      // 3. Gọi API trực tiếp bằng fetch (Để trình duyệt tự xử lý Boundary của FormData)
      // Lưu ý: api wrapper của bạn có thể đang set Content-Type: json, nên dùng fetch chay ở đây an toàn hơn
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"; // Sửa port nếu cần

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        // Không set Content-Type header thủ công, để fetch tự làm việc đó với FormData
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      // 4. Thành công
      router.push("/admin/user-management");
    } catch (err: any) {
      console.error("Error creating user:", err);
      setError(err.message || "Failed to create user. Please check inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/admin/user-management");
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8">
          Create New User
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* User Type Switcher */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUserType("Tutor")}
            className={`px-8 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${
              userType === "Tutor"
                ? "bg-blue-50 text-blue-700 border-blue-600"
                : "bg-white text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Tutor
          </button>
          <button
            onClick={() => setUserType("Student")}
            className={`px-8 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${
              userType === "Student"
                ? "bg-blue-50 text-blue-700 border-blue-600"
                : "bg-white text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Student
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="mb-8 shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-3 font-semibold">
            Basic Information
          </div>
          <div className="bg-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>

            {/* 👇 FilePond Avatar Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar (Image)
              </label>
              <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                maxFiles={1}
                name="avatar" /* Tên này phải trùng với @UploadedFile() trong NestJS */
                labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
                acceptedFileTypes={["image/*"]}
              />
            </div>
          </div>
        </div>

        {/* ROLE SPECIFIC INFO */}
        <div className="mb-8 shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white px-6 py-3 font-semibold">
            {userType} Details
          </div>
          <div className="bg-gray-50 p-6">
            {/* Student Form (Đã bỏ Student ID) */}
            {userType === "Student" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    placeholder="Ex: Computer Science"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    * Student ID will be generated automatically.
                  </p>
                </div>
              </div>
            )}

            {/* Tutor Form (Đã bỏ Tutor ID) */}
            {userType === "Tutor" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Ex: Mathematics"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    * Tutor ID will be generated automatically.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Students
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Create User
          </button>
        </div>
      </div>
    </div>
  );
}
