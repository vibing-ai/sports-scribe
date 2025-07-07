export default function TailwindTest() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tailwind CSS Test</h1>
        
        <div className="space-y-6">
          <div className="p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">1. Text Colors</h2>
            <p className="text-green-600 font-medium">This text should be green if Tailwind is working.</p>
            <p className="text-red-600">This text should be red if Tailwind is working.</p>
            <p className="text-blue-600">This text should be blue if Tailwind is working.</p>
          </div>
          
          <div className="p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">2. Buttons</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Primary Button
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Success Button
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">3. Card</h2>
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Test Card</h3>
              <p className="mb-3 font-normal text-gray-700">
                This is a test card with some sample text to demonstrate Tailwind CSS styling.
              </p>
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
