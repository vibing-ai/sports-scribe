'use client'

import { Button } from '@heroui/react'

export default function ButtonTest() {
  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Button Styling Test</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">1. Hero UI Buttons (Using @heroui/react)</h2>
          <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border">
            <Button color="primary" data-slot="base">Primary</Button>
            <Button color="secondary" data-slot="base">Secondary</Button>
            <Button color="success" data-slot="base">Success</Button>
            <Button color="warning" data-slot="base">Warning</Button>
            <Button color="danger" data-slot="base">Danger</Button>
            <Button variant="ghost" data-slot="base">Ghost</Button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">2. Regular Buttons with Inline Styles</h2>
          <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg border">
            <button style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
            }}>
              Primary
            </button>
            <button style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
            }}>
              Secondary
            </button>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">3. Test if CSS is loaded</h2>
          <div className="p-4 bg-white rounded-lg border">
            <p className="text-green-600 font-medium">If you can read this in green, Tailwind CSS is working.</p>
            <p className="mt-2">If the buttons above don&apos;t have colors, the issue is with Hero UI styles not being applied.</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">4. Check Console</h2>
          <div className="p-4 bg-white rounded-lg border">
            <p>Please check your browser&apos;s console (F12) for any errors related to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Failed to load CSS files</li>
              <li>Don&apos;t see any errors?</li>
              <li>Any other error messages</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
