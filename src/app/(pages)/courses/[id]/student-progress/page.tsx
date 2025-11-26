"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StudentPerformance {
  num: number;
  studentId: string;
  lastName: string;
  firstName: string;
  quizScore: number;
  labScore: number;
  assignmentScore: number;
  finalExamScore: number;
}

interface DetailScore {
  lab: { num: number; score: number }[];
  assignment: { num: number; score: number }[];
  quiz: { num: number; score: number }[];
  finalExam: { score: number };
}

export default function StudentProgressPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Student Progress");
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformance | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const studentsData: StudentPerformance[] = [
    { num: 1, studentId: "2353059", lastName: "Luong Tan", firstName: "Tai", quizScore: 10, labScore: 10, assignmentScore: 10, finalExamScore: 10 },
    { num: 1, studentId: "2353059", lastName: "Luong Tan", firstName: "Tai", quizScore: 10, labScore: 10, assignmentScore: 10, finalExamScore: 10 },
    { num: 1, studentId: "2353059", lastName: "Luong Tan", firstName: "Tai", quizScore: 10, labScore: 10, assignmentScore: 10, finalExamScore: 10 },
    { num: 1, studentId: "2353059", lastName: "Luong Tan", firstName: "Tai", quizScore: 10, labScore: 10, assignmentScore: 10, finalExamScore: 10 },
    { num: 1, studentId: "2353059", lastName: "Luong Tan", firstName: "Tai", quizScore: 10, labScore: 10, assignmentScore: 10, finalExamScore: 10 },
  ];

  const detailScores: DetailScore = {
    lab: [
      { num: 1, score: 10 },
      { num: 2, score: 10 },
      { num: 3, score: 10 },
    ],
    assignment: [
      { num: 1, score: 10 },
      { num: 2, score: 10 },
      { num: 3, score: 10 },
    ],
    quiz: [
      { num: 1, score: 8 },
      { num: 2, score: 9 },
      { num: 3, score: 9 },
    ],
    finalExam: { score: 7 },
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const courseId = params.id;
    
    switch(tab) {
      case "Document":
        router.push(`/courses/${courseId}`);
        break;
      case "Manage":
        router.push(`/courses/${courseId}/manage`);
        break;
      case "Feedback":
        router.push(`/courses/${courseId}/feedback`);
        break;
      case "Student Progress":
        router.push(`/courses/${courseId}/student-progress`);
        break;
    }
  };

  const handleStudentClick = (student: StudentPerformance) => {
    setSelectedStudent(student);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
          

        {/* Student Performance Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">Student Performance</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Num</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Student ID</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Last Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">First Name</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Quiz score</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Lab score</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Assignment score</th>
                  <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-800">Final exam score</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => handleStudentClick(student)}
                  >
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.num}.</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.studentId}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.lastName}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.firstName}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.quizScore}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.labScore}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.assignmentScore}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">{student.finalExamScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Scores Section */}
        {selectedStudent && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-600 text-center mb-6">
              DETAIL OF {selectedStudent.studentId} - {selectedStudent.lastName.toUpperCase()} {selectedStudent.firstName.toUpperCase()}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* LAB Scores */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-orange-300 px-4 py-2 flex justify-between items-center">
                  <span className="font-bold text-gray-800">LAB</span>
                  <span className="font-bold text-gray-800">SCORE</span>
                </div>
                <div className="divide-y divide-gray-300">
                  {detailScores.lab.map((lab) => (
                    <div key={lab.num} className="px-4 py-2 flex justify-between items-center bg-white">
                      <span className="text-gray-700">{lab.num}</span>
                      <span className="text-gray-700">{lab.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ASSIGNMENT Scores */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-orange-300 px-4 py-2 flex justify-between items-center">
                  <span className="font-bold text-gray-800">ASSIGNMENT</span>
                  <span className="font-bold text-gray-800">SCORE</span>
                </div>
                <div className="divide-y divide-gray-300">
                  {detailScores.assignment.map((assignment) => (
                    <div key={assignment.num} className="px-4 py-2 flex justify-between items-center bg-white">
                      <span className="text-gray-700">{assignment.num}</span>
                      <span className="text-gray-700">{assignment.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QUIZ Scores */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="bg-orange-300 px-4 py-2 flex justify-between items-center">
                  <span className="font-bold text-gray-800">QUIZ</span>
                  <span className="font-bold text-gray-800">SCORE</span>
                </div>
                <div className="divide-y divide-gray-300">
                  {detailScores.quiz.map((quiz) => (
                    <div key={quiz.num} className="px-4 py-2 flex justify-between items-center bg-white">
                      <span className="text-gray-700">{quiz.num}</span>
                      <span className="text-gray-700">{quiz.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FINAL EXAM Score */}
              <div className="border border-gray-300 rounded-lg overflow-hidden w-48 h-fit">
                <div className="bg-orange-300 px-4 py-2 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-sm">FINAL EXAM</span>
                  <span className="font-bold text-gray-800 text-sm">SCORE</span>
                </div>
                <div className="px-4 py-2 flex justify-between items-center bg-white">
                  <span className="text-gray-700 text-sm">Final</span>
                  <span className="text-gray-700 text-sm">{detailScores.finalExam.score}</span>
                </div>
              </div>
            </div>

            {/* Modify Button */}
            <div className="text-center">
              <button className="bg-blue-500 text-white px-12 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                Modify
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          <button 
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition"
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <button 
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              currentPage === 1 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            1
          </button>
          
          <button 
            onClick={() => setCurrentPage(2)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              currentPage === 2 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            2
          </button>
          
          <button 
            onClick={() => setCurrentPage(3)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              currentPage === 3 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            3
          </button>
          
          <span className="px-2 text-gray-600">...</span>
          
          <button 
            onClick={() => setCurrentPage(10)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              currentPage === 10 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            10
          </button>
          
          <button 
            onClick={() => setCurrentPage(11)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              currentPage === 11 
                ? "bg-blue-500 text-white" 
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            11
          </button>
          
          <button 
            onClick={() => setCurrentPage(Math.min(11, currentPage + 1))}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-md transition"
            disabled={currentPage === 11}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}