'use client';
import React from 'react';
import Search from './search';

interface NavbarProps {
  query?: string;
  setQuery: (q: string) => void;
}

const Navbar = ({ query, setQuery }: NavbarProps) => {
  return (
    <div className="bg-white px-3 py-2 flex relative">
      <Search query={query} setQuery={setQuery} />
    </div>
  );
};

export default Navbar;
