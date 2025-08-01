import { useState } from "react";
;
import type { EditProps } from "../../types";

import type { TaskStatus } from "../../types";

export default function EditTaskForm({ edit, onSubmit }: EditProps) {



  const [title, setTitle] = useState<string>(edit.title);
const [description, setDescription] = useState<string>(edit.description);
const [dueDate, setDueDate] = useState<string>(edit.dueDate);
  const [priority, setPriority] = useState<'low'|'medium'|'high'>(edit.priority);
  
  const [status, setStatus] = useState<TaskStatus>(edit.status);


const[error,setError]=useState<string>("")
  
 


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!title.trim()){ setError("Task title cannot be empty.")
        return
    } 
       
        
    onSubmit({ ...edit, title, description,dueDate,priority,status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded bg-white"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Update task description"
        className="w-full p-2 border rounded bg-white resize-none"
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
      
      

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
    </form>
  )};
