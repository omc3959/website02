'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface OdooTask {
  id: number;
  name: string;
  description?: string;
  state?: string;
}

export default function OdooTodoList() {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState<OdooTask[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTasks();
    }
  }, [status]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/tasks');

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: input.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      setTasks([...tasks, data.task]);
      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskState = async (task: OdooTask) => {
    const newState = task.state === 'done' ? 'todo' : 'done';
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setTasks(tasks.map(t =>
        t.id === task.id ? { ...t, state: newState } : t
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error updating task:', err);
    }
  };

  if (status === 'loading') {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-6 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
        <p className="text-yellow-800 dark:text-yellow-200">
          Please sign in to view and manage your Odoo tasks
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Odoo Tasks
        </h2>
        {loading && <Loader size={20} className="animate-spin text-blue-500" />}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Add a new task to Odoo..."
          disabled={loading}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={addTask}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white rounded-lg font-medium transition flex items-center gap-2"
        >
          <Plus size={18} />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No tasks yet. Add one to get started!
          </p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <input
                type="checkbox"
                checked={task.state === 'done'}
                onChange={() => toggleTaskState(task)}
                className="w-5 h-5 cursor-pointer"
              />
              <span
                className={`flex-1 ${
                  task.state === 'done'
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                {task.name}
              </span>
              {task.state && (
                <span className={`text-xs px-2 py-1 rounded ${
                  task.state === 'done'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
                }`}>
                  {task.state}
                </span>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                disabled={loading}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition disabled:opacity-50"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>Synced with Odoo:</strong> Your tasks are stored in your Odoo instance
        </p>
      </div>
    </div>
  );
}
