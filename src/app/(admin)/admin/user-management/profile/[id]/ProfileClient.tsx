
'use client';

import { useRouter } from 'next/navigation';
import { UserCircle, Mail, User, Phone, Calendar, BookOpen, Users, Clock, FileText, GraduationCap } from 'lucide-react';

interface ProfileClientProps {
  userId: string;
}

interface Constraint {
  day: string;
  startTime: string;
  endTime: string;
}

interface StudentData {
  id: string;
  name: string;
  major: string;
  type: 'student';
  email: string;
  phone: string;
  enrollmentDate: string;
  avatar?: string;
  subjects: string[];
  class: string[];
}

interface TutorData {
  id: string;
  name: string;
  major: string;
  type: 'tutor';
  email: string;
  phone: string;
  department: string;
  avatar?: string;
  preferredSubjects: string[];
  preferredStudentLevel?: string;
  maxStudents: number;
  courses: string[];
  sharedMaterial: string[];
  constraints: Constraint[];
}

type UserData = StudentData | TutorData;

// Mock data
const usersData: UserData[] = [
  // Students
  {
    id: '2351234',
    name: 'Lương Tấn Tài',
    major: 'Computer Science',
    type: 'student',
    email: 'luong.tai@student.hcmut.edu.vn',
    phone: '+84 123 456 789',
    enrollmentDate: '2023-09-01',
    subjects: ['CO3001', 'CO3005', 'CO3009'],
    class: ['CC01', 'CC02'],
  },
  {
    id: '2351235',
    name: 'Nguyễn Văn An',
    major: 'Software Engineering',
    type: 'student',
    email: 'nguyen.an@student.hcmut.edu.vn',
    phone: '+84 123 456 790',
    enrollmentDate: '2023-09-01',
    subjects: ['CO3001', 'CO3007', 'CO3010'],
    class: ['CC01'],
  },
  {
    id: '2351236',
    name: 'Trần Thị Bình',
    major: 'Information Technology',
    type: 'student',
    email: 'tran.binh@student.hcmut.edu.vn',
    phone: '+84 123 456 791',
    enrollmentDate: '2023-09-01',
    subjects: ['CO3001', 'CO3002', 'CO3008'],
    class: ['CC02', 'CC03'],
  },
  // Tutors
  {
    id: 'T001',
    name: 'Dr. Phạm Minh Hoàng',
    major: 'Computer Science',
    type: 'tutor',
    email: 'pham.hoang@hcmut.edu.vn',
    phone: '+84 987 654 321',
    department: 'Computer Science Department',
    preferredSubjects: ['CO3001', 'CO3005', 'CO3009'],
    preferredStudentLevel: 'sophomore',
    maxStudents: 15,
    courses: ['CO3001', 'CO3005'],
    sharedMaterial: ['Lecture Notes - Chapter 1', 'Problem Set 1', 'Solution Guide'],
    constraints: [
      { day: 'Monday', startTime: '09:00', endTime: '11:00' },
      { day: 'Wednesday', startTime: '14:00', endTime: '16:00' },
    ],
  },
  {
    id: 'T002',
    name: 'Dr. Lê Thị Hương',
    major: 'Software Engineering',
    type: 'tutor',
    email: 'le.huong@hcmut.edu.vn',
    phone: '+84 987 654 322',
    department: 'Software Engineering Department',
    preferredSubjects: ['CO3007', 'CO3010'],
    preferredStudentLevel: 'junior',
    maxStudents: 12,
    courses: ['CO3007'],
    sharedMaterial: ['UML Diagrams Tutorial', 'Design Patterns Guide'],
    constraints: [
      { day: 'Tuesday', startTime: '10:00', endTime: '12:00' },
      { day: 'Thursday', startTime: '15:00', endTime: '17:00' },
    ],
  },
  {
    id: 'T003',
    name: 'Dr. Võ Văn Khoa',
    major: 'Data Science',
    type: 'tutor',
    email: 'vo.khoa@hcmut.edu.vn',
    phone: '+84 987 654 323',
    department: 'Data Science Department',
    preferredSubjects: ['CO3002', 'CO3008'],
    preferredStudentLevel: 'senior',
    maxStudents: 10,
    courses: ['CO3002', 'CO3008'],
    sharedMaterial: ['Python for Data Science', 'Machine Learning Basics'],
    constraints: [
      { day: 'Friday', startTime: '13:00', endTime: '15:00' },
    ],
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

  // Render Student Profile
  if (userData.type === 'student') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Student Profile</h1>
            <button
              onClick={() => router.push('/admin/user-management')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
            >
              Back to list
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Student Profile Header */}
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
                <p className="text-gray-600 mb-2">Student - ID: {userData.id}</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {userData.major}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Detail */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Student Details
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
                </div>
              </div>

              {/* Academic Information */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Academic Information
                </h3>
                <div className="bg-gray-50 p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Subjects</div>
                      <div className="flex flex-wrap gap-2">
                        {userData.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t">
                    <GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">Classes</div>
                      <div className="flex flex-wrap gap-2">
                        {userData.class.map((cls, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 pt-6 border-t">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                Edit Profile
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                Delete Student
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Tutor Profile
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tutor Profile</h1>
          <button
            onClick={() => router.push('/admin/user-management')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Back to list
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Tutor Profile Header */}
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
              <p className="text-gray-600 mb-2">Tutor - ID: {userData.id}</p>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {userData.major}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tutor Details */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Tutor Details
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

                <div className="flex items-start gap-3 pt-2 border-t">
                  <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Department</div>
                    <p className="text-sm text-gray-800">{userData.department}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Max Students</div>
                    <p className="text-sm text-gray-800 font-medium">{userData.maxStudents} students</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Teaching Preferences */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Teaching Preferences
              </h3>
              <div className="bg-gray-50 p-4 space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">Preferred Subjects</div>
                    <div className="flex flex-wrap gap-2">
                      {userData.preferredSubjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {userData.preferredStudentLevel && (
                  <div className="flex items-start gap-3 pt-2 border-t">
                    <Users className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Preferred Student Level</div>
                      <p className="text-sm text-gray-800 font-medium capitalize">
                        {userData.preferredStudentLevel}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 pt-2 border-t">
                  <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">Courses</div>
                    <div className="flex flex-wrap gap-2">
                      {userData.courses.map((course, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Constraints */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Time Constraints
              </h3>
              <div className="bg-gray-50 p-4">
                {userData.constraints.length > 0 ? (
                  <div className="space-y-3">
                    {userData.constraints.map((constraint, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{constraint.day}</p>
                          <p className="text-xs text-gray-600">
                            {constraint.startTime} - {constraint.endTime}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No time constraints set</p>
                )}
              </div>
            </div>

            {/* Shared Materials */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Shared Materials
              </h3>
              <div className="bg-gray-50 p-4">
                {userData.sharedMaterial.length > 0 ? (
                  <div className="space-y-2">
                    {userData.sharedMaterial.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <p className="text-sm text-gray-800">{material}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No shared materials yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 pt-6 border-t">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
              Edit Profile
            </button>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
              Delete Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}