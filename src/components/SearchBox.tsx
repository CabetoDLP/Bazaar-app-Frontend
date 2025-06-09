import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
  <div className="flex justify-center">
    <form 
      onSubmit={handleSearch} 
      className="flex items-center space-x-2 max-w-md w-full"
    >
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <button 
        type="submit" 
        className="px-6 py-2 bg-indigo-600 rounded-md shadow-md hover:shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 whitespace-nowrap"
      >
        Buscar
      </button>
    </form>
  </div>
);
};

export default SearchBox;