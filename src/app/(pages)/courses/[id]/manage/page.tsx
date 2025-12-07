"use client";

import { useEffect, useState, use } from "react";
import {
  Loader2,
  Save,
  PlusCircle,
  Calendar,
  Clock,
  MapPin,
  Monitor,
  Check,
  X,
} from "lucide-react";

// --- 1. Định nghĩa Interface dựa trên JSON ---

interface SessionData {
  day: string;
  startTime: string;
  endTime: string;
  form: string;
  location: string;
  studentAttemp: string[]; // Danh sách email sinh viên có mặt
}

interface MaterialItem {
  _id: string;
  materialName: string;
  pdfUrl: string;
  type: string;
  sharedType?: string;
}

interface Materials {
  general: MaterialItem[];
  reference: MaterialItem[];
  slide: MaterialItem[];
}

interface CourseInfo {
  _id: string;
  courseCode: string;
  courseName: string;
  // ... các trường khác nếu cần
}

interface CourseDetailResponse {
  _id: string;
  courseCode: string;
  classGroup: string;
  tutor: string;
  students: string[]; // Danh sách toàn bộ sinh viên
  registeredCount: number;
  sessions: SessionData[];
  status: string;
  semester: string;
  materials: Materials;
  course: CourseInfo;
}

// --- 2. Component Chính ---

