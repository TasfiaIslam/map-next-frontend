'use client';
import React from 'react';
import Search from './search';

const Navbar = () => {
  return (
    <div className="bg-white px-3 py-2 flex">
      <Search
        onSearch={function (query: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default Navbar;
