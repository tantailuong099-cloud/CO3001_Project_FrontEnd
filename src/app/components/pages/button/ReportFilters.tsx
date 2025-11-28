// src/app/components/pages/button/ReportFilters.tsx
"use client";

// Nhận state và hàm set state từ component cha
interface ReportFiltersProps {
  type: string;
  setType: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  program: string;
  setProgram: (value: string) => void;
}

export default function ReportFilters({
  type,
  setType,
  semester,
  setSemester,
  program,
  setProgram,
}: ReportFiltersProps) {
  
  // (Đây là dữ liệu giả, bạn nên fetch từ API nếu cần)
  const semesters = ["2025A", "2025B", "2024A", "2024B"];
  const programs = ["CLC", "Đại Trà", "KSTN", "Việt Nhật"];
  
  return (
    <div className="flex justify-between gap-4">
      {/* Filter 1: Resource Type */}
      <select 
        className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3 text-black"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Filter by resources...</option>
        <option value="resource">Facility/Resource</option>
        <option value="student">Student</option>
        <option value="lecture">Lecture</option>
      </select>

      {/* Filter 2: Semester */}
      <select 
        className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3 text-black"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">Filter by semester</option>
        {semesters.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Filter 3: Program */}
      <select 
        className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3 text-black"
        value={program}
        onChange={(e) => setProgram(e.target.value)}
      >
        <option value="">Filter by program</option>
        {programs.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
}