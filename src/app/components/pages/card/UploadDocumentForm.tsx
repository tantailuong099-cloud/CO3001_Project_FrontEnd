// src/app/components/pages/card/UploadDocumentForm.tsx

"use client";

import { useState } from "react";
import { Loader2, Upload, CheckCircle, AlertCircle } from "lucide-react";

// Import FilePond và CSS
import { FilePond, registerPlugin } from "react-filepond";

import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Đăng ký plugin để chỉ cho phép upload file PDF
registerPlugin(FilePondPluginFileValidateType);

interface UploadDocumentFormProps {
  courseId: string; // Nhận courseId để biết đang ở khóa nào (dù API create chưa dùng)
  onUploadSuccess: () => void; // Callback để báo cho component cha refresh dữ liệu
}

export default function UploadDocumentForm({
  courseId,
  onUploadSuccess,
}: UploadDocumentFormProps) {
  // State cho các trường trong form
  // State
  const [materialName, setMaterialName] = useState("");
  const [overview, setOverview] = useState("");
  const [description, setDescription] = useState("");
  const [sharedtype, setSharedType] = useState("slide");
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!materialName || files.length === 0) {
      setError("Please enter document name and select a PDF file.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("materialName", materialName);
    formData.append("overview", overview);
    formData.append("description", description);
    formData.append("type", "shared");
    formData.append("sharedType", sharedtype);
    formData.append("courseId", courseId);
    // ❌ KHÔNG gửi author nữa
    // formData.append("author", userId);

    // Nếu cần link với courseId
    // formData.append("courseId", courseId);

    formData.append("pdfFile", files[0].file);

    console.log(formData);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      const response = await fetch(`${API_URL}/api/materials/create`, {
        method: "POST",
        body: formData,
        // 👇 QUAN TRỌNG: Để backend nhận được Cookie/Token của user
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed.");
      }

      setSuccess("Document uploaded successfully!");
      // Reset form
      setMaterialName("");
      setOverview("");
      setDescription("");
      setFiles([]);
      onUploadSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-blue-700 mb-4">
        Upload New Document
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4"
      >
        {/* Thông báo Lỗi / Thành công */}
        {error && (
          <div className="p-3 bg-red-50 text-red-600 border border-red-200 rounded-md flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-50 text-green-600 border border-green-200 rounded-md flex items-center gap-2">
            <CheckCircle size={16} /> {success}
          </div>
        )}

        {/* Các trường input */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="materialName"
              className="block text-sm font-medium text-gray-700"
            >
              Document Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="materialName"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="overview"
            className="block text-sm font-medium text-gray-700"
          >
            Overview/Description
          </label>
          <input
            type="text"
            id="overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-900"
          />
        </div>
        <div>
          <label
            htmlFor="sharedtype"
            className="block text-sm font-medium text-gray-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="sharedtype"
            value={sharedtype}
            onChange={(e) => setSharedType(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
            required
          >
            <option value="slide">Slide</option>
            <option value="reference">Reference</option>
            <option value="general">General</option>
          </select>
        </div>

        {/* Vùng upload file PDF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PDF File <span className="text-red-500">*</span>
          </label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            allowMultiple={false}
            maxFiles={1}
            name="pdfFile" // Tên này phải trùng với @UploadedFile() trong NestJS
            labelIdle='Drag & Drop your PDF here or <span class="filepond--label-action">Browse</span>'
            acceptedFileTypes={["application/pdf"]} // Chỉ cho phép file PDF
            required
          />
        </div>

        {/* Nút bấm */}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Upload size={16} />
            )}
            {isLoading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={() => {
              /* Logic reset form nếu cần */
            }}
            className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
