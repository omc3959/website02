'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/',
      });

      if (result?.ok) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Welcome
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Sign in to manage your tasks with Odoo integration
        </p>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-6 py-3 font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032 c0-3.331,2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.461,2.268,15.365,1.5,12.545,1.5 c-6.062,0-11,4.938-11,11s4.938,11,11,11c5.699,0,10.479-4.144,10.88-9.643h-10.08V10.239z" />
          </svg>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Demo credentials:</strong>
            <br />
            Make sure to configure your Google OAuth and Odoo credentials in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env.local</code>
          </p>
        </div>
      </div>
    </div>
  );
}
