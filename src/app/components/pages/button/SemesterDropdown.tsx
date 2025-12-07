"use client";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function SemesterDropdown({ value, onChange, label = "Semester" }: DropdownProps) {
  // ✅ CẬP NHẬT: Dữ liệu thật từ DB của bạn
  const semesters = ["2025 Fall", "2025 Spring", "2026 Spring"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    >
      <option value="">{label}</option> 
      {semesters.map(sem => (
        <option key={sem} value={sem}>{sem}</option>
      ))}
    </select>
  );
}