'use client';

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

interface FilterPopupProps {
  open: boolean;
  filters: { marketStates?: string; unitType?: string };
  setFilters: (filters: any) => void;
  onOpenChange: (open: boolean) => void;
}

export default function FilterPopup({ open, onOpenChange, filters, setFilters }: FilterPopupProps) {
  const [localFilters, setLocalFilters] = useState<any>({
    ...filters,
    marketStates: filters.marketStates || [],
  });

  const handleApply = () => {
    setFilters(localFilters);
    onOpenChange(false);
  };

  const handleReset = () => {
    setLocalFilters({ marketStates: [] });
    setFilters({ marketStates: [] });
  };

  const options = [
    { value: 'all', label: 'All', icon: '*' },
    { value: 'sold', label: 'Sold', icon: '🔴' },
    { value: 'pending', label: 'Pending', icon: '🟡' },
  ];

  const toggleOption = (value: string) => {
    setLocalFilters((prev: any) => {
      const ms = prev.marketStates || [];
      const updated = ms.includes(value) ? ms.filter((v: string) => v !== value) : [...ms, value];
      return { ...prev, marketStates: updated };
    });
  };

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Content
        side="top"
        align="start"
        sideOffset={8}
        className="absolute top-4 left-4 w-64 bg-white text-gray-800 border rounded-xl shadow-lg p-2 z-50"
        // className="bg-white text-gray-400 p-4 rounded-lg shadow-lg w-60"
      >
        <h3 className="font-semibold mb-2">Market States</h3>
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={`flex items-center gap-2 px-2 py-1 rounded transition-colors ${
                localFilters.marketStates?.includes(opt.value)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={handleReset} className="text-gray-500">
            Reset
          </button>
          <button onClick={handleApply} className="bg-blue-500 text-white px-3 py-1 rounded">
            Apply
          </button>
        </div>

        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Root>
  );
}
