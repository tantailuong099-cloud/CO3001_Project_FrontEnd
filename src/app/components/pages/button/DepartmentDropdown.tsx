"use client";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function DepartmentDropdown({ value, onChange, label = "Department" }: DropdownProps) {
  // ✅ CẬP NHẬT: Dữ liệu thật từ DB của bạn
  const departments = ["Computer Science"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    >
      <option value="">{label}</option> 
      {departments.map(dept => (
        <option key={dept} value={dept}>{dept}</option>
      ))}
    </select>
  );
}