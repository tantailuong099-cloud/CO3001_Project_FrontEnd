"use client";

import { useState } from "react";
import type { Metadata } from "next";

interface Session {
  date: string;
  session: string;
  form: string;
  location: string;
  status: string;
}

interface StudentAttendance {
  id: number;
  name: string;
  attendance: { [key: string]: boolean };
}

export default function ManageCoursePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("Manage");
  
  const sessions: Session[] = [
    { date: "15/09", session: "2-3", form: "Offline", location: "B4-203", status: "Scheduled" },
    { date: "26/09", session: "4-5", form: "Online", location: "link meet", status: "Waited" },
    { date: "04/10", session: "2-3", form: "Online", location: "link meet", status: "Scheduled" },
    { date: "10/10", session: "8-9", form: "Offline", location: "C6-202", status: "Cancelled" },
    { date: "17/10", session: "10-11", form: "Offline", location: "B1-304", status: "Scheduled" },
  ];

  const students: StudentAttendance[] = [
    { 
      id: 1, 
      name: "Lương Tấn Tài", 
      attendance: { "15/09": true, "26/09": false, "04/10": false, "10/10": false, "17/10": false, "24/10": false, "2/11": false }
    },
    { 
      id: 2, 
      name: "Vũ Thành Tài", 
      attendance: { "15/09": true, "26/09": true, "04/10": true, "10/10": true, "17/10": true, "24/10": true, "2/11": false }
    },
    { 
      id: 3, 
      name: "Phạm Hồng Phát", 
      attendance: { "15/09": true, "26/09": false, "04/10": true, "10/10": false, "17/10": false, "24/10": true, "2/11": false }
    },
  ];

  const [selectedDate, setSelectedDate] = useState("26/09");
  const [selectedSession, setSelectedSession] = useState("3-/4-/5-/6-/7");
  const [selectedForm, setSelectedForm] = useState("Offline/Online");
  const [selectedLocation, setSelectedLocation] = useState("B4-302/link meet");
  const [selectedStatus, setSelectedStatus] = useState("Cancelled/Scheduled/Waited");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        
          
        {/* Tabs */}

        {/* Table 1 - Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600 mb-4">Session Scheduled</h2>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Manage
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-200 border-b border-gray-300">
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">DATE</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">SESSION</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">FORM</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">LOCATION</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 text-center border-r border-gray-200">{session.date}</td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">{session.session}</td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">{session.form}</td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">{session.location}</td>
                    <td className="px-4 py-3 text-center">{session.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Attendance */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Student Attendance</h2>
          
          <div className="space-y-3">
            {students.map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="font-semibold text-gray-800 w-48">
                  {student.id}. {student.name}
                </div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(student.attendance).map(([date, attended]) => (
                    <button
                      key={date}
                      className={`px-4 py-1.5 rounded text-sm font-medium ${
                        attended 
                          ? "bg-gray-700 text-white" 
                          : "bg-white border border-gray-300 text-gray-600"
                      }`}
                    >
                      {attended && "✓ "}{date}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manage Session Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">MANAGE SESSION</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">DATE</label>
              <select 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>26/09</option>
                <option>15/09</option>
                <option>04/10</option>
                <option>10/10</option>
                <option>17/10</option>
              </select>
            </div>

            {/* SESSION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">SESSION</label>
              <select 
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>3-/4-/5-/6-/7</option>
                <option>2-3</option>
                <option>4-5</option>
                <option>8-9</option>
                <option>10-11</option>
              </select>
            </div>

            {/* FORM */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">FORM</label>
              <select 
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Offline/Online</option>
                <option>Offline</option>
                <option>Online</option>
              </select>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">LOCATION</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>B4-302/link meet</option>
                <option>B4-203</option>
                <option>C6-202</option>
                <option>B1-304</option>
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">STATUS</label>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Cancelled/Scheduled/Waited</option>
                <option>Scheduled</option>
                <option>Waited</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button className="bg-blue-500 text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition shadow-md">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


