// src/app/components/pages/button/ReportButtons.jsx
"use client";
import { useState } from "react";
import SummaryModal from "../card/SummaryModel";

//  SỬA: Nhận thêm props từ page.tsx
export default function ReportButtons({ 
  onGenerate, 
  tableData, 
  filterType, 
  filterSemester, 
  filterProgram 
}) {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <>
      <button 
        className="bg-[#0C54E4] hover:bg-[#041C4C] px-4 py-2 rounded-md text-sm font-medium"
        onClick={onGenerate} // 👈 Nút này gọi hàm của cha
      >
        Generate Report
      </button>

      <button
        className="bg-[#0C54E4] hover:bg-[#041C4C] px-4 py-2 rounded-md text-sm font-medium"
        onClick={() => setShowSummary(true)}
      >
        Summary Report
      </button>

      {/*  SỬA: Truyền tất cả props xuống modal */}
      {showSummary && (
        <SummaryModal 
          onClose={() => setShowSummary(false)} 
          tableData={tableData}
          filterType={filterType}
          filterSemester={filterSemester}
          filterProgram={filterProgram}
        />
      )}
    </>
  );
}