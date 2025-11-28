// src/app/components/pages/button/SemesterDropdown.tsx
"use client";

// 🛑 SỬA: Thêm interface cho props
interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function SemesterDropdown({ value, onChange, label = "Semester" }: DropdownProps) {
  // 🛑 SỬA: Dùng data thật từ DB
  const semesters = ["2025A", "2024A", "2024B"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} // 👈 SỬA
      onChange={(e) => onChange(e.target.value)} // 👈 SỬA
    >
      <option value="">{label}</option> {/* 👈 SỬA */}
      {semesters.map(sem => (
        <option key={sem} value={sem}>{sem}</option>
      ))}
    </select>
  );
}