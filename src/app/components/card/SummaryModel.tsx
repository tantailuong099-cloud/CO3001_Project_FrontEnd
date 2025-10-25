export default function SummaryModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[600px] max-w-full p-6">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-lg font-semibold">Summary Report</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Nội dung thống kê */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Category</th>
                <th className="border p-2">Usage (%)</th>
                <th className="border p-2">Avg. Hours</th>
                <th className="border p-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Classrooms</td>
                <td className="border p-2 text-center">82%</td>
                <td className="border p-2 text-center">420</td>
                <td className="border p-2">High utilization</td>
              </tr>
              <tr>
                <td className="border p-2">Labs</td>
                <td className="border p-2 text-center">65%</td>
                <td className="border p-2 text-center">315</td>
                <td className="border p-2">Moderate usage</td>
              </tr>
              <tr>
                <td className="border p-2">Other Facilities</td>
                <td className="border p-2 text-center">53%</td>
                <td className="border p-2 text-center">210</td>
                <td className="border p-2">Underused</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
