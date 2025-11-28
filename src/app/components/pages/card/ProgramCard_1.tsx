"use client";

import { FaLock, FaCalendarAlt, FaBookOpen, FaBuilding } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProgramCard1Props {
  courseId?: string;
  courseName?: string;
  credits?: number;
  semester?: string;
  department?: string;
  duration?: string;
}

export default function ProgramCard1({
  courseId = "CO2301",
  courseName = "Computer Network",
  credits = 4.0,
  semester = "2 / 2025",
  department = "Computer Science",
  duration = "9 weeks"
}: ProgramCard1Props) {
  const router = useRouter();

  const handleRegister = () => {
    router.push(`/program/registered`);
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden bg-white shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-50 px-5 py-3 border-b border-gray-300">
        <h2 className="text-lg font-semibold text-gray-800">
          {courseId} – {courseName}
        </h2>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">{credits} Credits</span>
          <FaLock className="text-red-500" />
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-6 px-5 py-3 text-sm text-gray-700 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <FaBookOpen className="text-blue-600" />
          <span>
            <strong>Semester:</strong> <span className="text-blue-700">{semester}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaBuilding className="text-green-600" />
          <span>
            <strong>Department:</strong> <span className="text-gray-800">{department}</span>
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-orange-500" />
          <span>
            <strong>Duration:</strong> <span className="text-gray-800">{duration}</span>
          </span>
        </div>
      </div>

      {/* Course Info Table */}
      <div className="p-4 text-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="w-1/8 px-3 py-2 text-left">Class</th>
                <th className="w-1/8 px-3 py-2 text-center">Class Size</th>
                <th className="w-1/8 px-3 py-2 text-center">Language</th>
                <th className="w-1/8 px-3 py-2 text-center">Theory</th>
                <th className="w-1/8 px-3 py-2 text-center">Lecturer</th>
                <th className="w-1/8 px-3 py-2 text-center">Lab</th>
                <th className="w-1/8 px-3 py-2 text-center">Lab Lecturer</th>
                <th className="w-1/8 px-3 py-2 text-center">#</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-3 py-2">CC01_CC09</td>
                <td className="px-3 py-2 text-center">40 / 60</td>
                <td className="px-3 py-2 text-center">English</td>
                <td className="px-3 py-2 text-center">CC01</td>
                <td className="px-3 py-2 text-center">Lương Tấn Tài</td>
                <td className="px-3 py-2 text-center">CC09</td>
                <td className="px-3 py-2 text-center">Phạm Hồng Phát</td>
                <td className="px-3 py-2 text-center">–</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Schedule Section */}
        <div className="mt-5">
          <h3 className="font-semibold text-lg mb-2">Schedule</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-fixed border-collapse text-sm">
              <thead className="bg-gray-100 border-b border-gray-300">
                <tr>
                  <th className="w-1/6 px-3 py-2 text-left">Day</th>
                  <th className="w-1/6 px-3 py-2 text-center">Lesson</th>
                  <th className="w-1/6 px-3 py-2 text-center">Room</th>
                  <th className="w-1/6 px-3 py-2 text-center">Facility</th>
                  <th className="w-1/6 px-3 py-2 text-center">Exercise/Lab</th>
                  <th className="w-1/6 px-3 py-2 text-center">Weeks</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-3 py-2">Monday</td>
                  <td className="px-3 py-2 text-center">2–3</td>
                  <td className="px-3 py-2 text-center">B4-301</td>
                  <td className="px-3 py-2 text-center">1</td>
                  <td className="px-3 py-2 text-center">–</td>
                  <td className="px-3 py-2 text-center">1–9</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Thursday</td>
                  <td className="px-3 py-2 text-center">8–12</td>
                  <td className="px-3 py-2 text-center">C6-401</td>
                  <td className="px-3 py-2 text-center">1</td>
                  <td className="px-3 py-2 text-center">–</td>
                  <td className="px-3 py-2 text-center">3, 5, 7, 9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-5 text-sm text-gray-600 border-t pt-3">
          <span>Last updated: <strong>Oct 25, 2025</strong></span>
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
            Register for this course
          </button>
        </div>
      </div>
    </div>
  );
}