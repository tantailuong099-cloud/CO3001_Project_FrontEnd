
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircle, Mail, User as UserIcon, Calendar, BookOpen, Users, Clock, FileText, GraduationCap, Building2, Hash } from 'lucide-react';
import { userApi, type User, type Student, type Tutor, parseStringArray, parseConstraints, type TutorConstraint } from '@/app/services/userApi';

interface ProfileClientProps {
  userId: string;
}

export default function ProfileClient({ userId }: ProfileClientProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user by ID
        const user = await userApi.getUserById(userId);
        if (!user) {
          setError('User not found');
          return;
        }
        setUserData(user);
      } catch (err: any) {
        const errorMessage = err?.message || 'Failed to load user profile';
        setError(errorMessage);
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // Loading State
  if (loading) {
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !userData) {
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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {error || 'User Not Found'}
            </h2>
            <p className="text-gray-600">
              {error || `The user with ID ${userId} does not exist.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Student Profile
  if (userData.role === 'Student') {
    const studentData = userData as Student;
    const enrolledCourses = parseStringArray(studentData.enrolledCourses);

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
                {studentData.avatar ? (
                  <img src={studentData.avatar} alt={studentData.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-16 h-16 text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{studentData.name}</h2>
                <p className="text-gray-600 mb-2">Student ID: {studentData.studentId || 'N/A'}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {studentData.major || 'N/A'}
                  </span>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {studentData.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Student Details */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Student Details
                </h3>
                <div className="bg-gray-50 p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <UserIcon className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Full Name</div>
                      <p className="text-sm text-gray-800 font-medium">{studentData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Student ID</div>
                      <p className="text-sm text-gray-800 font-medium">{studentData.studentId || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <p className="text-sm text-blue-600">{studentData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Major</div>
                      <p className="text-sm text-gray-800 font-medium">{studentData.major || 'N/A'}</p>
                    </div>
                  </div>

                  {studentData.createdAt && (
                    <div className="flex items-start gap-3 pt-2 border-t">
                      <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Account Created</div>
                        <p className="text-sm text-gray-800">
                          {new Date(studentData.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Enrolled Courses */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Enrolled Courses
                </h3>
                <div className="bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        {enrolledCourses.length > 0 ? (
                          enrolledCourses.map((course, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                            >
                              {course}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600">No courses enrolled</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Performance - Subjects with Scores */}
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden lg:col-span-2">
                <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                  Academic Performance
                </h3>
                <div className="bg-gray-50 p-4">
                  {studentData.subjects && studentData.subjects.length > 0 ? (
                    <div className="space-y-4">
                      {studentData.subjects.map((subject, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-semibold text-gray-800">{subject.Subject}</h4>
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                              Final: {subject.finalScore.toFixed(2)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-xs text-gray-500">Midterm</p>
                              <p className="text-sm font-semibold text-gray-800">{subject.scores.midterm.toFixed(2)}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-xs text-gray-500">Final Exam</p>
                              <p className="text-sm font-semibold text-gray-800">{subject.scores.final.toFixed(2)}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-xs text-gray-500">Project</p>
                              <p className="text-sm font-semibold text-gray-800">{subject.scores.project.toFixed(2)}</p>
                            </div>
                            <div className="text-center p-2 bg-gray-50 rounded">
                              <p className="text-xs text-gray-500">Participation</p>
                              <p className="text-sm font-semibold text-gray-800">{subject.scores.participation.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No academic records available</p>
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
                Delete Student
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Tutor Profile
  const tutorData = userData as Tutor;
  const assignedCourses = parseStringArray(tutorData.assignedCourses);
  const sharedMaterials = parseStringArray(tutorData.sharedMaterial);
  const constraints: TutorConstraint[] = parseConstraints(tutorData.constraints);

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
              {tutorData.avatar ? (
                <img src={tutorData.avatar} alt={tutorData.name} className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-16 h-16 text-purple-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{tutorData.name}</h2>
              <p className="text-gray-600 mb-2">Tutor ID: {tutorData.tutorId || 'N/A'}</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {tutorData.department || 'N/A'}
                </span>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {tutorData.role}
                </span>
              </div>
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
                  <UserIcon className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Full Name</div>
                    <p className="text-sm text-gray-800 font-medium">{tutorData.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Hash className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tutor ID</div>
                    <p className="text-sm text-gray-800 font-medium">{tutorData.tutorId || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <p className="text-sm text-blue-600">{tutorData.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Department</div>
                    <p className="text-sm text-gray-800 font-medium">{tutorData.department || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Max Students</div>
                    <p className="text-sm text-gray-800 font-medium">{tutorData.maxStudents || 0} students</p>
                  </div>
                </div>

                {tutorData.createdAt && (
                  <div className="flex items-start gap-3 pt-2 border-t">
                    <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Account Created</div>
                      <p className="text-sm text-gray-800">
                        {new Date(tutorData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Assigned Courses */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Assigned Courses
              </h3>
              <div className="bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {assignedCourses.length > 0 ? (
                        assignedCourses.map((course, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                          >
                            {course}
                          </span>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">No courses assigned</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Constraints */}
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <h3 className="bg-white text-lg font-semibold text-blue-600 px-4 py-3 border-b-2 border-gray-200">
                Available Time Slots
              </h3>
              <div className="bg-gray-50 p-4">
                {constraints.length > 0 ? (
                  <div className="space-y-3">
                    {constraints.map((constraint, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
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
                {sharedMaterials.length > 0 ? (
                  <div className="space-y-2">
                    {sharedMaterials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-white rounded shadow-sm">
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <a
                          href={material}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline truncate"
                        >
                          {material.includes('http') ? material : material}
                        </a>
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