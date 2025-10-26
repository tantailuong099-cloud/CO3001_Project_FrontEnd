'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function CreateUserClient() {
  const router = useRouter();
  const [userType, setUserType] = useState<'tutor' | 'student'>('tutor');
  const [formData, setFormData] = useState({
    fullName: '',
    userId: '',
    ssn: '',
    nationality: '',
    sex: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    birthPlace: '',
    address: '',
    academicYear: '',
    major: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving user:', formData, 'Type:', userType);
    router.push('/admin/user-management');
  };

  const handleCancel = () => {
    router.push('/admin/user-management');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-600 mb-8">Create User</h1>

        {/* User Type */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setUserType('tutor')}
            className={`px-8 py-2 rounded-t-lg font-semibold transition-colors ${
              userType === 'tutor'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-500 hover:text-gray-700'
            }`}
          >
            Tutor
          </button>
          <button
            onClick={() => setUserType('student')}
            className={`px-8 py-2 rounded-t-lg font-semibold transition-colors ${
              userType === 'student'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-500 hover:text-gray-700'
            }`}
          >
            Student
          </button>
        </div>

        {/* User Infor */}
        <div className="mb-6">
          <div className="bg-blue-500 text-white px-4 py-3 font-semibold">
            User Information
          </div>
          <div className="bg-gray-50 p-6 grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="BÙI VIẾT ANH QUÂN"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User ID
              </label>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                placeholder="2352980"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SSN
              </label>
              <input
                type="text"
                name="ssn"
                value={formData.ssn}
                onChange={handleInputChange}
                placeholder="064205006871"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Personal Infor */}
        <div className="mb-6">
          <div className="bg-blue-500 text-white px-4 py-3 font-semibold">
            Personal information
          </div>
          <div className="bg-gray-50 p-6">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex
                </label>
                <input
                  type="text"
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Birth place
                </label>
                <input
                  type="text"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Academic Infor */}
        <div className="mb-6">
          <div className="bg-blue-500 text-white px-4 py-3 font-semibold">
            Academic information
          </div>
          <div className="bg-gray-50 p-6 grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic year
              </label>
              <input
                type="text"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Major
              </label>
              <input
                type="text"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mb-8">
          <div className="bg-blue-500 text-white px-4 py-3 font-semibold">
            Image
          </div>
          <div className="bg-gray-50 p-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 transition-colors">
              <Upload className="w-4 h-4" />
              Select image
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded flex items-center gap-2 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}