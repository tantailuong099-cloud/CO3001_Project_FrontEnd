// 'use client';

// import { Clock, MapPin } from 'lucide-react';

// interface CourseCardProps {
//   title: string;
//   courseCode: string;
//   time?: string;
//   room?: string;
//   onView?: () => void;
//   onEdit?: () => void;
//   onAssignTutor?: () => void;
//   mode?: 'view' | 'assign';
// }

// export default function CourseCard({
//   title,
//   courseCode,
//   time,
//   room,
//   onView,
//   onEdit,
//   onAssignTutor,
//   mode = 'view',
// }: CourseCardProps) {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition-shadow flex flex-col h-full">
//       {/* Course Title */}
//       <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 h-14">
//         {title}
//       </h3>

//       <div className="mb-4">
//         <span className="inline-block px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-300">
//           {courseCode}
//         </span>
//       </div>

//       {/* Time and Room */}
//       {time && room && (
//         <div className="flex flex-col gap-2 mb-5 text-gray-600">
//           <div className="flex items-center gap-2">
//             <Clock className="w-4 h-4 text-gray-400" />
//             <span className="text-sm">{time}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <MapPin className="w-4 h-4 text-gray-400" />
//             <span className="text-sm">{room}</span>
//           </div>
//         </div>
//       )}

//       <div className="flex-grow"></div>

//       {/*Buttons */}
//       {mode === 'view' ? (
//         <div className="flex gap-2 mt-auto">
//           <button
//             onClick={onView}
//             className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
//           >
//             View
//           </button>
//           <button
//             onClick={onEdit}
//             className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
//           >
//             Edit
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={onAssignTutor}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm mt-auto"
//         >
//           Assign Tutor
//         </button>
//       )}
//     </div>
//   );
// }
// 'use cilent';

// import Link from 'next/link';

// // Định nghĩa kiểu dữ liệu cho một khóa học để TypeScript kiểm tra
// interface Course {
//   id: string;
//   code: string;
//   name: string;
//   instructor: string;
//   classCodes: string[];
//   department: string;
// }

// // Component nhận một 'course' object làm prop
// export default function CourseCard({ course }: { course: Course }) {
//   return (
//     // Link điều hướng đến trang chi tiết với ID tương ứng
//     <Link href={`/courses/${course.id}`}>
//       <div className="flex items-center w-full bg-white border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
//         {/* Thanh màu xanh bên trái */}
//         <div className="w-2 h-full bg-blue-500 self-stretch"></div>

//         {/* Nội dung thông tin */}
//         <div className="p-3 text-sm">
//           <p className="font-semibold text-gray-800">
//             {course.name} ({course.code})_{course.instructor} [{course.classCodes.join(', ')}]
//           </p>
//           <p className="text-gray-600">{course.department}</p>
//         </div>
//       </div>
//     </Link>
//   );
// }


'use client'; // 👈 SỬA LẠI THÀNH 'client'

import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho một khóa học để TypeScript kiểm tra
// LƯU Ý: Hãy đảm bảo các trường này khớp với dữ liệu API trả về
interface Course {
  _id: string; // API thường trả về _id
  courseName: string; // API trả về courseName
  courseCode: string; // API trả về courseCode
  department: string; 
  // instructor và classCodes có thể không có trực tiếp trong Course schema
  // Chúng ta sẽ xử lý chúng
}

// Component nhận một 'course' object làm prop
export default function CourseCard({ course }: { course: any }) { // Tạm thời dùng 'any' để tránh lỗi type
  return (
    // Link điều hướng đến trang chi tiết với _id
    <Link href={`/courses/${course._id}`}> 
      <div className="flex items-center w-full bg-white border border-gray-300 rounded-md overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="w-2 h-full bg-blue-500 self-stretch"></div>
        <div className="p-3 text-sm">
          <p className="font-semibold text-gray-800">
            {/* Sử dụng các trường dữ liệu thật từ API */}
            {course.courseName} ({course.courseCode})
            {/* {course.instructor} [{course.classCodes.join(', ')}] - Tạm thời ẩn đi */}
          </p>
          <p className="text-gray-600">{course.department}</p>
        </div>
      </div>
    </Link>
  );
}
