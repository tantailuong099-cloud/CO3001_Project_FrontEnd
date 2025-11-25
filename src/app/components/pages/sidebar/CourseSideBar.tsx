'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Book, Presentation, Video, Folder } from 'lucide-react';
import { X } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho cấu trúc sidebar
type SidebarItem = {
    title: string;
    icon: React.ElementType;
    children?: { title: string; icon: React.ElementType }[];
};

// Dữ liệu giả lập 
const sidebarData: SidebarItem[] = [
    {
        title: 'General', icon: Folder, children: [
            { title: 'Syllabus', icon: FileText },
            { title: 'Database Systems (CO2013)_Video', icon: Video },
        ]
    },
    {
        title: 'Reference', icon: Book, children: [
            { title: 'Book 1', icon: FileText },
            { title: 'Book 2', icon: FileText },
        ]
    },
    {
        title: 'Slide', icon: Presentation, children: [
            { title: 'Course Introduction', icon: FileText },
            { title: 'Chapter 1', icon: FileText },
            { title: 'Chapter 3', icon: FileText },
        ]
    },
];

export default function CourseSideBar() {
    const [openSections, setOpenSections] = useState<string[]>(['General', 'Reference', 'Slide']);

    const toggleSection = (title: string) => {
        setOpenSections(prev =>
            prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
        );
    };

    return (
        <div className="w-64 h-full bg-white border-r border-gray-300 p-4 flex flex-col">
            <button className="self-end p-1 mb-4 hover:bg-gray-200 rounded-full">
                <X size={20} />
            </button>
            <nav>
                <ul>
                    {sidebarData.map((section) => (
                        <li key={section.title} className="mb-2">
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="w-full flex items-center justify-between text-left p-2 rounded-md hover:bg-gray-100"
                            >
                                <div className="flex items-center">
                                    {openSections.includes(section.title) ? <ChevronDown size={16} className="mr-2" /> : <ChevronRight size={16} className="mr-2" />}
                                    <section.icon size={18} className="mr-3" />
                                    <span className="font-semibold">{section.title}</span>
                                </div>
                            </button>
                            {openSections.includes(section.title) && section.children && (
                                <ul className="pl-6 mt-1 border-l-2 border-gray-200">
                                    {section.children.map((item) => (
                                        <li key={item.title}>
                                            <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 text-sm">
                                                <item.icon size={16} className="mr-3" />
                                                <span>{item.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}