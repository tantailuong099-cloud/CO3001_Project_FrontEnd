"use client";

interface ProgramDescriptionProps {
  description: string;
}

export default function ProgramDescription({ description }: ProgramDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mt-6">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Course Description
      </h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
