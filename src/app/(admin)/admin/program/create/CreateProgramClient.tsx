'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload, Calendar } from 'lucide-react';

export default function CreateProgramClient() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [searchCourse, setSearchCourse] = useState('');
  const [classDuration, setClassDuration] = useState('');
  const [courseDetail, setCourseDetail] = useState('');

  const availableCourses = [
    'Dicrete Strucure for Computer Scince',
    'Data Structure and Algorithm',
    'Principle of Programming Language',
    'Database Management Systems',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering',
    'Artificial Intelligence',
  ];

  const filteredCourses = availableCourses.filter(
    course => 
      course.toLowerCase().includes(searchCourse.toLowerCase()) &&
      !selectedCourses.includes(course)
  );

  const handleAddCourse = (course: string) => {
    if (!selectedCourses.includes(course)) {
      setSelectedCourses([...selectedCourses, course]);
      setSearchCourse('');
    }
  };

  const handleRemoveCourse = (course: string) => {
    setSelectedCourses(selectedCourses.filter(c => c !== course));
  };

  const handleSubmit = () => {
    const formData = {
      courses: selectedCourses,
      duration: classDuration,
      detail: courseDetail,
    };
    console.log('Program created:', formData);
    router.push('/admin/program-management');
  };

  const handleCancel = () => {
    router.push('/admin/program-management');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Program</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          {/* Select Course */}
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Select Course:
            </label>
            
            {/* Search */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Course:"
                value={searchCourse}
                onChange={(e) => setSearchCourse(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchCourse && (
                <button
                  onClick={() => setSearchCourse('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {searchCourse && filteredCourses.length > 0 && (
              <div className="bg-white border border-gray-300 rounded-lg shadow-lg mb-3 max-h-48 overflow-y-auto">
                {filteredCourses.map((course, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddCourse(course)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    {course}
                  </button>
                ))}
              </div>
            )}

            {/* Selected Courses */}
            <div className="space-y-2">
              {selectedCourses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                >
                  <span className="text-sm text-gray-700">{course}</span>
                  <button
                    onClick={() => handleRemoveCourse(course)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Class Material*/}
          <button className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Class Material
          </button>

          {/* Set Class Duration */}
          <div>
            <button 
              onClick={() => {
                const duration = prompt('Enter class duration (e.g., 3 months, 1 semester):');
                if (duration) setClassDuration(duration);
              }}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {classDuration || 'Set class duration'}
            </button>
            {classDuration && (
              <p className="text-sm text-gray-600 mt-2">Duration: {classDuration}</p>
            )}
          </div>

          {/* Course Detail */}
          <div>
            <textarea
              placeholder="Enter course detail ...."
              value={courseDetail}
              onChange={(e) => setCourseDetail(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={handleCancel}
              className="px-8 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedCourses.length === 0}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold px-8 py-2.5 rounded-lg transition-colors"
            >
              + Create Program
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}