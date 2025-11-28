// src/app/components/pages/button/DepartmentDropdown.tsx
"use client";

// 🛑 SỬA: Thêm interface cho props
interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function DepartmentDropdown({ value, onChange, label = "Department" }: DropdownProps) {
  // 🛑 SỬA: Dùng data thật từ DB
  const departments = ["CNTT", "Kinh tế"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} // 👈 SỬA
      onChange={(e) => onChange(e.target.value)} // 👈 SỬA
    >
      <option value="">{label}</option> {/* 👈 SỬA */}
      {departments.map(dept => (
        <option key={dept} value={dept}>{dept}</option>
      ))}
    </select>
  );
}