export default function ManageCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // State lưu dữ liệu API
  const { id } = use(params);
  const [courseData, setCourseData] = useState<CourseDetailResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false); // Loading state cho nút Create
  const [isUpdatingAttendance, setIsUpdatingAttendance] = useState(false);

  const handleToggleAttendance = async (
    sessionIndex: number,
    studentEmail: string,
    currentStatus: boolean
  ) => {
    if (!courseData || isUpdatingAttendance) return;

    // 1. Optimistic Update (Cập nhật giao diện ngay lập tức trước khi gọi API để mượt mà)
    const newStatus = !currentStatus;

    // Tạo bản sao deep copy để không mutate state trực tiếp
    const updatedSessions = [...courseData.sessions];
    const targetSession = { ...updatedSessions[sessionIndex] };
    const currentAttemp = targetSession.studentAttemp || [];

    if (newStatus) {
      // Add email
      targetSession.studentAttemp = [...currentAttemp, studentEmail];
    } else {
      // Remove email
      targetSession.studentAttemp = currentAttemp.filter(
        (e) => e !== studentEmail
      );
    }

    updatedSessions[sessionIndex] = targetSession;

    // Cập nhật UI ngay lập tức
    setCourseData({ ...courseData, sessions: updatedSessions });
    setIsUpdatingAttendance(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      // 2. Gọi API Backend
      const res = await fetch(`${API_URL}/api/matching/attendance`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: courseData._id,
          sessionIndex: sessionIndex,
          studentEmail: studentEmail,
          isPresent: newStatus,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to update attendance");
      }

      // API thành công (UI đã update rồi nên không cần làm gì thêm, hoặc fetch lại để đồng bộ chuẩn)
      // fetchData(); // Có thể bỏ comment dòng này nếu muốn chắc chắn dữ liệu khớp server
    } catch (error) {
      console.error(error);
      alert("Error updating attendance. Reverting changes...");
      fetchData(); // Revert lại dữ liệu cũ nếu lỗi
    } finally {
      setIsUpdatingAttendance(false);
    }
  };

  // --- State cho Form Tạo Session Mới ---
  const [newSession, setNewSession] = useState({
    date: "", // Input type date
    startTime: "", // Input type time
    endTime: "", // Input type time
    form: "Offline",
    location: "",
  });

  // State cho Form Manage (Update)
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(0); // Index của session đang chọn
  const [editForm, setEditForm] = useState("");
  const [editLocation, setEditLocation] = useState("");
  // const [editStatus, setEditStatus] = useState("Scheduled"); // JSON không có status cho từng session

  // --- 3. Fetch Data ---
  const fetchData = async () => {
    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/matching/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setCourseData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseData) return;

    // 1. Validate đơn giản
    if (!newSession.date || !newSession.startTime || !newSession.endTime) {
      alert("Please fill in Date and Time fields.");
      return;
    }

    if (newSession.startTime >= newSession.endTime) {
      alert("Start time must be before End time.");
      return;
    }

    setIsCreating(true);

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      // 2. Chuyển đổi Date sang format hiển thị mong muốn (Ví dụ: "YYYY-MM-DD" hoặc tên thứ)
      // Ở đây mình lấy nguyên string date user chọn, hoặc bạn có thể convert sang "Monday", "Tuesday"...
      const dateObj = new Date(newSession.date);
      const dayString = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      // Kết quả VD: "Friday, Sep 15"

      // 3. Payload gửi đi
      const payload = {
        courseId: courseData._id, // Gửi ID khóa học để backend biết update vào đâu
        day: dayString, // Hoặc newSession.date tùy backend yêu cầu
        startTime: newSession.startTime,
        endTime: newSession.endTime,
        form: newSession.form,
        location:
          newSession.location ||
          (newSession.form === "Online" ? "Google Meet" : "TBA"),
      };

      // 4. Gọi API (Giả sử bạn có route /api/matching/add-session)
      // Nếu backend chưa có route riêng, bạn có thể dùng route update toàn bộ sessions
      const res = await fetch(`${API_URL}/api/matching/add-session`, {
        method: "POST", // Hoặc PUT
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create session");
      }

      alert("Session created successfully!");

      // Reset form
      setNewSession({
        date: "",
        startTime: "",
        endTime: "",
        form: "Offline",
        location: "",
      });

      // Refresh lại dữ liệu bảng
      fetchData();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsCreating(false);
    }
  };

  // Hàm xử lý khi thay đổi session cần sửa trong dropdown
  const handleSessionChange = (index: number) => {
    if (!courseData) return;
    setSelectedSessionIndex(index);
    const session = courseData.sessions[index];
    setEditForm(session.form || "Offline");
    setEditLocation(session.location || "");
  };

  // Hàm update (Mock logic - bạn cần nối API update thực tế)
  const handleUpdateSession = async () => {
    alert(
      `Updating Session ${
        selectedSessionIndex + 1
      }: \nForm: ${editForm} \nLocation: ${editLocation}`
    );
    // Gọi API PUT /update-session ở đây...
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10" />
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Error: {error || "No data found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Manage Course: {courseData.course.courseName}
        </h1>
        <p className="text-gray-600 mb-8">
          Class: {courseData.classGroup} | Code: {courseData.courseCode}
        </p>
        {/* --- Table 1: Session Scheduled --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600">
              Session Scheduled
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-200 border-b border-gray-300">
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">
                    NO.
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">
                    DAY
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">
                    TIME
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">
                    FORM
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800 border-r border-gray-300">
                    LOCATION
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-800">
                    ATTENDED
                  </th>
                </tr>
              </thead>
              <tbody>
                {courseData.sessions.map((session, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-center border-r border-gray-200 font-medium">
                      Session {index + 1}
                    </td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">
                      {session.day}
                    </td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">
                      {session.startTime} - {session.endTime}
                    </td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">
                      {session.form || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center border-r border-gray-200">
                      {session.location || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {session.studentAttemp?.length || 0}/
                      {courseData.registeredCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* --- Table 2: Student Attendance --- */}
        {/* <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Student Attendance
          </h2>

          <div className="space-y-3">
            {courseData.students.length === 0 ? (
              <p className="text-gray-500 italic">No students registered.</p>
            ) : (
              courseData.students.map((studentEmail, sIndex) => (
                <div
                  key={sIndex}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
             
                  <div
                    className="font-semibold text-gray-800 w-64 truncate"
                    title={studentEmail}
                  >
                    {sIndex + 1}. {studentEmail}
                  </div>

       
                  <div className="flex gap-2 flex-wrap flex-1">
                    {courseData.sessions.map((session, sessionIndex) => {
                      // Check xem email sinh viên có trong mảng studentAttemp của session này không
                      const isPresent =
                        session.studentAttemp?.includes(studentEmail);

                      return (
                        <div
                          key={sessionIndex}
                          className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors flex items-center gap-1
                            ${
                              isPresent
                                ? "bg-green-600 text-white border-green-600"
                                : "bg-white text-gray-400 border-gray-300"
                            }`}
                          title={`Session ${sessionIndex + 1}: ${session.day}`}
                        >
                          <span className="font-bold">S{sessionIndex + 1}</span>
                          {isPresent ? "✓" : "✗"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div> */}
        {/* --- Table 2: Student Attendance --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-600 mb-4">
            Student Attendance
          </h2>

          <div className="space-y-3">
            {courseData.students.length === 0 ? (
              <p className="text-gray-500 italic">No students registered.</p>
            ) : (
              courseData.students.map((studentEmail, sIndex) => (
                <div
                  key={sIndex}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {/* Tên sinh viên */}
                  <div
                    className="font-semibold text-gray-800 w-64 truncate"
                    title={studentEmail}
                  >
                    {sIndex + 1}. {studentEmail}
                  </div>

                  {/* Danh sách các nút điểm danh */}
                  <div className="flex gap-2 flex-wrap flex-1">
                    {courseData.sessions.map((session, sessionIndex) => {
                      // Kiểm tra xem sinh viên có mặt không
                      const isPresent =
                        session.studentAttemp?.includes(studentEmail);

                      return (
                        <button
                          key={sessionIndex}
                          onClick={() =>
                            handleToggleAttendance(
                              sessionIndex,
                              studentEmail,
                              !!isPresent
                            )
                          }
                          disabled={isUpdatingAttendance}
                          className={`
                            group relative px-3 py-1.5 rounded text-xs font-medium border transition-all flex items-center gap-1 cursor-pointer select-none
                            ${
                              isPresent
                                ? "bg-green-600 text-white border-green-600 hover:bg-green-700 shadow-sm"
                                : "bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                            }
                          `}
                          title={`Click to mark ${
                            isPresent ? "absent" : "present"
                          } for Session ${sessionIndex + 1}`}
                        >
                          <span className="font-bold">S{sessionIndex + 1}</span>

                          {/* Icon check hoặc x */}
                          {isPresent ? (
                            <Check size={12} strokeWidth={3} />
                          ) : (
                            <X size={12} />
                          )}

                          {/* Tooltip nhỏ khi hover */}
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            {isPresent ? "Mark Absent" : "Mark Present"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* --- Form: Manage Session --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            MANAGE SESSION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {/* SELECT SESSION */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                SELECT SESSION
              </label>
              <select
                value={selectedSessionIndex}
                onChange={(e) => handleSessionChange(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {courseData.sessions.map((session, index) => (
                  <option key={index} value={index}>
                    Session {index + 1} ({session.day})
                  </option>
                ))}
              </select>
            </div>

            {/* INFO (Read only) */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                TIME
              </label>
              <input
                disabled
                className="w-full px-4 py-2 border border-gray-200 bg-gray-100 rounded-lg text-gray-500"
                value={`${courseData.sessions[selectedSessionIndex]?.startTime} - ${courseData.sessions[selectedSessionIndex]?.endTime}`}
              />
            </div>

            {/* EDIT FORM */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                FORM
              </label>
              <select
                value={editForm}
                onChange={(e) => setEditForm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select Form</option>
                <option value="Offline">Offline</option>
                <option value="Online">Online</option>
              </select>
            </div>

            {/* EDIT LOCATION */}
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                LOCATION / LINK
              </label>
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="e.g. B4-203 or Meet Link"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="text-center">
            <button
              onClick={handleUpdateSession}
              className="bg-blue-600 text-white px-10 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2 mx-auto"
            >
              <Save size={20} />
              Update Session Info
            </button>
          </div>
        </div>
        {/* --- FORM: ADD NEW SESSION --- */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <PlusCircle className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold text-blue-600 uppercase">
              Add New Session
            </h2>
          </div>

          <form onSubmit={handleCreateSession}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* 1. DATE */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Date
                </label>
                <input
                  type="date"
                  required
                  value={newSession.date}
                  onChange={(e) =>
                    setNewSession({ ...newSession, date: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              {/* 2. TIME RANGE */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock size={16} /> Time
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    required
                    value={newSession.startTime}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        startTime: e.target.value,
                      })
                    }
                    className="w-full px-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <span className="text-gray-400 font-bold">-</span>
                  <input
                    type="time"
                    required
                    value={newSession.endTime}
                    onChange={(e) =>
                      setNewSession({ ...newSession, endTime: e.target.value })
                    }
                    className="w-full px-2 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* 3. FORM (Online/Offline) */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Monitor size={16} /> Type
                </label>
                <select
                  value={newSession.form}
                  onChange={(e) =>
                    setNewSession({ ...newSession, form: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none"
                >
                  <option value="Offline">Offline</option>
                  <option value="Online">Online</option>
                </select>
              </div>

              {/* 4. LOCATION */}
              <div className="col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Location / Link
                </label>
                <input
                  type="text"
                  placeholder={
                    newSession.form === "Online"
                      ? "Google Meet Link"
                      : "Room B4-201"
                  }
                  value={newSession.location}
                  onChange={(e) =>
                    setNewSession({ ...newSession, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* BUTTON SUBMIT */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isCreating}
                className="bg-blue-600 text-white px-12 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md flex items-center gap-2 disabled:bg-blue-300"
              >
                {isCreating ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PlusCircle size={20} />
                )}
                {isCreating ? "Adding..." : "Add Session"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
