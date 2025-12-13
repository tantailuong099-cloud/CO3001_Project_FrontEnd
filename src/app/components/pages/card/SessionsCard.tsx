// src/app/components/pages/card/SessionsCard.tsx

"use client";

import { useState } from "react";
import {
  FileText,
  LucideIcon,
  Trash2,
  ChevronDown,
  ChevronRight,
  Book,
  Presentation,
  Folder,
  ExternalLink,
} from "lucide-react";
// Import interface MaterialItem nếu bạn muốn strict type (hoặc định nghĩa lại ở đây)
import { MaterialItem } from "../views/CourseDetailClient";

const iconMap: { [key: string]: LucideIcon } = {
  General: Folder,
  Reference: Book,
  Slide: Presentation,
  Default: FileText,
};

interface SessionCardProps {
  section: {
    type: string;
    items: MaterialItem[]; // 👈 Cập nhật kiểu dữ liệu ở đây
  };
  iconName: string;
  isManageable?: boolean;
  defaultOpen?: boolean;
  onDelete?: (materialId: string, sharedType: string) => void;
}

export default function SessionCard({
  section,
  iconName,
  isManageable = false,
  defaultOpen = false,
  onDelete,
}: SessionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = iconMap[iconName] || iconMap.Default;

  // Hàm xử lý khi click vào link (để tránh conflict nếu sau này có logic khác)
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    // Nếu url rỗng hoặc không hợp lệ thì chặn lại
    if (!url) e.preventDefault();
  };

  // --- Giao diện cho Student ---
  const StudentCardView = () => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold flex items-center mb-4 text-gray-800">
        <Icon size={20} className="mr-3 text-blue-600" />
        {section.type}
      </h2>
      <div className="space-y-3">
        {section.items.length === 0 ? (
          <p className="text-sm text-gray-400 italic pl-8">
            No documents available.
          </p>
        ) : (
          section.items.map((item) => (
            <div
              key={item._id}
              className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
            >
              <FileText
                size={18}
                className="mr-3 text-gray-500 flex-shrink-0"
              />

              {/* Link tới PDF */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(e, item.pdfUrl)}
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium flex-1 truncate"
                title={item.materialName} // Tooltip khi hover
              >
                {item.materialName}
              </a>

              {/* Icon mở tab mới nhỏ bên cạnh để user dễ biết */}
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );

  // --- Giao diện cho Tutor (Quản lý) ---
  const TutorCardView = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center text-lg font-bold mb-2 text-left text-gray-800 hover:text-blue-600 transition-colors"
      >
        {isOpen ? (
          <ChevronDown size={20} className="mr-3" />
        ) : (
          <ChevronRight size={20} className="mr-3" />
        )}
        <span className="flex items-center gap-2">
          <Icon size={20} /> {section.type}{" "}
          <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {section.items.length}
          </span>
        </span>
      </button>

      {isOpen && (
        <div className="pl-4 space-y-1 mt-2 border-l-2 border-gray-100 ml-2">
          {section.items.length === 0 ? (
            <p className="text-sm text-gray-400 italic pl-4 py-2">
              Empty section
            </p>
          ) : (
            section.items.map((item) => (
              <div
                key={item._id}
                className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center flex-1 overflow-hidden">
                  <FileText size={16} className="mr-3 text-gray-400" />

                  {/* Link Document */}
                  <a
                    href={item.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 hover:underline text-sm truncate block"
                  >
                    {item.materialName}
                  </a>
                </div>

                {/* Nút xóa (Chỉ hiện khi hover vào dòng này) */}
                <button
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-md text-red-400 hover:text-red-600"
                  title="Delete material"
                  onClick={() => {
                    if (onDelete) {
                      onDelete(item._id, section.type.toLowerCase());
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );

  return isManageable ? <TutorCardView /> : <StudentCardView />;
}
