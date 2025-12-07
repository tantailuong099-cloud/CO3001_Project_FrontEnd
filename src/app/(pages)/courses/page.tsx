import type { Metadata } from "next";
import CourseCard from "@/app/components/pages/card/ClassCard";
import CourseDropDown from "@/app/components/pages/button/CourseDropDown";
import { getCurrentUser } from '@/lib/auth'; // 👈 Import hàm helper
import { cookies } from 'next/headers';


export const metadata: Metadata = {
  title: "My Courses",
  description: "Tutor Support System",
};

// const userRole = 'Tutor'; // đổi role để check page tương ưng


// const studentCoursesData = {
//   "Học Kỳ 1 / 2025 - 2026": [
//     {
//       id: "6929e4ec95206eeaff0e624d", code: "CO2013", name: "Database System", instructor: "VÕ THỊ NGỌC CHÂU", classCodes: ["CLC_HK251", "CC01", "CC02", "CC03", "CC04"], department: "Hệ Thống Thông Tin" },
//     { id: "2", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "3", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "4", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "5", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//   ],
//   "Học Kỳ 2 / 2024 - 2025": [
//     { id: "6", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "7", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "8", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//   ],
//   "Học kỳ 1 / 2024 - 2025": [
//     { id: "9", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "10", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//     { id: "11", code: "CO3001", name: "Software Engineering", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Công Nghệ Phần Mềm" },
//   ],
// };

// const tutorCoursesData = {
//   "Học Kỳ 1 / 2025 - 2026": [
//     {
//       id: "692329879a10367a75462fbf", code: "CO3001", name: "Calculus 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC_HK251", "CC01", "CC02"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "102", code: "CO3001", name: "Calculus 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC05", "CC08"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "103", code: "CO3001", name: "Giải tích 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CQ", "L01", "L02"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "104", code: "CO3001", name: "Giải tích 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CQ", "L01", "L02"], department: "Khoa Khoa học Ứng dụng" },
//   ],
//   "Học Kỳ 2 / 2024 - 2025": [
//     { id: "105", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "106", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "107", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
//     { id: "108", code: "CO3001", name: "General Physics 1", instructor: "Trần Tường Tuấn Phát", classCodes: ["CLC", "CC04"], department: "Khoa Khoa học Ứng dụng" },
//   ],
// };

async function getMyCourses(token: string | undefined) {
  if (!token) return {};

  try {
    // Gọi đến endpoint chuyên dụng "me/my-courses"
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/me/my-courses`, {
      headers: { 'Cookie': `access_token=${token}` },
      cache: 'no-store',
    });

    if (!response.ok) {
        console.error("Failed to fetch my courses:", await response.text());
        return {};
    }
    const courses = await response.json();

    // Xử lý và nhóm các khóa học theo học kỳ
    const groupedCourses = courses.reduce((acc, course) => {
      const semester = course.semester || "Uncategorized"; // API trả về trường 'semester'
      if (!acc[semester]) {
        acc[semester] = [];
      }
      acc[semester].push(course);
      return acc;
    }, {});

    return groupedCourses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return {};
  }
}

export default async function CoursesPage() {
  const currentUser = await getCurrentUser();
  const cookieStore = cookies(); 
  // 2. Sử dụng đối tượng đó để lấy token
  const token = cookieStore.get('access_token')?.value;

  // Nếu chưa đăng nhập, có thể hiển thị thông báo
  if (!currentUser) {
    return <div className="p-8">Please log in to see your courses.</div>;
  }

  // Lấy dữ liệu khóa học từ API
  const coursesData = await getMyCourses(token);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {currentUser.role === 'Student' ? 'My Courses' : 'My Sessions'}
      </h1>
      <CourseDropDown />

      <div className="space-y-8">
        {Object.entries(coursesData).length === 0 ? (
          <p>You are not enrolled in any courses for this semester.</p>
        ) : (
          Object.entries(coursesData).map(([semester, courses]) => (
            <div key={semester}>
              <h2 className="text-lg font-bold text-blue-700 mb-3">• {semester}</h2>
              <div className="space-y-3">
                {(courses as any[]).map(course => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// export default function CoursesPage() {

//   let rolecheck;
//   if(userRole === 'Student'){
//     rolecheck = studentCoursesData;
//   }else{
//     rolecheck = tutorCoursesData;
//   }

//   return (
//     <div className="p-8 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">
//         {userRole === 'Student' ? 'My Courses' : 'My Session'}
//       </h1>
//       <CourseDropDown />

//       <div className="space-y-8">
//         {Object.entries(rolecheck).map(([semester, courses]) => (
//           <div key={semester}>
//             <h2 className="text-lg font-bold text-blue-700 mb-3">• {semester}</h2>
//             <div className="space-y-3">
//               {courses.map(course => (
//                 <CourseCard key={course.id} course={course} />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
