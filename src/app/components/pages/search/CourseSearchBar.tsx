// CO3001_Project_FrontEnd_main\src\app\components\pages\search\CourseSearchBar.tsx

"use client";

import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300
          focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
          bg-white text-sm shadow-sm
        "
      />
    </div>
  );
}
