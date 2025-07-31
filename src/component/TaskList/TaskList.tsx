import { useState } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from '../TaskFilter/TaskFilter';
import type { Task, TaskStatus } from '../../types';
import type { JSX } from 'react/jsx-runtime';
import EditTaskForm from '../TaskForm/TaskForm';

export default function TaskList(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }>({});

  const addTask = (task: Task): void => {
    if (!task.title || /^\s*$/.test(task.title)) return;
    setTasks((prev) => [task, ...prev]);
  };
  

  const updateStatus = (id: number, newStatus: Task['status']): void => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDelete = (id: number): void => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };

  const handleFilterChange = (newFilters: typeof filters): void => {
    setFilters(newFilters);
  };

  const [edit, setEdit] = useState<Task | null>(null);
;
const updateTask = (updated:Task):void => {
  const updatedTasks = tasks.map((task) =>
    task.id === updated.id ? updated : task
  );
  setTasks(updatedTasks);
  setEdit(null);
;
};
if (edit) {
  return (
    <EditTaskForm
      edit={edit}
      onSubmit={(val) => {
         updateTask(val);
      }}
    />
  );
}



  const filteredTasks = tasks.filter((task) => {
    const statusMatch = !filters.status || task.status === filters.status;
    const priorityMatch = !filters.priority || task.priority === filters.priority;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">What's the plan for today?</h1>

      <TaskItem onSubmit={addTask} />
      <TaskFilter onFilterChange={handleFilterChange} />

      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded shadow-sm border ${
              task.status === 'completed'
                ? 'bg-green-100 border-green-300'
                : task.status === 'in-progress'
                ? 'bg-yellow-100 border-yellow-300'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>

            <button
            onClick={() => setEdit(task)}
             className="text-sm text-blue-500 hover:underline"
>
           Edit
           </button>
            <p className="text-sm text-gray-700 mb-1">{task.description}</p>
            <p className="text-xs text-gray-500 mb-1">Due: {task.dueDate}</p>
            <p className="text-xs mb-2">
              <span
                className={`font-semibold ${
                  task.priority === 'high'
                    ? 'text-red-600'
                    : task.priority === 'medium'
                    ? 'text-orange-500'
                    : 'text-green-600'
                }`}
              >
                
                Priority:
              </span>{' '}
              {task.priority}
            </p>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value as Task['status'])
                }
                className="p-2 border rounded text-sm bg-white hover:bg-gray-100 focus:outline-none focus:ring-2"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}