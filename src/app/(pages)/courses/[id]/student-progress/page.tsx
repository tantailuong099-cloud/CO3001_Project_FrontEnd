"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// 1. Định nghĩa Interface dựa trên JSON API trả về
interface Scores {
  midterm: number;
  final: number;
  project: number;
  participation: number;
}

interface StudentProgressData {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  studentId: string;
  scores: Scores | null; // Có thể null nếu chưa có điểm
}

interface ApiResponse {
  studentProgress: StudentProgressData[];
}

export default function StudentProgressPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap params
  const router = useRouter();

  const [studentsData, setStudentsData] = useState<StudentProgressData[]>([]);
  const [selectedStudent, setSelectedStudent] =
    useState<StudentProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. Fetch API Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const res = await fetch(
          `${API_URL}/api/matching/${id}/student-progress`,
          {
            credentials: "include", // Quan trọng để gửi cookie
          }
        );

        if (!res.ok) throw new Error("Failed to fetch student progress");

        const data: ApiResponse = await res.json();
        setStudentsData(data.studentProgress);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudents = studentsData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(studentsData.length / itemsPerPage);

  const handleStudentClick = (student: StudentProgressData) => {
    setSelectedStudent(student);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Student Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Student Performance
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    No.
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Student ID
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">
                    Full Name
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Participation
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Midterm
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Project
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">
                    Final
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-4 text-gray-500">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  currentStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className={`hover:bg-blue-50 cursor-pointer transition ${
                        selectedStudent?._id === student._id
                          ? "bg-blue-100"
                          : ""
                      }`}
                      onClick={() => handleStudentClick(student)}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-mono">
                        {student.studentId || "N/A"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-left">
                        <div className="flex items-center gap-3">
                          <div>
                            <div className="font-semibold">{student.name}</div>
                            <div className="text-xs text-gray-500">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {student.scores?.participation ?? "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {student.scores?.midterm ?? "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {student.scores?.project ?? "-"}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center font-bold text-blue-700">
                        {student.scores?.final ?? "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Scores Section (Chỉ hiện khi chọn 1 sinh viên) */}
        {selectedStudent && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 animate-fade-in-up">
            <h2 className="text-xl font-bold text-blue-600 text-center mb-6 uppercase">
              DETAIL OF {selectedStudent.studentId} - {selectedStudent.name}
            </h2>

            {/* Grid hiển thị điểm chi tiết */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Participation */}
              <ScoreCard
                title="PARTICIPATION"
                score={selectedStudent.scores?.participation}
                color="bg-green-100 border-green-300 text-green-800"
              />

              {/* Midterm */}
              <ScoreCard
                title="MIDTERM EXAM"
                score={selectedStudent.scores?.midterm}
                color="bg-yellow-100 border-yellow-300 text-yellow-800"
              />

              {/* Project */}
              <ScoreCard
                title="PROJECT"
                score={selectedStudent.scores?.project}
                color="bg-purple-100 border-purple-300 text-purple-800"
              />

              {/* Final Exam */}
              <ScoreCard
                title="FINAL EXAM"
                score={selectedStudent.scores?.final}
                color="bg-red-100 border-red-300 text-red-800"
                isBold={true}
              />
            </div>

            {/* Modify Button (Mock) */}
            <div className="text-center">
              <button className="bg-blue-600 text-white px-10 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                Modify Scores
              </button>
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition disabled:opacity-50"
              disabled={currentPage === 1}
            >
              ← Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-md transition ${
                  currentPage === page
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Component con để hiển thị thẻ điểm đẹp hơn
function ScoreCard({
  title,
  score,
  color,
  isBold = false,
}: {
  title: string;
  score: number | undefined;
  color: string;
  isBold?: boolean;
}) {
  return (
    <div
      className={`border rounded-lg overflow-hidden flex flex-col items-center justify-center p-4 ${color}`}
    >
      <div className="text-xs font-bold tracking-wider mb-2 opacity-80">
        {title}
      </div>
      <div className={`text-3xl ${isBold ? "font-extrabold" : "font-bold"}`}>
        {score ?? "--"}
      </div>
    </div>
  );
}
