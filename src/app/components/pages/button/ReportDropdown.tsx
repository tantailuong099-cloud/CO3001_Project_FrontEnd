"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";


export default function ReportDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative h-full">
      {/* Nút chính */}
      <button
        onClick={toggleDropdown}
        className="flex items-center h-full px-4 text-white font-medium hover:bg-[#0a46c7] transition"
      >
        <span>ViewReport</span>
        <FaChevronDown
          className={`ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          size={12}
        />
      </button>

      {/* Menu thả xuống */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-[1px] w-64 bg-[#6B6180] text-white rounded-sm shadow-lg z-50">
          {[
            { label: "ViewReport", href: "/admin/report" },
            { label: "View Resource Allocation", href: "/admin/report/resource-allocation" },
            { label: "View Participation Student", href: "/admin/report/student-participation" },
            { label: "Analyze Evaluation Data", href: "/admin/report/evaluation-data" }
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-[#7B7095] transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
