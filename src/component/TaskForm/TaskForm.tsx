import { useState } from 'react';
import type { Task } from '../../types';

type EditTaskFormProps = {
  edit: Task;
  onSubmit: (task: Task) => void;
};

export default function EditTaskForm({ edit, onSubmit }: EditTaskFormProps) {
  const [title, setTitle] = useState(edit.title);
  const [description, setDescription] = useState(edit.description);
  const [dueDate, setDueDate] = useState(edit.dueDate);
  const [priority, setPriority] = useState(edit.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!title.trim()) {
      alert('Task title is required.');
      return;
    }
    if (!description.trim()) {
      alert('Task description is required.');
      return;
    }
    if (!dueDate) {
      alert('Please choose a due date.');
      return;
    }

    
    const updatedTask: Task = {
      ...edit,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority,
    };

    onSubmit(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold text-center">Edit Task</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Task title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Task description"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
        className="w-full p-2 border rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Save Changes
      </button>
    </form>
  );
}