"use client";

export default function SubjectDropdown({label: string}) {
  return (
    <select className="border border-gray-400 rounded px-2 py-1 text-sm text-black">
      <option>Subject</option>
      <option>Math</option>
      <option>Database</option>
      <option>AI</option>
    </select>
  );
}
