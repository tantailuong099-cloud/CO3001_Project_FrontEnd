// src/app/components/pages/button/SubjectDropdown.tsx
"use client";


// 🛑 SỬA: Thêm interface cho props
interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function SubjectDropdown({ value, onChange, label = "Subject" }: DropdownProps) {
  // 🛑 SỬA: Dùng data thật từ DB (allPrograms)
  const subjects = ["CLC", "Đại Trà", "KSTN", "Việt Nhật"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} // 👈 SỬA
      onChange={(e) => onChange(e.target.value)} // 👈 SỬA
    >
      <option value="">{label}</option> {/* 👈 SỬA */}
      {subjects.map(sub => (
        <option key={sub} value={sub}>{sub}</option>
      ))}
    </select>
  );
}