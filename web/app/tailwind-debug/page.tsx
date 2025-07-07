'use client';

import { useEffect } from 'react';

export default function TailwindDebug() {
  useEffect(() => {
    // Check if Tailwind's CSS is loaded
    const isTailwindLoaded = () => {
      // Check for some Tailwind-specific classes
      const testEl = document.createElement('div');
      testEl.className = 'hidden';
      document.body.appendChild(testEl);
      const isHidden = window.getComputedStyle(testEl).display === 'none';
      document.body.removeChild(testEl);
      return isHidden;
    };

    console.log('Is Tailwind loaded?', isTailwindLoaded());
    console.log('Computed styles for .text-green-600:', window.getComputedStyle(document.documentElement).getPropertyValue('--tw-text-opacity'));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tailwind CSS Debug</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Color Test</h2>
          <div className="flex gap-4">
            <div className="p-4 bg-blue-100 text-blue-800 rounded">Blue</div>
            <div className="p-4 bg-green-100 text-green-800 rounded">Green</div>
            <div className="p-4 bg-red-100 text-red-800 rounded">Red</div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Button Test</h2>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => alert('Button clicked!')}
          >
            Test Button
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-2">Debug Info</h2>
          <p>Check the browser console (F12) for Tailwind CSS debug information.</p>
        </div>
      </div>
    </div>
  );
}
