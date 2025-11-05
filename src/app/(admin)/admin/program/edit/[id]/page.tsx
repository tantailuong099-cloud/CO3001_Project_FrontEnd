"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";

// Mock data - In a real app, you'd fetch this from your API
const coursesData = [
  {
    code: "CO2301",
    name: "Computer Network",
    credit: 4,
    lecturer: "Phạm Hồng Phát",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Nov 1, 2025",
    duration: "15 weeks",
    sessionCode: "CC01",
    sessionType: "Offline",
    location: "H1, BKHCM",
    status: "Ongoing",
    updatedAt: "Oct 25, 2025",
  },
  {
    code: "CO2203",
    name: "Data Structures & Algorithms",
    credit: 4,
    lecturer: "Trần Thị Xuân Hương",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Nov 3, 2025",
    duration: "15 weeks",
    sessionCode: "L01",
    sessionType: "Offline",
    location: "H6, BKHCM",
    status: "Ongoing",
    updatedAt: "Oct 21, 2025",
  },
  {
    code: "CO2402",
    name: "Machine Learning",
    credit: 3,
    lecturer: "",
    semester: "2 / 2025",
    department: "Computer Science",
    startDate: "Sep 1, 2025",
    duration: "15 weeks",
    sessionCode: "TN01",
    sessionType: "Online",
    location: "–",
    status: "Completed",
    updatedAt: "Sep 10, 2025",
  },
];
// --- End Mock Data ---

// Copied types from AdminProgramCard for consistency
type CourseStatus = "Ongoing" | "Upcoming" | "Inactive" | "Completed";
type Course = {
  id?: string | number;
  code: string;
  name: string;
  credit: number;
  lecturer: string;
  semester: string;
  department: string;
  startDate?: string;
  duration?: string;
  sessionCode?: string;
  sessionType?: "Online" | "Offline";
  location?: string;
  status?: CourseStatus;
  updatedAt?: string;
};

export default function EditProgramPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const courseToEdit = coursesData.find(
      (c) => c.code.toLowerCase() === (id as string).toLowerCase()
    );

    if (courseToEdit) {
      setCourse(courseToEdit as Course);
    }
    setIsLoading(false);
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (course) {
      setCourse({ ...course, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this is where you'd send the `course` object to your API
    console.log("Saving changes:", course);
    alert("Changes saved! (Check console for data)"); // Using alert for demo, replace with a toast notification
    router.push("/admin/program"); // Navigate back to the list
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Course Not Found</h2>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="py-10 px-[30px] min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Edit Course
            </h1>
            <p className="text-gray-600 text-sm font-medium">
              Admin / Courses / Edit / {course.code}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium"
          >
            <ArrowLeft size={18} />
            Back to List
          </button>
        </div>

        {/* Edit Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl border border-gray-200 p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Course Code (Read-only) */}
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Course Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={course.code}
                readOnly
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Course Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={course.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Lecturer */}
            <div>
              <label htmlFor="lecturer" className="block text-sm font-medium text-gray-700 mb-1">
                Lecturer
              </label>
              <input
                type="text"
                id="lecturer"
                name="lecturer"
                value={course.lecturer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={course.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Credits */}
            <div className="md:col-span-1">
              <label htmlFor="credit" className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <input
                type="number"
                id="credit"
                name="credit"
                value={course.credit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Semester */}
            <div className="md:col-span-1">
              <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={course.semester}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Session Code */}
            <div>
              <label htmlFor="sessionCode" className="block text-sm font-medium text-gray-700 mb-1">
                Session Code
              </label>
              <input
                type="text"
                id="sessionCode"
                name="sessionCode"
                value={course.sessionCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={course.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Session Type */}
            <div>
              <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-1">
                Session Type
              </label>
              <select
                id="sessionType"
                name="sessionType"
                value={course.sessionType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* Location (Conditional) */}
            {course.sessionType === "Offline" && (
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={course.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-100 transition font-medium border border-gray-300"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

