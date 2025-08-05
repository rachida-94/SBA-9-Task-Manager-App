import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

import type { SearchProps } from '../../types';


export default function Search({ tasks, onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(value)||
    task.description.toLowerCase().includes(value)
    );

    onSearch(filtered);
  }

  return (
    <div className="search-container flex items-center gap-2 mb-4">
      <label htmlFor="search-input" className="sr-only">
        Search tasks
      </label>
      <BiSearch className="text-xl text-purple-600" />
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search tasks..."
        className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}