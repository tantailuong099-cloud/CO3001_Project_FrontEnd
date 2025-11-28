"use client";

import { useRouter } from "next/navigation";

interface ClassSchedule {
  day: string;
  lesson: string;
  room: string;
  facility: string;
  exerciseLab: string;
  week: string;
}

interface ClassInfo {
  className: string;
  classSize: string;
  language: string;
  theoryClass: string;
  exerciseClass: string;
  exerciseClassSize: string;
  schedules: ClassSchedule[];
}

interface ProgramCard2Props {
  courseId?: string;
  courseName?: string;
  credits?: number;
  classes?: ClassInfo[];
}

export default function ProgramCard2({
  courseId = "CO3001",
  courseName = "DATABASE SYSTEM",
  credits = 4.0,
  classes = [
    {
      className: "CC02_CC08",
      classSize: "28/60",
      language: "English",
      theoryClass: "CC02",
      exerciseClass: "CC08",
      exerciseClassSize: "30",
      schedules: [
        { day: "Tuesday", lesson: "2-3", room: "B4-301", facility: "1", exerciseLab: "", week: "123456789" },
        { day: "Friday", lesson: "8-9-10-11-12", room: "C6-401", facility: "1", exerciseLab: "", week: "3-5-7-9" }
      ]
    },
    {
      className: "CC01_CC09",
      classSize: "30/60",
      language: "English",
      theoryClass: "CC01",
      exerciseClass: "CC09",
      exerciseClassSize: "30",
      schedules: [
        { day: "Monday", lesson: "2-3", room: "B4-301", facility: "1", exerciseLab: "", week: "123456789" },
        { day: "Thursday", lesson: "8-9-10-11-12", room: "C6-401", facility: "1", exerciseLab: "", week: "3-5-7-9" }
      ]
    },
    {
      className: "L01_L09",
      classSize: "30/60",
      language: "Vietnamese",
      theoryClass: "L01",
      exerciseClass: "L09",
      exerciseClassSize: "30",
      schedules: [
        { day: "Monday", lesson: "2-3", room: "H2-301", facility: "2", exerciseLab: "", week: "123456789" },
        { day: "Thursday", lesson: "8-9-10-11-12", room: "H7-401", facility: "2", exerciseLab: "", week: "3-5-7-9" }
      ]
    },
    {
      className: "L01_L08",
      classSize: "35/60",
      language: "Vietnamese",
      theoryClass: "L01",
      exerciseClass: "L08",
      exerciseClassSize: "30",
      schedules: [
        { day: "Monday", lesson: "2-3", room: "H2-301", facility: "2", exerciseLab: "", week: "123456789" },
        { day: "Thursday", lesson: "8-9-10-11-12", room: "H7-401", facility: "2", exerciseLab: "", week: "3-5-7-9" }
      ]
    }
  ]
}: ProgramCard2Props) {
  const router = useRouter();

  const handleChoose = (className: string) => {
    router.push(`/courses/${courseId}/register?class=${className}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-300 bg-white">
        <h2 className="text-xl font-bold text-gray-800">
          {courseId} - {courseName}
        </h2>
        <span className="text-xl font-bold text-gray-800">{credits}</span>
      </div>

      {/* Classes List */}
      <div className="p-6 space-y-6">
        {classes.map((classInfo, index) => (
          <div key={index} className="border-2 border-gray-300 rounded-lg overflow-hidden">
            {/* Class Info Header */}
            <div className="overflow-x-auto bg-gray-50">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Class</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Class size</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Language</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Theory Class</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Exercise Class</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700">Exercise Class size</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="px-4 py-3 font-medium">{classInfo.className}</td>
                    <td className="px-4 py-3 text-center">{classInfo.classSize}</td>
                    <td className="px-4 py-3 text-center">{classInfo.language}</td>
                    <td className="px-4 py-3 text-center">{classInfo.theoryClass}</td>
                    <td className="px-4 py-3 text-center">{classInfo.exerciseClass}</td>
                    <td className="px-4 py-3 text-center">{classInfo.exerciseClassSize}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleChoose(classInfo.className)}
                        className="bg-blue-500 text-white px-5 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition"
                      >
                        Choose
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Schedule Details */}
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-t border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Day</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Lesson</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Room</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Facility</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Exercise/Lab</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Week</th>
                  </tr>
                </thead>
                <tbody>
                  {classInfo.schedules.map((schedule, scheduleIndex) => (
                    <tr key={scheduleIndex} className="border-t border-gray-200">
                      <td className="px-4 py-2.5">{schedule.day}</td>
                      <td className="px-4 py-2.5 text-center">{schedule.lesson}</td>
                      <td className="px-4 py-2.5 text-center">{schedule.room}</td>
                      <td className="px-4 py-2.5 text-center">{schedule.facility}</td>
                      <td className="px-4 py-2.5 text-center">{schedule.exerciseLab || "–"}</td>
                      <td className="px-4 py-2.5 text-center">{schedule.week}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}