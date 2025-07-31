
import './index.css'
import TaskList from './component/TaskList/TaskList';
import Dashboard from './component/Dashboard/Dashboard';
import Search from './component/Search-bar/Search';

function App() {
  return (
  
  <div className='flex h-screen'>
    
    <Dashboard />

    <div className="flex-1 bg-gray-50 p-4">
      <div  ><Search/></div>
      
      <h1 className="text-3xl font-bold text-center mb-6">Daily Task Manager App📝</h1>
    
      <TaskList />
      


      </div>
      
      
    </div>
  
  );
}

export default App;