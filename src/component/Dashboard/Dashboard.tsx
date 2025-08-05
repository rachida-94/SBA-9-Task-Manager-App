import React, { useState } from 'react';
import { BiCategory, BiHome, BiTask } from 'react-icons/bi';
import TaskList from '../TaskList/TaskList';
import Search from '../Search-bar/Search';
import EditTaskForm from '../TaskForm/TaskForm';
import type { Task, TaskStatus } from '../../types';

export default function Dashboard() {
 
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  });
  
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('tasks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load tasks:', error);
      return [];
    }
  });
  const [edit, setEdit] = useState<Task | null>(null);

  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    status: 'pending' as   TaskStatus
  });

  
  const saveTasksToStorage = (updatedTasks: Task[]) => {
    try {
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Failed to save tasks:', error);
    }
  };

  
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      alert('Task title cannot be empty.');
      return;
    }

    const task: Task = {
      id: Date.now(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: newTask.status
    };

    const updated = [task, ...tasks];
    setTasks(updated);
    setFilteredTasks(updated);
    saveTasksToStorage(updated);
    
    
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status:'pending'
    });

    
    handleFilterChange(updated);
  };

  
  const updateStatus = (id: number, newStatus: TaskStatus) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
    setFilteredTasks(updated);
    saveTasksToStorage(updated);
  };

  const handleDelete = (id: number) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
    setFilteredTasks(filtered);
    saveTasksToStorage(filtered);
  };

  const updateTask = (updatedTask: Task) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    setFilteredTasks(updated);
    saveTasksToStorage(updated);
    setEdit(null);
  };

  const handleFilterChange = (tasksToFilter = tasks) => {
    const filtered = tasksToFilter.filter((task) => {
      const statusMatch = !status || task.status === status;
      const priorityMatch = !priority || task.priority === priority;
      return statusMatch && priorityMatch;
    });
    setFilteredTasks(filtered);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div className="menu bg-white w-64 h-screen shadow-md flex flex-col justify-start p-4">
        <div className="menu-list mt-10 flex flex-col gap-3">
          <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors">
            <BiHome />
            Dashboard
          </a>
          
          <div className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors">
            <BiCategory />
            <select 
              className="bg-transparent border-none focus:outline-none"
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value as typeof priority);
                handleFilterChange();
              }}
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
         
          
          <div className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 rounded-md transition-colors">
            <BiTask/>
            <select 
              className="bg-transparent border-none focus:outline-none"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as TaskStatus | '');
                handleFilterChange();
              }}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          
        </div>
      </div>

      
      <div className="flex-1 p-8 overflow-auto">
        {edit ? (
          <EditTaskForm edit={edit} onSubmit={updateTask} />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">Task Manager</h1>
            
            
            <Search tasks={tasks} onSearch={setFilteredTasks} />
            <form onSubmit={addTask} className=" space-y-4 bg-gray-900 p-6 rounded shadow mb-6">
              <h2 className="text-white font-bold text-center">What's the plan for today</h2>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                placeholder="Task title"
                className=" border-gray-600 bg-gray-800 text-white w-full p-2 border rounded mb-2focus:outline-none focus:ring-2 focus:ring-bleu-500
                placeholder-gray-400"
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                placeholder="Description"
                className="w-full p-2 border border-gray-600 rounded focus:outline-none text-white focus:ring-blue-500 bg-gray-800 placeholder-gray-400"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white
        focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value as 'low' | 'medium' | 'high'})}
                className={`w-full p-2 rounded bg-gray-800 border border-gray-600
          text-white hover:bg-green-300 hover:text-black `}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              
            
              
      <select
        value={newTask.status || 'pending'}
        onChange={(e) => setNewTask({...newTask, status: e.target.value as any})}
        className={`w-full p-2 rounded bg-gray-800 border border-gray-600
            text-white hover:bg-yellow-200 hover:text-black `}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </form>

            
            <TaskList 
              tasks={filteredTasks}
              onStatusChange={updateStatus}
              onDelete={handleDelete}
              onEdit={setEdit}
            />
          </>
        )}
      </div>
    </div>
  );
}