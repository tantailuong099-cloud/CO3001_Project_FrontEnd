'use client';

import { useState } from 'react';
import { ChevronDown, Clock, X } from 'lucide-react';

// Dữ liệu giả lập cho các buổi học
const timetable = [
    'CC01 - 05/09',
    'CC01 - 12/09',
    'CC01 - 19/09',
    'CC01 - 26/09',
    'CC01 - 03/10',
];

export default function FeedbackSidebar() {
    const [activeSession, setActiveSession] = useState(timetable[0]);

    return (
        <div className="w-64 h-full bg-gray-100 border-r border-gray-300 p-4 flex flex-col">
            <button className="self-end p-1 mb-4 hover:bg-gray-200 rounded-full">
                <X size={20} />
            </button>

            {/* Timetable Section */}
            <div>
                <button className="w-full flex items-center justify-between text-left p-2 rounded-md">
                    <span className="font-semibold">Timetable</span>
                    <ChevronDown size={16} />
                </button>
                <ul className="mt-2 space-y-1">
                    {timetable.map((session) => (
                        <li key={session}>
                            <button
                                onClick={() => setActiveSession(session)}
                                className={`w-full flex items-center p-2 rounded-md text-sm text-left transition-colors ${activeSession === session
                                        ? 'bg-blue-500 text-white'
                                        : 'hover:bg-gray-200'
                                    }`}
                            >
                                <Clock size={16} className="mr-3" />
                                <span>{session}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}