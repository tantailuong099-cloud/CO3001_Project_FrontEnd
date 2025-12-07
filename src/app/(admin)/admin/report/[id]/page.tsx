"use client";

import { useParams } from "next/navigation";
import ReportFilters from "@/app/components/pages/button/ReportFilters";
import ReportButtons from "@/app/components/pages/button/ReportButtons";
import DepartmentDropdown from "@/app/components/pages/button/DepartmentDropdown";
import SemesterDropdown from "@/app/components/pages/button/SemesterDropdown";
import SubjectDropdown from "@/app/components/pages/button/SubjectDropdown";
import { useState, useEffect, useMemo } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "@/lib/chartjs"; 
import { 
  reportApi, 
  RawResource, 
  ChartDataPoint, 
  PieChartDataPoint,
} from "@/app/services/reportApi";

interface ColumnDefinition {
  header: string;
  accessor: string;
}

const columnSets: Record<string, ColumnDefinition[]> = {
  "resource": [
    { header: "Resource ID", accessor: "Resource ID" },
    { header: "Name", accessor: "Name" },
    { header: "Building", accessor: "Building" },
    { header: "Type", accessor: "Type" },
    { header: "Status", accessor: "Status" },
  ],
  "student": [
    { header: "Student ID", accessor: "Student ID" },
    { header: "Faculty", accessor: "Faculty" },
    { header: "Month", accessor: "Month" },
    { header: "Attendance", accessor: "AttendanceCount" },
    { header: "Support Hours", accessor: "Support Hours" },
    { header: "Grade", accessor: "Grade" },
  ],
  "lecture": [
    { header: "Lecturer ID", accessor: "Lecturer ID" },
    { header: "Facility", accessor: "Facility" },
    { header: "Month", accessor: "Month" },
    { header: "Hour Taught", accessor: "HourTaught" },
    { header: "Session Count", accessor: "SessionCount" },
    { header: "Teaching Hours", accessor: "Teaching hours" },
  ],
  "student-performance": [
    { header: "Student ID", accessor: "Student ID" },
    { header: "Last Name", accessor: "Last Name" },
    { header: "First Name", accessor: "First Name" },
    { header: "Class Name", accessor: "Class Name" },
    { header: "Score (Scale 4)", accessor: "Score(Scale 4)" },
    { header: "Score (Scale 10)", accessor: "Score(Scale 10)" },
    { header: "Midterm Score", accessor: "Lab score" },         
    { header: "Project Score", accessor: "Assignment score" },  
    { header: "Final Exam Score", accessor: "Final exam score" },
  ],
  "student-evaluation": [
    { header: "Student ID", accessor: "Student ID" },
    { header: "Last Name", accessor: "Last Name" },
    { header: "First Name", accessor: "First Name" },
    { header: "Class Name", accessor: "Class Name" },
    { header: "GPA (Scale 4)", accessor: "GPA (Scale 4)" },
    { header: "GPA (Scale 10)", accessor: "GPA (Scale 10)" },
    { header: "Participation Score", accessor: "Conduct Score" }, 
    { header: "Cumulative GPA (4)", accessor: "Cumulative GPA (Scale 4)" },
    { header: "Cumulative GPA (10)", accessor: "Cumulative GPA (Scale 10)" },
    { header: "Semester Credits", accessor: "Semester Credits" },
    { header: "Accumulated Credits", accessor: "Accumulated Credits" },
  ],
};

type ChartType = 'bar' | 'line' | 'pie';
interface ChartState {
  title: string;
  type: ChartType;
  data: any;
  options: any;
}

