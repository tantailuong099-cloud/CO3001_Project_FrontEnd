// src/app/components/PdfPreviewer.tsx

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import PdfThumbnailImage from "./PdfThumbNail";

interface PdfPreviewerProps {
  pdfUrl: string;
  // Bỏ mainCoverUrl vì nó chính là ảnh đầu tiên trong mảng
  previewPages: string[];
}

export default function PdfPreviewer({
  pdfUrl,
  previewPages,
}: PdfPreviewerProps) {
  // 1. Thêm state để theo dõi index của ảnh đang được hiển thị
  // Bắt đầu từ 0 (ảnh đầu tiên)
  const [currentIndex, setCurrentIndex] = useState(0);

  // 2. Hàm xử lý khi bấm nút "Next"
  const handleNext = () => {
    // Chỉ tăng index nếu chưa phải là ảnh cuối cùng
    if (currentIndex < previewPages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 3. Hàm xử lý khi bấm nút "Previous"
  const handlePrev = () => {
    // Chỉ giảm index nếu chưa phải là ảnh đầu tiên
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full bg-white p-4 shadow-md rounded-lg flex flex-col items-center h-full">
      {/* Nút Download */}
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-gray-700 text-white py-2 rounded-md mb-4 hover:bg-gray-800 transition flex items-center justify-center gap-2"
      >
        <Download size={16} />
        Download document
      </a>

      {/* Ảnh chính (lớn) - Lấy ảnh từ mảng dựa trên currentIndex */}
      <div className="w-full mb-4 flex-1">
        <PdfThumbnailImage
          src={previewPages[currentIndex]} // 👈 Hiển thị ảnh theo index
          alt="Document page preview"
          className="rounded-md w-full h-full object-contain"
        />
      </div>

      {/* Dải ảnh thumbnail nhỏ */}
      <div className="flex justify-center items-center w-full gap-2">
        {/* 👇 4. Gắn hàm handlePrev vào onClick và thêm logic disabled */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0} // Vô hiệu hóa khi ở ảnh đầu tiên
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <div className="flex gap-1 overflow-hidden">
          {previewPages.map((pageUrl, index) => (
            <div
              key={index}
              // Khi click thumbnail, cập nhật trực tiếp index
              onClick={() => setCurrentIndex(index)}
              className={
                `w-10 h-14 border-2 rounded-sm cursor-pointer hover:opacity-80 transition-all
                ${
                  currentIndex === index ? "border-blue-500" : "border-gray-300"
                }` // Highlight ảnh đang được chọn
              }
            >
              <PdfThumbnailImage
                src={pageUrl}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 👇 5. Gắn hàm handleNext vào onClick và thêm logic disabled */}
        <button
          onClick={handleNext}
          disabled={currentIndex === previewPages.length - 1} // Vô hiệu hóa khi ở ảnh cuối
          className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
