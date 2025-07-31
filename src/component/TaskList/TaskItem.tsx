import React, { useState } from 'react';
import type { JSX } from 'react';
import type { Task, TaskStatus } from '../../types';

interface Props {
  onSubmit: (task: Task) => void;
}

export default function TaskItem({ onSubmit }: Props): JSX.Element {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [status, setStatus] = useState<TaskStatus>('pending');

  const handeleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      dueDate,
      priority,
      status,
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setStatus('pending');
  };

  return (
    <form className="space-y-4 bg-gray-900 p-6 rounded-lg shadow-md text-white" onSubmit={handeleAdd}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-bleu-500
         bg-gray-800 placeholder-gray-400"
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring-blue-500 bg-gray-800 placeholder-gray-400"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white
        focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-600
          text-white hover:bg-green-300 hover:text-black `}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>3

        <option value="high">High</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-600
          text-white hover:bg-yellow-200 hover:text-black `}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit" className="w-full bg-blue-600 hover:bg-bleu-800 text-white
      font-semibold py-2 px-4 rounded border border-blue-700">Add Task</button>
    </form>
  );
}