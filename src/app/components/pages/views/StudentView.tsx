'use client';

import SessionCard from "@/app/components/pages/card/SessionsCard";

interface GroupedContent {
  type: string;
  items: any[];
}
interface StudentViewProps {
  courseContent: GroupedContent[];
}

export default function StudentView({ courseContent }: StudentViewProps) {
  return (
    <div className="p-8 space-y-6">
      {courseContent.length === 0 ? (
        <p>This course has no documents yet.</p>
      ) : (
        courseContent.map(section => (
          <SessionCard
            key={section.type}
            section={section}
            iconName={section.type} 
          />
        ))
      )}
    </div>
  );
}