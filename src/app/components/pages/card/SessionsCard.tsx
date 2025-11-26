'use client';

import { useState } from 'react';
import { FileText, LucideIcon, Trash2, ChevronDown, ChevronRight, Book, Presentation, Folder } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  General: Folder,
  Reference: Book,
  Slide: Presentation,
  Default: FileText,
};

interface SessionCardProps {
  section: {
    type: string;
    items: string[];
  };
  iconName: string;
  isManageable?: boolean; 
  defaultOpen?: boolean; 
}

export default function SessionCard({ section, iconName, isManageable = false, defaultOpen = false }: SessionCardProps) {
  // State để quản lý trạng thái mở/đóng, chỉ dùng khi isManageable = true
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = iconMap[iconName] || iconMap.Default;

  // Giao diện cho Student (và mặc định)
  const StudentCardView = () => (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-bold flex items-center mb-4">
        <Icon size={20} className="mr-3 text-gray-600" />
        {section.type}
      </h2>
      <div className="space-y-3">
        {section.items.map(item => (
          <a key={item} href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 border-b last:border-b-0">
            <FileText size={18} className="mr-4 text-gray-500" />
            <span className="text-blue-600 hover:underline">{item}</span>
          </a>
        ))}
      </div>
    </div>
  );

  // Giao diện quản lý cho Tutor
  const TutorCardView = () => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center text-lg font-bold mb-2 text-left"
      >
        {isOpen ? <ChevronDown size={20} className="mr-3" /> : <ChevronRight size={20} className="mr-3" />}
        {section.type}
      </button>
      {isOpen && (
        <div className="pl-8 space-y-2">
          {section.items.map(item => (
            <div key={item} className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-100 border-b last:border-b-0">
              <div className="flex items-center">
                <Icon size={18} className="mr-4 text-gray-500" />
                <a href="#" className="text-blue-600 hover:underline text-sm">{item}</a>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Trả về giao diện tương ứng
  return isManageable ? <TutorCardView /> : <StudentCardView />;
}