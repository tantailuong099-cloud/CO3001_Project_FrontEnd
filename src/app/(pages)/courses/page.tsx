import type { Metadata } from "next";
import CourseCard from "@/app/components/pages/card/ClassCard";
import CourseDropDown from "@/app/components/pages/button/CourseDropDown";

export const metadata: Metadata = {
  title: "My Courses",
  description: "Tutor Support System",
};

const userRole = 'Tutor'; // đổi role để check page tương ưng


const studentCoursesData = {
  "Học Kỳ 1 / 2025 - 2026": [
    {
      id: "692329879a10367a75462fbf", code: "CO2013", name: "Database System", instructor: "VÕ THỊ NGỌC CHÂU", classCodes: ["CLC_HK251", "CC01", "CC02", "CC03", "CC04"], department: "Hệ Thống Thông Tin" },
    { id: "2", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "3", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "4", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "5", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
  ],
  "Học Kỳ 2 / 2024 - 2025": [
    { id: "6", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "7", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "8", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
  ],
  "Học kỳ 1 / 2024 - 2025": [
    { id: "9", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "10", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
    { id: "11", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
  ],
};

const tutorCoursesData = {
  "Học Kỳ 1 / 2025 - 2026": [
    {
      id: "692329879a10367a75462fbf", code: "CO3001", name: "Calculus 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Khoa Khoa học Ứng dụng" },
    { id: "102", code: "CO3001", name: "Calculus 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC05", "CC08"], department: "Khoa Khoa học Ứng dụng" },
    { id: "103", code: "CO3001", name: "Giải tích 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CQ", "L01", "L02"], department: "Khoa Khoa học Ứng dụng" },
    { id: "104", code: "CO3001", name: "Giải tích 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CQ", "L01", "L02"], department: "Khoa Khoa học Ứng dụng" },
  ],
  "Học Kỳ 2 / 2024 - 2025": [
    { id: "105", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
    { id: "106", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
    { id: "107", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
    { id: "108", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
  ],
};

export default function CoursesPage() {

  let rolecheck;
  if(userRole === 'Student'){
    rolecheck = studentCoursesData;
  }else{
    rolecheck = tutorCoursesData;
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {userRole === 'Student' ? 'My Courses' : 'My Session'}
      </h1>
      <CourseDropDown />

      <div className="space-y-8">
        {Object.entries(rolecheck).map(([semester, courses]) => (
          <div key={semester}>
            <h2 className="text-lg font-bold text-blue-700 mb-3">• {semester}</h2>
            <div className="space-y-3">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
