
'use client';

import { useState } from 'react';
import { Search, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  major: string;
  type: 'student' | 'tutor';
}

export default function UserManagementClient() {
    const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'tutor'>('student');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

 
  const users: User[] = [
    // Students
    {
      id: '2351234',
      name: 'Lương Tấn Tài',
      major: 'Computer Science',
      type: 'student'
    },
    {
      id: '2351235',
      name: 'Nguyễn Văn An',
      major: 'Software Engineering',
      type: 'student'
    },
    {
      id: '2351236',
      name: 'Trần Thị Bình',
      major: 'Information Technology',
      type: 'student'
    },
    // Tutors
    {
      id: 'T001',
      name: 'Dr. Phạm Minh Hoàng',
      major: 'Computer Science',
      type: 'tutor'
    },
    {
      id: 'T002',
      name: 'Dr. Lê Thị Hương',
      major: 'Software Engineering',
      type: 'tutor'
    },
    {
      id: 'T003',
      name: 'Dr. Võ Văn Khoa',
      major: 'Data Science',
      type: 'tutor'
    },
  ];

  const filteredUsers = users.filter(
    user => 
      user.type === activeTab &&
      (user.id.includes(searchText) || 
       user.name.toLowerCase().includes(searchText.toLowerCase()) ||
       user.major.toLowerCase().includes(searchText.toLowerCase()))
  );
  const handleUserDoubleClick = (userId: string) => {
    router.push(`/admin/user-management/profile/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">User Management</h1>
          <button 
           onClick={() => router.push('/admin/user-management/create-user')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
            + Add user
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => {
                  setActiveTab('student');
                  setSearchText('');
                  setCurrentPage(1);
                }}
                className={`text-xl font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === 'student'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setActiveTab('tutor');
                  setSearchText('');
                  setCurrentPage(1);
                }}
                className={`text-xl font-semibold pb-2 border-b-2 transition-colors ${
                  activeTab === 'tutor'
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                Tutor
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search by ID, name, or major"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* User List */}
          <div className="space-y-3">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onDoubleClick={() => handleUserDoubleClick(user.id)}
                  className="flex items-center gap-4 p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors cursor-pointer"
                >
                  <UserCircle className="w-8 h-8 text-blue-600" />
                  <span className="font-semibold text-gray-800 min-w-[80px]">{user.id}</span>
                  <span className="text-gray-700 flex-1">{user.name}</span>
                  <span className="text-gray-600">Major: {user.major}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No {activeTab}s found
              </div>
            )}
            
            {[...Array(Math.max(0, 8 - filteredUsers.length))].map((_, index) => (
              <div
                key={`empty-${index}`}
                className={`p-4 rounded-lg ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
                style={{ height: '64px' }}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
            >
              PREVIOUS
            </button>
            
            <span className="text-lg font-semibold text-gray-700">
              {currentPage}/{totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}