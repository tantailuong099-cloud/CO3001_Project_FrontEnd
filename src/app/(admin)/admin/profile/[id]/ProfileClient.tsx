'use client';

import { useRouter } from 'next/navigation';
import { UserCircle, Mail, Clock } from 'lucide-react';

interface ProfileClientProps {
  userId: string;
}

export default function ProfileClient({ userId }: ProfileClientProps) {
  const router = useRouter();

  const userData = {
    name: 'LƯƠNG TẤN TÀI',
    id: userId,
    role: 'Admin',
    email: 'luong.tan.tai@hcmut.edu.vn',
    phone: '0123456789',
    address: 'Ho Chi Minh City',
    department: 'Computer Science',
    timeZone: 'GMT +7 (Asia/Ho Chi Minh)',
    lastAccess: 'Wednesday, 20 November 2024, 4:50 PM (3 months ago)',
    firstAccess: 'Wednesday, 20 November 2024, 2:39 PM (3 months ago)',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile page</h1>
          {/* <button
            onClick={() => router.push('/admin/user-management')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition-colors"
          >
            Back to list
          </button> */}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {/* User Profile */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b-2">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
              <UserCircle className="w-16 h-16 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{userData.name}</h2>
              <p className="text-gray-600">{userData.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* User Detail */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  User detail
                </h3>
                <div className="bg-gray-50 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Phone number</div>
                    <p className="text-sm">{userData.phone}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Address</div>
                    <p className="text-sm">{userData.address}</p>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Department</div>
                    <p className="text-sm">{userData.department}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{userData.timeZone}</span>
                  </div>
                </div>
              </div>

              {/* Privacy and Policies */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Privacy and Policies
                </h3>
                <div className="bg-gray-50 p-4">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Data retention summary
                  </a>
                </div>
              </div>

              {/* Course Details */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Course Details
                </h3>
                <div className="bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">Course enrolment information</p>
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

            <div className="space-y-6">
              {/* Other Content */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Other Content
                </h3>
                <div className="bg-gray-50 p-4 space-y-2">
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Blog entries</a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Forum posts</a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Forum discussions</a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Learning plans</a>
                </div>
              </div>

              {/* Reports */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Reports
                </h3>
                <div className="bg-gray-50 p-4 space-y-2">
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Browser sessions</a>
                  <a href="#" className="block text-sm text-blue-600 hover:underline">Grades overview</a>
                </div>
              </div>

              {/* Login Activities */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Login Activities
                </h3>
                <div className="bg-gray-50 p-4 space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">First access to the site</div>
                    <p className="text-sm text-gray-600">{userData.firstAccess}</p>
                  </div>
                  <div className="border-t pt-3">
                    <div className="text-sm font-medium text-gray-700">Last access to the site</div>
                    <p className="text-sm text-gray-600">{userData.lastAccess}</p>
                  </div>
                  
                </div>
              </div>

              {/* Support */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Support
                </h3>
                <div className="bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Contact and support information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}