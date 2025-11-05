"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import CourseCard from "@/app/components/pages/card/CourseCard";
import AssignTutorModal from "@/app/components/pages/modal/AssignTutorModal";

interface Course {
  id: number;
  title: string;
  courseCode: string;
  time: string;
  room: string;
  assignedTutors: string[];
}

export default function ProgramManagementClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"program-list" | "assign-tutor">(
    "program-list"
  );
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Data Structure and Algorithm",
      courseCode: "CO1234",
      time: "13:00 PM",
      room: "C5-203",
      assignedTutors: ["Dr. ABC"],
    },
    {
      id: 2,
      title: "Database Management Systems",
      courseCode: "CO2345",
      time: "15:00 PM",
      room: "B4-101",
      assignedTutors: [],
    },
    {
      id: 3,
      title: "Operating Systems",
      courseCode: "CO3456",
      time: "09:00 AM",
      room: "A1-302",
      assignedTutors: [],
    },
  ]);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleView = (courseId: number) => {
    router.push(`/admin/program/${courseId}`);
  };

  const handleEdit = (courseId: number) => {
    router.push(`/admin/program/${courseId}/edit`);
  };

  const handleCreateProgram = () => {
    router.push("/admin/program/create");
  };

  const handleOpenAssignModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAssignTutor = (tutorId: string) => {
    if (selectedCourse) {
      const tutorName = `Tutor-${tutorId}`;
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? { ...c, assignedTutors: [...c.assignedTutors, tutorName] }
            : c
        )
      );
      console.log(`Assigned tutor ${tutorId} to course ${selectedCourse.id}`);
    }
  };

  const handleRemoveTutor = (tutorName: string) => {
    if (selectedCourse) {
      setCourses(
        courses.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                assignedTutors: c.assignedTutors.filter((t) => t !== tutorName),
              }
            : c
        )
      );
      setSelectedCourse({
        ...selectedCourse,
        assignedTutors: selectedCourse.assignedTutors.filter(
          (t) => t !== tutorName
        ),
      });
      console.log(
        `Removed tutor ${tutorName} from course ${selectedCourse.id}`
      );
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">
              Program Management
            </h1>
            <button
              onClick={handleCreateProgram}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              + Create Program
            </button>
          </div>

          <div className="flex gap-8 mb-6 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab("program-list")}
              className={`pb-3 text-lg font-semibold transition-colors ${
                activeTab === "program-list"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Program List
            </button>
            <button
              onClick={() => setActiveTab("assign-tutor")}
              className={`pb-3 text-lg font-semibold transition-colors ${
                activeTab === "assign-tutor"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Assign Tutor
            </button>
          </div>

          <div className="mb-8">
            <div className="relative max-w-sm">
              <input
                type="text"
                placeholder="Value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {activeTab === "program-list" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  courseCode={course.courseCode}
                  time={course.time}
                  room={course.room}
                  mode="view"
                  onView={() => handleView(course.id)}
                  onEdit={() => handleEdit(course.id)}
                />
              ))}
            </div>
          )}

          {activeTab === "assign-tutor" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  courseCode={course.courseCode}
                  time={course.time}
                  room={course.room}
                  mode="assign"
                  onAssignTutor={() => handleOpenAssignModal(course)}
                />
              ))}
            </div>
          )}

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No programs found</p>
            </div>
          )}
        </div>
      </div>

      {selectedCourse && (
        <AssignTutorModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCourse(null);
          }}
          courseName={selectedCourse.title}
          currentTutors={selectedCourse.assignedTutors}
          onAssign={handleAssignTutor}
          onRemove={handleRemoveTutor}
        />
      )}
    </>
  );
}
