
import './index.css'

import Dashboard from './component/Dashboard/Dashboard';

function App() {
  return (
  
  <div className='flex h-screen'>
    
    

    <div className="flex-1 bg-gray-50 p-4">
     
      
      <h1 className="text-3xl font-bold text-center mb-6">Daily Task Manager App📝</h1>
    
      <Dashboard/>
      


      </div>
      
      
    </div>
  
  );
}

export default App;