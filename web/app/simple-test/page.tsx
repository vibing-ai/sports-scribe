export default function SimpleTest() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Simple Tailwind Test</h1>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Color Test</h2>
          <div className="space-y-4">
            <p className="text-green-600">This text should be green</p>
            <p className="text-red-600">This text should be red</p>
            <p className="text-blue-600">This text should be blue</p>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Button Test</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Click me
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Success
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
