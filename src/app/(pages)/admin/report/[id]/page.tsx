"use client";

import { useParams } from "next/navigation";
import ReportFilters from "@/app/components/button/ReportFilters";
import ReportButtons from "@/app/components/button/ReportButtons";

// Dropdowns (mỗi file riêng như bạn yêu cầu)
import DepartmentDropdown from "@/app/components/button/DepartmentDropdown";
import SemesterDropdown from "@/app/components/button/SemesterDropdown";
import SubjectDropdown from "@/app/components/button/SubjectDropdown";

export default function ReportDetailPage() {
  const { id } = useParams();

  // ------------------------------
  // Resource Allocation (giữ nguyên như trước)
  // ------------------------------
  if (id === "resource-allocation") {
    return (
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        <ReportFilters />

        <div className="grid grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-white border rounded-md shadow-sm p-2">
              <img
                src={`/image/fig${n}.png`}
                alt={`Chart ${n}`}
                className="w-full h-64 object-contain"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <ReportButtons />
        </div>

        <div className="bg-white border rounded-md shadow-sm mt-8 overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-100 border-b sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2">Resource ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Building</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array(30)
                  .fill(null)
                  .map((_, i) => (
                    <tr key={i} className="even:bg-gray-50">
                      <td className="px-4 py-2">R{i + 1}</td>
                      <td className="px-4 py-2">Resource {i + 1}</td>
                      <td className="px-4 py-2">Building {i + 1}</td>
                      <td className="px-4 py-2">Type {i + 1}</td>
                      <td className="px-4 py-2">Active</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------
  // Student Participation (Student Performance) - match image
  // ------------------------------
  if (id === "student-participation") {
    return (
      <div className="min-h-screen bg-white p-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-[#0062FF]">
          Student Performance
        </h1>

        {/* Filters row: left dropdowns, right Generate button */}
        <div className="mt-6 mx-6 flex items-center justify-between">
          {/* left: dropdowns */}
          <div className="flex items-center gap-3">
            <DepartmentDropdown />
            <SemesterDropdown />
            <SubjectDropdown />
          </div>

          {/* right: Generate Report */}
          <div>
            <button className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800 transition text-sm">
              Generate Report
            </button>
          </div>
        </div>

        {/* Table container: background + sticky header + inner scroll */}
        <div className="mx-6 mt-4 border rounded-md shadow-sm bg-[#f0f6f8]">
          {/* header row above table (thin colored header like image) */}
          <div className="bg-[#e8e2e2] px-3 py-2 flex items-center rounded-t-md border-b">
            <div className="flex-1 text-xs text-gray-700 font-semibold">
              {/* you can put subtitle/extra here if needed */}
            </div>
          </div>

          {/* table with its own vertical scroll */}
          <div className="max-h-[560px] overflow-y-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-[#f3f1f1] sticky top-0 z-10">
                <tr className="text-sm text-gray-800">
                  <th className="px-4 py-3 border-r text-center">Student ID</th>
                  <th className="px-4 py-3 border-r text-center">Last Name</th>
                  <th className="px-4 py-3 border-r text-center">First Name</th>
                  <th className="px-4 py-3 border-r text-center">Class Name</th>
                  <th className="px-4 py-3 border-r text-center">Score(Scale 4)</th>
                  <th className="px-4 py-3 border-r text-center">Score(Scale 10)</th>
                  <th className="px-4 py-3 border-r text-center">Lab score</th>
                  <th className="px-4 py-3 border-r text-center">Assignment score</th>
                  <th className="px-4 py-3 text-center">Final exam score</th>
                </tr>
              </thead>

              <tbody>
                {Array(20)
                  .fill(null)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-[#ecfbfb]" : "bg-white"}`}
                    >
                      <td className="px-4 py-6 text-center border-b">SV{i + 1}</td>
                      <td className="px-4 py-6 text-left border-b">Nguyen</td>
                      <td className="px-4 py-6 text-left border-b">An {i + 1}</td>
                      <td className="px-4 py-6 text-left border-b">KTPM{i + 1}</td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 4).toFixed(2)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* footer inside the same box: NEXT center, page indicator right */}
          <div className="px-6 py-4 bg-[#e9e8e8] flex items-center justify-between rounded-b-md">
            <div></div>
            <div className="text-sm border border-gray-400 px-3 py-1 rounded-md">
              2/5
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------
  // Evaluation Data (placeholder)
  // ------------------------------
    // ------------------------------
  // Evaluation Data (Student Evaluation)
  // ------------------------------
  if (id === "evaluation-data") {
    return (
      <div className="min-h-screen bg-white p-6">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-[#0062FF]">
          Student Evaluation
        </h1>

        {/* Filters row: left dropdowns, right Generate button */}
        <div className="mt-6 mx-6 flex items-center justify-between">
          {/* left: dropdowns */}
          <div className="flex items-center gap-3">
            <DepartmentDropdown />
            <SemesterDropdown />
            {/* Program dropdown thay cho Subject */}
            <SubjectDropdown label="Program" />
          </div>

          {/* right: Generate Report */}
          <div>
            <button className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-800 transition text-sm">
              Generate Report
            </button>
          </div>
        </div>

        {/* Table container */}
        <div className="mx-6 mt-4 border rounded-md shadow-sm bg-[#f0f6f8]">
          <div className="max-h-[560px] overflow-y-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-[#f3f1f1] sticky top-0 z-10">
                <tr className="text-sm text-gray-800">
                  <th className="px-4 py-3 border-r text-center">Student ID</th>
                  <th className="px-4 py-3 border-r text-center">Last Name</th>
                  <th className="px-4 py-3 border-r text-center">First Name</th>
                  <th className="px-4 py-3 border-r text-center">Class Name</th>
                  <th className="px-4 py-3 border-r text-center">GPA (Scale 4)</th>
                  <th className="px-4 py-3 border-r text-center">GPA (Scale 10)</th>
                  <th className="px-4 py-3 border-r text-center">Conduct Score</th>
                  <th className="px-4 py-3 border-r text-center">
                    Cumulative GPA (Scale 4)
                  </th>
                  <th className="px-4 py-3 border-r text-center">
                    Cumulative GPA (Scale 10)
                  </th>
                  <th className="px-4 py-3 border-r text-center">Semester Credits</th>
                  <th className="px-4 py-3 text-center">Accumulated Credits</th>
                </tr>
              </thead>

              <tbody>
                {Array(20)
                  .fill(null)
                  .map((_, i) => (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-[#ecfbfb]" : "bg-white"}`}
                    >
                      <td className="px-4 py-6 text-center border-b">SV{i + 1}</td>
                      <td className="px-4 py-6 text-left border-b">Tran</td>
                      <td className="px-4 py-6 text-left border-b">Binh {i + 1}</td>
                      <td className="px-4 py-6 text-left border-b">KTPM{i + 1}</td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 4).toFixed(2)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 100).toFixed(0)}%
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 4).toFixed(2)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {(Math.random() * 10).toFixed(1)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {Math.floor(Math.random() * 25)}
                      </td>
                      <td className="px-4 py-6 text-center border-b">
                        {Math.floor(Math.random() * 150)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Footer: NEXT + page */}
          <div className="px-6 py-4 bg-[#e9e8e8] flex items-center justify-between rounded-b-md">
            <div></div>
            <div className="text-sm border border-gray-400 px-3 py-1 rounded-md">
              2/5
            </div>
          </div>
        </div>
      </div>
    );
  }


  // ------------------------------
  // Invalid case
  // ------------------------------
  return (
    <div className="p-6 text-center text-red-600">
      <h1 className="text-xl font-semibold">Invalid report type</h1>
    </div>
  );
}
