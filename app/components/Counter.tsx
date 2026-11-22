'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Interactive Counter
      </h2>
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">
          {count}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setCount(count - 1)}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition"
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition"
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
