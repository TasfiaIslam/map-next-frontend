'use client';

import { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash/debounce';

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function Search({ onSearch, placeholder = 'Search...' }: SearchProps) {
  const [query, setQuery] = useState('');

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 400),
    [onSearch, 400],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full max-w-md relative text-black">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-8 py-2 text-lg rounded-lg border border-gray-400 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
