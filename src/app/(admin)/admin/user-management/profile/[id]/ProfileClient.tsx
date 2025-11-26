
// 'use client';

// import { useRouter } from 'next/navigation';
// import { UserCircle, Mail, User } from 'lucide-react';

// interface ProfileClientProps {
//   userId: string;
// }

// export default function ProfileClient({ userId }: ProfileClientProps) {
//   const router = useRouter();

//   const userData = {
//     name: 'LƯƠNG TẤN TÀI',
//     id: userId,
//     role: 'Student' as 'Tutor' | 'Student',
//     email: 'luong.tan.tai@hcmut.edu.vn',
//     avatar: undefined as string | undefined,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-7xl mx-auto p-8">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Profile page</h1>
//           <button
//             onClick={() => router.push('/admin/user-management')}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
//           >
//             Back to list
//           </button>
//         </div>

//         <div className="bg-white rounded-lg shadow-md p-8">
//           {/* User Profile */}
//           <div className="flex items-start gap-6 mb-8 pb-6 border-b-2">
//             <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
//               {userData.avatar ? (
//                 <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
//               ) : (
//                 <UserCircle className="w-16 h-16 text-purple-600" />
//               )}
//             </div>
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h2>
//               <p className="text-gray-800">{userData.role}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* User Detail */}
//             <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
//               <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
//                 User detail
//               </h3>
//               <div className="bg-gray-50 p-4 space-y-4">
//                 <div className="flex items-start gap-2">
//                   <User className="w-4 h-4 text-gray-500 mt-1" />
//                   <div>
//                     <div className="text-sm text-gray-600">Name</div>
//                     <p className="text-sm text-gray-600 font-medium">{userData.name}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <Mail className="w-4 h-4 text-gray-500 mt-1" />
//                   <div>
//                     <div className="text-sm text-gray-600">Email</div>
//                     <p className="text-sm text-blue-600 hover:underline cursor-pointer">
//                       {userData.email}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-gray-600">Role</div>
//                   <p className="text-sm text-gray-600 font-medium">{userData.role}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Placeholder sections for future features */}
//             <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
//               <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
//                 Activities
//               </h3>
//               <div className="bg-gray-50 p-4">
//                 <p className="text-sm text-gray-600">
//                   The list of activities related to this user will be displayed here
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useRouter } from 'next/navigation';
import { UserCircle, Mail, User, Phone, Calendar, BookOpen } from 'lucide-react';

interface ProfileClientProps {
  userId: string;
}

interface UserData {
  id: string;
  name: string;
  major: string;
  type: 'student' | 'tutor';
  email: string;
  phone: string;
  enrollmentDate?: string;
  department?: string;
  avatar?: string;
}

// Mock data - should match your UserManagementClient data
const usersData: UserData[] = [
  {
    id: '2351234',
    name: 'Lương Tấn Tài',
    major: 'Computer Science',
    type: 'student',
    email: 'luong.tai@student.hcmut.edu.vn',
    phone: '+84 123 456 789',
    enrollmentDate: '2023-09-01',
  },
  {
    id: '2351235',
    name: 'Nguyễn Văn An',
    major: 'Software Engineering',
    type: 'student',
    email: 'nguyen.an@student.hcmut.edu.vn',
    phone: '+84 123 456 790',
    enrollmentDate: '2023-09-01',
  },
  {
    id: '2351236',
    name: 'Trần Thị Bình',
    major: 'Information Technology',
    type: 'student',
    email: 'tran.binh@student.hcmut.edu.vn',
    phone: '+84 123 456 791',
    enrollmentDate: '2023-09-01',
  },
  {
    id: 'T001',
    name: 'Dr. Phạm Minh Hoàng',
    major: 'Computer Science',
    type: 'tutor',
    email: 'pham.hoang@hcmut.edu.vn',
    phone: '+84 987 654 321',
    department: 'Computer Science Department',
  },
  {
    id: 'T002',
    name: 'Dr. Lê Thị Hương',
    major: 'Software Engineering',
    type: 'tutor',
    email: 'le.huong@hcmut.edu.vn',
    phone: '+84 987 654 322',
    department: 'Software Engineering Department',
  },
  {
    id: 'T003',
    name: 'Dr. Võ Văn Khoa',
    major: 'Data Science',
    type: 'tutor',
    email: 'vo.khoa@hcmut.edu.vn',
    phone: '+84 987 654 323',
    department: 'Data Science Department',
  },
];

export default function ProfileClient({ userId }: ProfileClientProps) {
  const router = useRouter();

  // Find user by ID
  const userData = usersData.find(u => u.id === userId);

  // If user not found
  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Profile page</h1>
            <button
              onClick={() => router.push('/admin/user-management')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
              Back to list
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
            <p className="text-gray-600">The user with ID {userId} does not exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile page</h1>
          <button
            onClick={() => router.push('/admin/user-management')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Back to list
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* User Profile */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b-2">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center overflow-hidden">
              {userData.avatar ? (
                <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-16 h-16 text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{userData.name}</h2>
              <p className="text-gray-600 mb-2">
                {userData.type === 'student' ? 'Student' : 'Tutor'} - ID: {userData.id}
              </p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {userData.major}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Detail */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                User detail
              </h3>
              <div className="bg-gray-50 p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Name</div>
                    <p className="text-sm text-gray-800 font-medium">{userData.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                      {userData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Phone</div>
                    <p className="text-sm text-gray-800">{userData.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Role</div>
                    <p className="text-sm text-gray-800 font-medium capitalize">{userData.type}</p>
                  </div>
                </div>

                {userData.type === 'student' && userData.enrollmentDate && (
                  <div className="flex items-start gap-3 pt-2 border-t">
                    <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Enrollment Date</div>
                      <p className="text-sm text-gray-800">
                        {new Date(userData.enrollmentDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {userData.type === 'tutor' && userData.department && (
                  <div className="flex items-start gap-3 pt-2 border-t">
                    <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Department</div>
                      <p className="text-sm text-gray-800">{userData.department}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Activities */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Activities
              </h3>
              <div className="bg-gray-50 p-4">
                <p className="text-sm text-gray-600">
                  The list of activities related to this user will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}