import React from 'react'

import { BiNotification, BiSearch } from 'react-icons/bi'

import type{ SearchProps } from '../../types'

import { useState } from 'react'



export default function Search({tasks,onSearch}:SearchProps) {
const [searchTerm,setSearchTerm]=useState('')

function handleSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
  if(e.key =="Enter"){
    const inputValue=(e.target as HTMLInputElement).value
    const filtered=tasks.filter((task)=>
    task.title.toLowerCase().includes(inputValue.toLowerCase()))
  onSearch(filtered)
  }
}

  return (
    <div className='flex flex-col gap-4 p-4 bg-purple-300 rounded-lg shadow-md'>
        <h1 className='text-2xl font-bold text-white'>Dashboard</h1>
        <div className="flex items-center justify-between">
            <div className='flex items-center gap-2 bg-purple-200 px-3 py-2 rounded-md w-full max-w-md'>
                <input type="text"
                value={searchTerm}
                onChange={e =>setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                   placeholder='Search anything here...'
                 
                className='bg-white text-black placeholder-dark-500 focus:outline-none w-full max-w-mf'/>
                <BiSearch className='text-white text-xl'
               />
                
            </div>
            <div className='ml-4 text-white hover:text-blue-500 cursor-pointer'>
                <BiNotification className='text-2xl'/>
            </div>
        </div>
    </div>
  )
}
