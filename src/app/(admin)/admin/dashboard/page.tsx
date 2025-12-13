"use client"; // 👈 QUAN TRỌNG: Chuyển thành Client Component để dùng hooks

import { useEffect, useState } from "react";
import DashboardCard from "@/app/components/admin/card/DashboardCard";
import OverviewLineChart from "./OverViewChart";
import { Loader2 } from "lucide-react";
import { api } from "@/app/services/api"; // Giả sử bạn có file api service

// --- Interfaces cho dữ liệu API ---
interface UserCount {
  students: number;
  tutors: number;
}

interface CourseCount {
  course: number;
}

interface User {
  _id: string;
  role: 'Student' | 'Tutor' | 'Admin';
  createdAt: string;
}

interface Course {
  _id: string;
  createdAt: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    tension: number;
  }[];
}


// --- HÀM XỬ LÝ DỮ LIỆU CHO BIỂU ĐỒ ---
const processDataForChart = (users: User[], courses: Course[]): ChartData => {
  const labels: string[] = [];
  const studentData: number[] = [];
  const tutorData: number[] = [];
  const courseData: number[] = [];

  // 1. Tạo labels cho 6 tháng gần nhất (tính cả tháng hiện tại)
  const today = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    labels.push(d.toLocaleString('default', { month: 'short', year: 'numeric' }));
    studentData.push(0);
    tutorData.push(0);
    courseData.push(0);
  }

  // 2. Đếm số lượng user mới mỗi tháng
  users.forEach(user => {
    const creationDate = new Date(user.createdAt);
    const monthLabel = creationDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    const index = labels.indexOf(monthLabel);
    if (index > -1) {
      if (user.role === 'Student') studentData[index]++;
      if (user.role === 'Tutor') tutorData[index]++;
    }
  });

  // 3. Đếm số lượng course mới mỗi tháng
  courses.forEach(course => {
    const creationDate = new Date(course.createdAt);
    const monthLabel = creationDate.toLocaleString('default', { month: 'short', year: 'numeric' });
    const index = labels.indexOf(monthLabel);
    if (index > -1) {
      courseData[index]++;
    }
  });

  return {
    labels,
    datasets: [
      {
        label: "New Tutors",
        data: tutorData,
        borderColor: "#6366F1",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "New Students",
        data: studentData,
        borderColor: "#F59E0B",
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: "New Courses",
        data: courseData,
        borderColor: "#10B981",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };
};


export default function AdminHomePage() {
  // --- State để lưu dữ liệu ---
  const [stats, setStats] = useState({ tutors: 0, students: 0, courses: 0 });
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Gọi tất cả API song song để tăng tốc độ
        const [userCountRes, courseCountRes, allUsersRes, allCoursesRes] = await Promise.all([
          api.get<UserCount>("/api/user/count"),
          api.get<CourseCount>("/api/course/count"),
          api.get<User[]>("/api/user"),
          api.get<Course[]>("/api/course"),
        ]);
        
        // Cập nhật state cho các thẻ Dashboard
        setStats({
          tutors: userCountRes.tutors,
          students: userCountRes.students,
          courses: courseCountRes.course,
        });

        // Xử lý và cập nhật state cho biểu đồ
        const processedChartData = processDataForChart(allUsersRes, allCoursesRes);
        setChartData(processedChartData);

      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Could not load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency rỗng để chỉ chạy 1 lần

  const dashboardData = [
    {
      src: "/image/section-1-icon-1.svg",
      content: "Tutor",
      data: stats.tutors,
    },
    {
      src: "/image/section-1-icon-1.svg",
      content: "Student",
      data: stats.students,
    },
    {
      src: "/image/section-1-icon-2.svg",
      content: "Course",
      data: stats.courses,
    },
  ];

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-black mb-[30px] font-[700] text-[32px]">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardData.map((item, index) => (
          <DashboardCard
            key={index}
            src={item.src}
            content={item.content}
            data={item.data}
          />
        ))}
      </div>

      <OverviewLineChart chartData={chartData} />
    </div>
  );
}