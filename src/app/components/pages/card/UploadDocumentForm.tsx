export default function UploadDocumentForm() {
    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold text-blue-700 mb-4">Upload document</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
                <div>
                    <label htmlFor="doc-name" className="block text-sm font-medium text-gray-700">Document name:</label>
                    <input type="text" id="doc-name" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="doc-link" className="block text-sm font-medium text-gray-700">Link:</label>
                    <input type="text" id="doc-link" className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="doc-category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select id="doc-category" className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option>Slide/Reference/New category</option>
                        <option>Slide</option>
                        <option>Reference</option>
                        <option>General</option>
                    </select>
                </div>
                <div className="flex space-x-3">
                    <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Upload</button>
                    <button className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">Cancel</button>
                </div>
            </div>
        </div>
    )
}