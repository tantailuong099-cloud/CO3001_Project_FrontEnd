"use client";

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function SubjectDropdown({ value, onChange, label = "Subject" }: DropdownProps) {
  // ✅ CẬP NHẬT: Mặc định là CC theo yêu cầu
  const subjects = ["CC"]; 

  return (
    <select 
      className="border border-gray-400 rounded px-2 py-1 text-sm text-black"
      value={value} 
      onChange={(e) => onChange(e.target.value)} 
    >
      <option value="">{label}</option> 
      {subjects.map(sub => (
        <option key={sub} value={sub}>{sub}</option>
      ))}
    </select>
  );
}