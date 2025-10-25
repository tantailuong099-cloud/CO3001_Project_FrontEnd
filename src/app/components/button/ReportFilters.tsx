export default function ReportFilters() {
  return (
    <div className="flex justify-between gap-4">
      <select className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3">
        <option>Filter by resources...</option>
        <option>Resources</option>
        <option>Facility</option>
        <option>Student</option>
        <option>Lecture</option>
      </select>

      <select className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3">
        <option>Filter by semester</option>
      </select>

      <select className="border border-gray-400 rounded-md px-3 py-2 text-sm w-1/3">
        <option>Filter by program</option>
      </select>
    </div>
  );
}