export default function ReportDetailPage() {
  const { id } = useParams();

  // Helper function: Tự động tách tên nếu Backend chưa làm
  const processTableData = (data: RawResource[]) => {
    return data.map(item => {
      // Nếu payload có Name hoặc Last Name mà chưa tách
      const fullName = item.payload["Name"] || item.payload["Last Name"] || "";
      // Chỉ tách nếu First Name chưa tồn tại hoặc rỗng
      if (fullName && (!item.payload["First Name"] || item.payload["First Name"] === "")) {
        const parts = fullName.trim().split(" ");
        if (parts.length > 1) {
          item.payload["First Name"] = parts[0]; // Chữ đầu
          item.payload["Last Name"] = parts[parts.length - 1]; // Chữ cuối
        }
      }
      return item;
    });
  };

  const downloadCSV = (data: RawResource[], columns: ColumnDefinition[], filename: string) => {
    if (!data || data.length === 0) { alert("No data to download."); return; }
    const headers = columns.map(c => c.header);
    let csvContent = headers.join(",") + "\n";
    const escape = (val: any) => {
      const str = String(val === null || val === undefined ? "" : val);
      if (str.includes(",") || str.includes("\"") || str.includes("\n")) return `"${str.replace(/"/g, '""')}"`;
      return str;
    };
    data.forEach((row) => {
      const values = columns.map(col => row.payload[col.accessor]);
      csvContent += values.map(escape).join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url); link.setAttribute("download", filename);
    link.style.visibility = 'hidden'; document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  // ------------------------------
  // 1. RESOURCE ALLOCATION
  // ------------------------------
  if (id === "resource-allocation") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasData, setHasData] = useState(false);
    const [chart1, setChart1] = useState<ChartState | null>(null);
    const [chart2, setChart2] = useState<ChartState | null>(null);
    const [chart3, setChart3] = useState<ChartState | null>(null);
    const [tableData, setTableData] = useState<RawResource[]>([]);
    const [filterType, setFilterType] = useState("");
    const [filterSemester, setFilterSemester] = useState("");
    const [filterProgram, setFilterProgram] = useState("");

    const baseOptions = (title: string) => ({ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const, }, title: { display: true, text: title, color: '#333', font: { size: 14 } } }, scales: { x: { ticks: { autoSkip: true } } } });
    const pieOptions = (title: string) => ({ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' as const, }, title: { display: true, text: title, color: '#333', font: { size: 14 } } }, });
    const formatBarData = (label: string, data: ChartDataPoint[], color: string) => ({ labels: data.map(d => d.name), datasets: [{ label, data: data.map(d => d.value), backgroundColor: color, maxBarThickness: 100 }] });
    const formatPieData = (data: PieChartDataPoint[]) => ({ labels: data.map(d => d.name), datasets: [{ data: data.map(d => d.value), backgroundColor: ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"] }] });

    const handleGenerateReport = async () => {
      try {
        setLoading(true); setError(null); setHasData(false);
        const params = new URLSearchParams();
        if (filterType) params.append("type", filterType);
        if (filterSemester) params.append("semester", filterSemester);
        if (filterProgram) params.append("program", filterProgram);
        const queryString = params.toString();
        const type = filterType || "resource"; 
        const tableRes = await reportApi.getRawResourceAllocation(queryString);
        setTableData(tableRes.data);

        if (type === "resource") {
          const [res2, res3, res5] = await Promise.all([ reportApi.getFacilityTypeDistribution(queryString), reportApi.getOccupancyRate(queryString), reportApi.getUsageByBuilding(queryString), ]);
          setChart1({ title: "Resource Occupancy Rate (%)", type: 'line', data: formatBarData("Occupancy Rate (%)", res3.data, '#82ca9d'), options: baseOptions("Resource Occupancy Rate (%)") });
          setChart2({ title: "Inventory by Type", type: 'pie', data: formatPieData(res2.data), options: pieOptions("Inventory by Type") });
          setChart3({ title: "Inventory Count by Building", type: 'bar', data: formatBarData("Count", res5.data, 'rgba(255, 206, 86, 0.6)'), options: baseOptions("Inventory Count by Building") });
        } else if (type === "lecture") {
           const [res1, res2, res5] = await Promise.all([ reportApi.getFacilityUsageByMonth(queryString), reportApi.getFacilityTypeDistribution(queryString), reportApi.getUsageByBuilding(queryString), ]);
           setChart1({ title: "Teaching Hours by Month", type: 'bar', data: formatBarData("Teaching Hours", res1.data, 'rgba(54, 162, 235, 0.6)'), options: baseOptions("Teaching Hours by Month") });
           setChart2({ title: "Workload: Lecture vs. Lab Hours", type: 'pie', data: formatPieData(res2.data), options: pieOptions("Workload: Lecture vs. Lab Hours") });
           setChart3({ title: "Teaching Hours by Facility", type: 'bar', data: formatBarData("Teaching Hours", res5.data, 'rgba(255, 206, 86, 0.6)'), options: baseOptions("Teaching Hours by Facility") });
        } else if (type === "student") {
           const [res1, resStudent2, resStudent3] = await Promise.all([ reportApi.getFacilityUsageByMonth(queryString), reportApi.getStudentEngagement(queryString), reportApi.getSupportHoursByFaculty(queryString), ]);
           setChart1({ title: "Support Hours by Month", type: 'bar', data: formatBarData("Support Hours", res1.data, 'rgba(54, 162, 235, 0.6)'), options: baseOptions("Support Hours by Month") });
           setChart2({ title: "Student Engagement (Active vs. Inactive)", type: 'pie', data: formatPieData(resStudent2.data), options: pieOptions("Student Engagement (Active vs. Inactive)") });
           setChart3({ title: "Support Hours by Faculty", type: 'bar', data: formatBarData("Support Hours", resStudent3.data, 'rgba(255, 99, 132, 0.6)'), options: baseOptions("Support Hours by Faculty") });
        }
        setHasData(true);
      } catch (err: any) { setError(err.message || "Failed to fetch report data."); } finally { setLoading(false); }
    };

    useEffect(() => { handleGenerateReport(); }, []);
    const currentColumns = useMemo(() => { const key = filterType || "resource"; return columnSets[key]; }, [filterType]);
    const renderChartBox = (chart: ChartState | null) => {
       if (!chart) return <div className="bg-white border rounded-md shadow-sm p-4 h-70 flex items-center justify-center text-gray-400">(Trống)</div>;
       return ( <div className="bg-white border rounded-md shadow-sm p-4 h-70"> <div className="relative h-64"> {chart.type === 'bar' && <Bar options={chart.options} data={chart.data} />} {chart.type === 'line' && <Line options={chart.options} data={chart.data} />} {chart.type === 'pie' && <Pie options={chart.options} data={chart.data} />} </div> </div> );
    };

    return (
      <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
        <ReportFilters type={filterType} setType={setFilterType} semester={filterSemester} setSemester={setFilterSemester} program={filterProgram} setProgram={setFilterProgram} />
        <div className="flex justify-end gap-4"> <ReportButtons onGenerate={handleGenerateReport} tableData={tableData} filterType={filterType} filterSemester={filterSemester} filterProgram={filterProgram} /> </div>
        {loading && <div className="p-6 text-center text-gray-500">Loading report data...</div>}
        {error && <div className="p-6 text-center text-red-600">Error: {error}</div>}
        {!loading && !error && hasData && (
          <>
            <div className="grid grid-cols-3 gap-6"> {renderChartBox(chart1)} {renderChartBox(chart2)} {renderChartBox(chart3)} </div>
            <div className="bg-[#CDDCF9] border rounded-md shadow-sm mt-8 overflow-hidden text-black">
              <div className="max-h-[500px] overflow-y-auto">
                <table className="min-w-full text-sm text-center border-separate border-spacing-0">
                  <thead className="bg-[#5D8DED] border-b sticky top-0 z-10">
                    {/* ✅ FIX: Viết liền mạch tr và map để tránh whitespace */}
                    <tr className="text-sm text-gray-800">{currentColumns.map((col) => (
                      <th key={col.accessor} className="px-4 py-2 border-r">{col.header}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, i) => (
                      <tr key={`${row._id}-${i}`} className={i % 2 === 0 ? "bg-[#E9F5FF]" : "bg-white"}>{currentColumns.map((col) => (
                          <td key={col.accessor} className="px-4 py-2 border-b">
                            {row.payload[col.accessor] ?? 'N/A'}
                          </td>
                        ))}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {!loading && !hasData && !error && <div className="p-6 text-center text-gray-500">Please select filters and click "Generate Report" to view data.</div>}
      </div>
    );
  }

  // ------------------------------
  // 💎 2. STUDENT PERFORMANCE
  // ------------------------------
  if (id === "student-participation") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tableData, setTableData] = useState<RawResource[]>([]);
    
    // Filter State
    const [filterDept, setFilterDept] = useState("");
    const [filterSemester, setFilterSemester] = useState("");
    const [filterSubject, setFilterSubject] = useState(""); 
    
    const currentColumns = useMemo(() => columnSets["student-performance"], []);

    const handleGenerateReport = async () => {
      try {
        setLoading(true); setError(null);
        const params = new URLSearchParams();
        if (filterSemester) params.append("semester", filterSemester);
        if (filterSubject) params.append("program", filterSubject);
        if (filterDept) params.append("department", filterDept); 
        
        const res = await reportApi.getRawStudentPerformance(params.toString());
        // ✅ Xử lý tách tên tại đây
        setTableData(processTableData(res.data));
      } catch (err: any) { setError(err.message || "Failed to fetch report data."); } finally { setLoading(false); }
    };

    const handleDownloadReport = () => { downloadCSV(tableData, currentColumns, "student_performance.csv"); };
    useEffect(() => { handleGenerateReport(); }, []);

    return (
      <div className="min-h-screen bg-white p-6">
        <h1 className="text-4xl font-extrabold text-center text-[#0062FF]">Student Performance</h1>
        <div className="mt-6 mx-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DepartmentDropdown value={filterDept} onChange={setFilterDept} />
            <SemesterDropdown value={filterSemester} onChange={setFilterSemester} />
            <SubjectDropdown value={filterSubject} onChange={setFilterSubject} label="Program" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleGenerateReport} className="bg-[#0C54E4] hover:bg-[#041C4C] text-white px-4 py-1 rounded transition text-sm" disabled={loading}>
              {loading ? "Generating..." : "Generate Report"}
            </button>
            <button onClick={handleDownloadReport} className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1 rounded transition text-sm" disabled={loading || tableData.length === 0}>
              Download CSV
            </button>
          </div>
        </div>
        
        {error && <div className="p-3 text-center text-red-600">Error: {error}</div>}

        <div className="mx-6 mt-4 border rounded-md shadow-sm bg-[#CDDCF9] overflow-hidden">
          <div className="max-h-[560px] overflow-y-auto text-black">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0 text-black">
              <thead className="bg-[#5D8DED] sticky top-0 z-10">
                {/* ✅ FIX Whitespace */}
                <tr className="text-sm text-gray-800">{currentColumns.map(col => (
                    <th key={col.accessor} className="px-4 py-3 border-r text-center">{col.header}</th>
                  ))}</tr>
              </thead>
              
              {/* ✅ FIX Whitespace */}
              <tbody>
                {tableData.length > 0 ? (
                  tableData.filter(row => row.payload && row.payload["Student ID"]).map((row, i) => (
                    <tr key={`${row._id}-${i}`} className={i % 2 === 0 ? "bg-[#E9F5FF]" : "bg-white"}>{currentColumns.map(col => (
                        <td key={col.accessor} className="px-4 py-6 text-center border-b">
                          {row.payload[col.accessor] ?? 'N/A'}
                        </td>
                      ))}</tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={currentColumns.length} className="p-6 text-center text-gray-500 bg-white">
                      {loading ? "Loading..." : "No data. Please click Generate Report."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------
  // 💎 3. EVALUATION DATA
  // ------------------------------
  if (id === "evaluation-data") {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tableData, setTableData] = useState<RawResource[]>([]);
    const [filterDept, setFilterDept] = useState("");
    const [filterSemester, setFilterSemester] = useState("");
    const [filterSubject, setFilterSubject] = useState("");
    const currentColumns = useMemo(() => columnSets["student-evaluation"], []);

    const handleGenerateReport = async () => {
      try {
        setLoading(true); setError(null);
        const params = new URLSearchParams();
        if (filterSemester) params.append("semester", filterSemester);
        if (filterSubject) params.append("program", filterSubject);
        if (filterDept) params.append("department", filterDept); 
        const res = await reportApi.getRawStudentEvaluation(params.toString());
        // ✅ Xử lý tách tên tại đây luôn
        setTableData(processTableData(res.data));
      } catch (err: any) { setError(err.message || "Failed to fetch report data."); } finally { setLoading(false); }
    };
    const handleDownloadReport = () => { downloadCSV(tableData, currentColumns, "student_evaluation.csv"); };
    useEffect(() => { handleGenerateReport(); }, []);

    return (
      <div className="min-h-screen bg-white p-6">
        <h1 className="text-4xl font-extrabold text-center text-[#0062FF]">Student Evaluation</h1>
        <div className="mt-6 mx-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DepartmentDropdown value={filterDept} onChange={setFilterDept} />
            <SemesterDropdown value={filterSemester} onChange={setFilterSemester} />
            <SubjectDropdown value={filterSubject} onChange={setFilterSubject} label="Program" />
          </div>
          <div className="flex gap-2">
            <button onClick={handleGenerateReport} className="bg-[#0C54E4] hover:bg-[#041C4C] text-white px-4 py-1 rounded transition text-sm" disabled={loading}> {loading ? "Generating..." : "Generate Report"} </button>
            <button onClick={handleDownloadReport} className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-1 rounded transition text-sm" disabled={loading || tableData.length === 0}> Download CSV </button>
          </div>
        </div>
        {error && <div className="p-3 text-center text-red-600">Error: {error}</div>}
        <div className="mx-6 mt-4 border rounded-md shadow-sm bg-[#CDDCF9] overflow-hidden">
          <div className="max-h-[560px] overflow-y-auto text-black">
            <table className="min-w-full text-sm text-left border-separate border-spacing-0">
              <thead className="bg-[#5D8DED] sticky top-0 z-10">
                {/* ✅ FIX Whitespace */}
                <tr className="text-sm text-gray-800">{currentColumns.map(col => (
                    <th key={col.accessor} className="px-4 py-3 border-r text-center">{col.header}</th>
                  ))}</tr>
              </thead>
              {/* ✅ FIX Whitespace */}
              <tbody>
                {tableData.length > 0 ? (
                  tableData.filter(row => row.payload && row.payload["Student ID"]).map((row, i) => (
                    <tr key={`${row._id}-${i}`} className={i % 2 === 0 ? "bg-[#E9F5FF]" : "bg-white"}>{currentColumns.map(col => (
                        <td key={col.accessor} className="px-4 py-6 text-center border-b">
                          {row.payload[col.accessor] ?? 'N/A'}
                        </td>
                      ))}</tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={currentColumns.length} className="p-6 text-center text-gray-500 bg-white">
                      {loading ? "Loading..." : "No data. Please click Generate Report."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  return <div className="p-6 text-center text-red-600"><h1 className="text-xl font-semibold">Invalid report type</h1></div>;
}