import type { Metadata } from "next";
import SessionCard from "@/app/components/pages/card/SessionsCard"; 
import UploadDocumentForm from "@/app/components/pages/card/UploadDocumentForm";

import { FileText, Book, Presentation } from "lucide-react";


export const metadata: Metadata = {
  title: "Courses Detail",
  description: "Tutor Support System",
};


const userRole = 'Tutor'; // đổi role để check tutor/student

// Dữ liệu giả lập
const courseContent = [
  { type: 'General', items: ['Syllabus', 'Database Systems (CO2013)_Video'] },
  { type: 'Reference', items: ['Book 1', 'Book 2', 'Book 3'] },
  { type: 'Slide', items: ['Course Introduction', 'Chapter 1', 'Chapter 3'] },
];


export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const StudentView = () => (
      <div className="space-y-6">
        {courseContent.map(section => (
          <SessionCard
            key={section.type}
            section={section}
            iconName={section.type} 
          />
        ))}
      </div>
  );

  const TutorView = () => (
    <div className="p-8">
      <div className="space-y-4">
        {courseContent.map(section => (
          <SessionCard
            key={section.type}
            section={section}
            iconName={section.type}
            isManageable={true}
            defaultOpen={section.type === 'Reference'}
          />
        ))}
      </div>
      <UploadDocumentForm />
    </div>
  );

  return (userRole === 'Tutor' ? <TutorView /> : <StudentView />);
}