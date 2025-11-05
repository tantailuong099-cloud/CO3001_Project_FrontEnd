'use client';

import { useState } from 'react';
import { X, Search, UserCheck, UserPlus } from 'lucide-react';

interface Tutor {
  id: string;
  name: string;
  expertise: string[];
  photo?: string;
  isAssigned?: boolean;
}

interface AssignTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  currentTutors: string[];
  onAssign: (tutorId: string) => void;
  onRemove: (tutorName: string) => void;
}

export default function AssignTutorModal({
  isOpen,
  onClose,
  courseName,
  currentTutors,
  onAssign,
  onRemove,
}: AssignTutorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'assigned'>('all');

  const availableTutors: Tutor[] = [
    {
      id: '1',
      name: 'Prof. A',
      expertise: ['Algorithms', 'Data Management', 'C++'],
    },
    {
      id: '2',
      name: 'Pr. B',
      expertise: ['Objectthms', 'Jd Promotot'],
    },
    {
      id: '3',
      name: 'Dr. C',
      expertise: ['Object-Oriented Programming', 'Java'],
    },
    {
      id: '4',
      name: 'Dr. ABC',
      expertise: ['Database Systems', 'SQL', 'Data Science'],
    },
    {
      id: '5',
      name: 'Prof. Smith',
      expertise: ['Machine Learning', 'AI', 'Python'],
    },
  ];

  const tutorsWithStatus = availableTutors.map(tutor => ({
    ...tutor,
    isAssigned: currentTutors.includes(tutor.name),
  }));

  const filteredTutors = tutorsWithStatus.filter(tutor => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.expertise.some((exp) =>
        exp.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    if (activeTab === 'assigned') {
      return matchesSearch && tutor.isAssigned;
    }
    return matchesSearch;
  });

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col pointer-events-auto animate-scale-in">
            {/* Header */}
          <div className="bg-gray-900 text-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Assign Tutor to: {courseName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Currently Assigned Tutors
              </h3>
              <div className="space-y-2">
                {currentTutors.map((tutor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">Remove:</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {tutor}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(tutor)}
                      className="w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {currentTutors.length === 0 && (
                  <p className="text-sm text-gray-500 italic py-2">
                    No tutors assigned yet
                  </p>
                )}
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by tutor name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Available Tutors */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Find and Assign Available Tutors
              </h3>
              <div className="space-y-3">
                {filteredTutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                      tutor.isAssigned
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Photo */}
                      <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-semibold">
                        Photo
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {tutor.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          Expertise: {tutor.expertise.join(', ')}
                        </div>
                      </div>
                    </div>
                    {!tutor.isAssigned && (
                      <button
                        onClick={() => onAssign(tutor.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
                      >
                        Assign
                      </button>
                    )}
                  </div>
                ))}
                {filteredTutors.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No tutors found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}