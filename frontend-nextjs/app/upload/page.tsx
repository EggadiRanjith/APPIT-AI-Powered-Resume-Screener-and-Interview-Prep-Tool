export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Upload Your Resume</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
            >
              Select File
            </label>
            <p className="mt-2 text-sm text-gray-600">
              or drag and drop your file here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
