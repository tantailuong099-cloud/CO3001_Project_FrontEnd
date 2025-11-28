// src/app/components/card/SummaryModel.tsx
"use client";

import { useState, useEffect } from "react";
import { reportApi } from "@/app/services/reportApi"; //  Import API

// 1. Interface cho data của cái BẢNG CHÍNH (để download)
interface TableDataRow {
  _id: string;
  payload: Record<string, any>;
}

// 2. Interface cho data của MODAL NÀY (data tóm tắt)
interface SummaryData {
  _id: string; // e.g., 'student', 'lecture', 'resource'
  totalAttendance?: number;
  totalTeachingHours?: number;
  totalSessions?: number;
  avgLoad?: number;
  count: number;
}

// 3. Interface cho props (nhận từ ReportButtons)
interface SummaryModalProps {
  onClose: () => void;
  tableData: TableDataRow[]; //  Data cho nút Download
  filterType: string;         //  Filter cho API của modal
  filterSemester: string;     //  Filter cho API của modal
  filterProgram: string;      //  Filter cho API của modal
}

export default function SummaryModal({ 
  onClose, 
  tableData,
  filterType,
  filterSemester,
  filterProgram 
}: SummaryModalProps) {

  // State cho API của modal này
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SummaryData[] | null>(null);

  // 4. Tự động gọi API tóm tắt (summary) khi modal mở
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);

        // Tạo query string từ filter
        const params = new URLSearchParams();
        if (filterType) params.append("type", filterType);
        if (filterSemester) params.append("semester", filterSemester);
        if (filterProgram) params.append("program", filterProgram);
        const queryString = params.toString();

        // Gọi API cho modal
        const res = await reportApi.getResourceSummaryModal(queryString);
        setData(res.data);

      } catch (err: any) {
        setError("Failed to load summary data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchSummary();
    // Chạy 1 lần duy nhất khi modal được render (mở)
  }, []); 

  // 5. Hàm xử lý Download (sử dụng tableData)
  const handleDownload = () => {
    if (!tableData || tableData.length === 0) {
      alert("No table data to download. Please generate a report first.");
      return;
    }

    // 1. Lấy Headers động từ payload của hàng đầu tiên
    const headers = Object.keys(tableData[0].payload);
    let csvContent = headers.join(",") + "\n";

    // Hàm escape (để xử lý nếu data có dấu phẩy)
    const escape = (val: any) => {
      const str = String(val === null || val === undefined ? "" : val);
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    // 2. Tạo các hàng
    tableData.forEach((row) => {
      const values = headers.map(header => row.payload[header]);
      const csvRow = values.map(escape).join(",");
      csvContent += csvRow + "\n";
    });

    // 3. Kích hoạt download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "filtered_report.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 6. Hàm render nội dung (Loading/Error/Data)
  const renderSummaryContent = () => {
    if (loading) return <p className="text-gray-500 p-4">Loading summary...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;
    if (!data || data.length === 0) return <p className="text-gray-500 p-4">No summary data found for these filters.</p>;

    // Render bảng tóm tắt
    return (
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b p-3 font-semibold">Category (Type)</th>
            <th className="border-b p-3 font-semibold text-center">Count</th>
            <th className="border-b p-3 font-semibold text-center">Total Teaching Hours</th>
            <th className="border-b p-3 font-semibold text-center">Total Attendance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row._id} className="hover:bg-gray-50">
              <td className="p-3 text-gray-800">{row._id}</td>
              <td className="p-3 text-gray-800 text-center">{row.count}</td>
              <td className="p-3 text-gray-800 text-center">{row.totalTeachingHours || 'N/A'}</td>
              <td className="p-3 text-gray-800 text-center">{row.totalAttendance || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // 7. Render JSX cuối cùng
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[700px] max-w-full p-6 text-black">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">Summary Report</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Nội dung (đã gọi API) */}
        <div className="overflow-x-auto rounded-md border min-h-[100px]">
          {renderSummaryContent()}
        </div>

        {/* Footer (với 2 nút) */}
        <div className="mt-6 flex justify-between items-center">
          {/* Nút Download Mới */}
          <button
            onClick={handleDownload}
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 text-sm font-medium transition"
          >
            Download Filtered Table (CSV)
          </button>
          
          {/* Nút Close */}
          <button
            onClick={onClose}
            className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 text-sm font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}