import React from 'react'
import {BiCategory, BiHelpCircle, BiHome, BiSolidReport,BiTask} from 'react-icons/bi'

export default function Dashboard() {
  return (
    <div className="menu bg-white w-64 h-screen shadow-md  flex flex-col justify-start p-4">
      
        <div className="menu-list mt-10 flex flex-col gap-3">
            <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2
             rounded-md transition-colors">
                <BiHome />
            Dashboard
            </a>
            <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2
             rounded-md transition-colors">
                 <BiCategory />
            
             <select name="" id="">
              <option value="">Categorie</option>
              <option value="">Work</option>
              <option value="">Studies</option>
              <option value="">Home needs</option>
              <option value="">Hobbies</option>
             </select>
            </a> 
            <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2
             rounded-md transition-colors">
                 <BiSolidReport/>
             Report
           </a>
           
           <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2
            rounded-md transition-colors">
                 <BiTask/>
             
             <select name="" >
              <option value="">All tasks</option>
              <option value="">Completed</option>
              <option value="">pending</option>
              <option value="">In progress</option>
             </select>
           </a>
           <a href="#" className="item flex items-center gap-2 text-gray-700 hover:bg-blue-100 px-3 py-2 
           rounded-md transition-colors">
                 <BiHelpCircle/>
             Help
           </a>
            
        </div>
    </div>
  )
}
