"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, X } from "lucide-react";

// We can re-use the type, but define a new type for the form state
type CourseStatus = "Ongoing" | "Upcoming" | "Inactive" | "Completed";
type SessionType = "Online" | "Offline";

const initialFormData = {
  code: "",
  name: "",
  credit: 3,
  lecturer: "",
  semester: "",
  department: "",
  startDate: "",
  duration: "15 weeks",
  sessionCode: "",
  sessionType: "Offline" as SessionType,
  location: "",
  status: "Upcoming" as CourseStatus,
};

export default function AddNewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    router.push("/admin/program");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // --- In a real app, you would send this data to your API ---
    console.log("Submitting new course:", formData);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // You would typically show a success toast here
      // For now, just log and redirect
      console.log("Course added successfully!");
      router.push("/admin/program");
    }, 1000);
  };

  return (
    <div className="py-10 px-[30px] min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between gap-5 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Add New Course
          </h1>
          <p className="text-gray-600 text-sm font-medium">
            Admin / Courses / New
          </p>
        </div>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition font-medium shadow-sm border border-gray-300"
        >
          <ArrowLeft size={18} />
          Back to List
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white shadow-lg rounded-xl border border-gray-200">
        <form onSubmit={handleSubmit}>
          {/* Form Body */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Course Code */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., CO2301"
                />
              </div>

              {/* Course Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Computer Network"
                />
              </div>

              {/* Department */}
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  id="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Computer Science"
                />
              </div>

              {/* Lecturer */}
              <div>
                <label htmlFor="lecturer" className="block text-sm font-medium text-gray-700 mb-1">
                  Lecturer
                </label>
                <input
                  type="text"
                  name="lecturer"
                  id="lecturer"
                  value={formData.lecturer}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., Phạm Hồng Phát"
                />
              </div>

              {/* Credits */}
              <div>
                <label htmlFor="credit" className="block text-sm font-medium text-gray-700 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  name="credit"
                  id="credit"
                  value={formData.credit}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Semester */}
              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <input
                  type="text"
                  name="semester"
                  id="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 2 / 2025"
                />
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 15 weeks"
                />
              </div>

              {/* Session Code */}
              <div>
                <label htmlFor="sessionCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Session Code
                </label>
                <input
                  type="text"
                  name="sessionCode"
                  id="sessionCode"
                  value={formData.sessionCode}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-30m shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., CC01"
                />
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                  name="sessionType"
                  id="sessionType"
                  value={formData.sessionType}
                  onChange={handleChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              {/* Location (Conditional) */}
              {formData.sessionType === "Offline" && (
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., H1, BKHCM"
                  />
                </div>
              )}

            </div>
          </div>

          {/* Form Footer */}
          <div className="bg-gray-50 px-8 py-4 rounded-b-xl flex justify-end gap-3">
            <button
              type="button"
              onClick={handleGoBack}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-md hover:bg-gray-50 transition font-medium shadow-sm border border-gray-300 disabled:opacity-50"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition font-medium shadow-sm disabled:opacity-50 disabled:bg-blue-400"
            >
              <Save size={18} />
              {isLoading ? "Saving..." : "Save Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

