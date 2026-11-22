import Counter from './components/Counter';
import OdooTodoList from './components/OdooTodoList';
import Header from './components/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            Interactive Web App
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Built with Next.js, Odoo Backend & Google Authentication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Counter />
          <div className="col-span-1 md:col-span-2">
            <OdooTodoList />
          </div>
        </div>

        <div className="mt-12 p-6 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ✨ Features
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-3">
              <span className="text-2xl">🔐</span>
              <span>Google OAuth authentication for secure access</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <span>Odoo integration for task management and business logic</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <span>Real-time sync with Odoo backend</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <span>Beautiful Tailwind CSS design with dark mode</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📱</span>
              <span>Fully responsive and mobile-friendly</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🚀</span>
              <span>Ready to deploy on Vercel</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 p-6 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">⚙️ Setup Required</h3>
          <ol className="text-yellow-800 dark:text-yellow-300 text-sm space-y-1 list-decimal list-inside">
            <li>Copy <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">.env.local.example</code> to <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">.env.local</code></li>
            <li>Add your Google OAuth credentials from <a href="https://console.cloud.google.com" target="_blank" rel="noopener" className="underline font-semibold">Google Cloud Console</a></li>
            <li>Add your Odoo instance details (URL, database, username, password)</li>
            <li>Restart the development server</li>
          </ol>
        </div>
      </main>
    </div>
  );
}
