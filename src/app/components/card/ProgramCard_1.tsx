import { FaLock } from "react-icons/fa";

export default function ProgramCard1() {
  return (
    <div className="border-1 border-[#D9D9D9] rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2 border-b border-[#D9D9D9]">
        <h2 className="font-semibold text-gray-800">
          1. CO2301 - COMPUTER NETWORK
        </h2>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-700">4.0</span>
          <FaLock className="text-red-500" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 text-sm">
        {/* Bảng thông tin chính */}
        <div className="overflow-x-auto">
          <table className="w-full  border-gray-300 text-left">
            <thead className="bg-gray-50 border-b border-[#000000]">
              <tr>
                <th className=" px-2 py-1">Class</th>
                <th className=" px-2 py-1">Class size</th>
                <th className=" px-2 py-1">Language</th>
                <th className=" px-2 py-1">Theory Class</th>
                <th className=" px-2 py-1">Lecturer</th>
                <th className=" px-2 py-1">Exercise/Lab Class</th>
                <th className=" px-2 py-1">Exercise Lecturer</th>
                <th className=" px-2 py-1">Exercise class size</th>
                <th className=" px-2 py-1">#</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className=" px-2 py-1">CC01_CC09</td>
                <td className=" px-2 py-1">40/60</td>
                <td className=" px-2 py-1">English</td>
                <td className=" px-2 py-1">CC01</td>
                <td className=" px-2 py-1">LUONG TAN TAI</td>
                <td className=" px-2 py-1">CC09</td>
                <td className=" px-2 py-1">PHAM HONG PHAT</td>
                <td className=" px-2 py-1 text-center">40</td>
                <td className=" px-2 py-1 text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bảng lịch học */}
        <div className="mt-3  px-[100px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-[#000000]">
              <tr>
                <th className=" px-2 py-1">Day</th>
                <th className=" px-2 py-1">Lesson</th>
                <th className=" px-2 py-1">Room</th>
                <th className=" px-2 py-1">Facility</th>
                <th className=" px-2 py-1">Exercise/Lab</th>
                <th className=" px-2 py-1">Week</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className=" px-2 py-1">Monday</td>
                <td className=" px-2 py-1">2-3</td>
                <td className=" px-2 py-1">B4-301</td>
                <td className=" px-2 py-1">1</td>
                <td className=" px-2 py-1">-</td>
                <td className=" px-2 py-1">1 2 3 4 5 6 7 8 9</td>
              </tr>
              <tr>
                <td className=" px-2 py-1">Thursday</td>
                <td className=" px-2 py-1">8-9-10-11-12</td>
                <td className=" px-2 py-1">C6-401</td>
                <td className=" px-2 py-1">1</td>
                <td className=" px-2 py-1">-</td>
                <td className=" px-2 py-1">3 5 7 9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
