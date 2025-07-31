import type { TaskFilterProps, TaskStatus } from '../../types';

export default function TaskFilter({ onFilterChange }: TaskFilterProps) {
  return (
    <div className="flex gap-4 mb-4">
      <select  className="px-3 py-2 border-2 bg-pink-300 hover:border-gray-500" onChange={(e) => onFilterChange({ status: e.target.value as TaskStatus })}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select  className="px-3 py-2 border-2 bg-pink-300 hover:border-gray-500"
        onChange={(e) =>
          onFilterChange({ priority: e.target.value as 'low' | 'medium' | 'high' })
        }
      >
        <option value="">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}