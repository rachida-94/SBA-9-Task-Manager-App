
import type { Task, TaskStatus } from '../../types';

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {

  
  return (

    
    <div className={`p-4 rounded shadow-sm border ${
              task.status === 'completed'
                ? 'bg-green-100 border-green-300'
                : task.status === 'in-progress'
                ? 'bg-yellow-100 border-yellow-300'
                : 'bg-gray-100 border-gray-300'
            }`}>
      
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{task.title}</h2>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
          </div>
          <p className="text-sm text-gray-700 mb-1">{task.description}</p>
          <p className="text-xs text-gray-500 mb-1">Due: {task.dueDate}</p>
          <div className="text-xs mb-2">
            
            <span className={`font-semibold ${
                  task.priority === 'high'
                    ? 'text-red-600'
                    : task.priority === 'medium'
                    ? 'text-orange-500'
                    : 'text-green-600'
                }`}>
               priority:
            </span>{' '}
              {task.priority}
          </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task)}
            className="text-blue-500 hover:text-blue-700"
          >
            Edit
          </button>
          
        </div>
      
      <div className="mt-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="p-2 border rounded text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
