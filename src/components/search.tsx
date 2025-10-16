'use client';

import { useMemo, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import debounce from 'lodash/debounce';

interface SearchProps {
  query?: string;
  setQuery: (q: string) => void;
  placeholder?: string;
  onChange?: (q: string) => void;
}

export default function Search({
  query,
  setQuery,
  placeholder = 'Search by street name',
}: SearchProps) {
  const [searchValue, setSearchValue] = useState(query);

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 300),
    [setQuery],
  );

  useEffect(() => {
    return () => debouncedSetQuery.cancel();
  }, [debouncedSetQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSetQuery(value);
  };

  return (
    <div className="w-full max-w-md relative text-black">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-8 py-2 text-lg rounded-lg border border-gray-400 focus:outline-none focus:ring-0"
      />
    </div>
  );
}
