'use client'; // Bắt buộc vì có các phần tương tác

import SessionCard from "@/app/components/pages/card/SessionsCard"; 
import UploadDocumentForm from "@/app/components/pages/card/UploadDocumentForm";

interface GroupedContent {
  type: string;
  items: any[];
}

interface TutorViewProps {
  courseContent: GroupedContent[];
  courseId: string; 
}

export default function TutorView({ courseContent, courseId }: TutorViewProps) {

  return (
    <div className="p-8">
      <div className="space-y-4">
        {courseContent.length === 0 ? (
          <p>This course has no documents yet. You can start by uploading one below.</p>
        ) : (
          courseContent.map(section => (
            <SessionCard
              key={section.type}
              section={section}
              iconName={section.type}
              isManageable={true}
              defaultOpen={section.type === 'Reference'}
            />
          ))
        )}
      </div>
      <UploadDocumentForm />
    </div>
  );
}