'use client';

import * as Popover from '@radix-ui/react-popover';
import { useMemo } from 'react';
import { MapLocation } from '@/features/map/types';

interface PropoverProps {
  query: string;
  locations: MapLocation[];
  open: boolean;
  selectedLocation?: MapLocation | null;
  onOpenChange: (open: boolean) => void;
}

const MapPopover = ({ query, locations, selectedLocation, open, onOpenChange }: PropoverProps) => {
  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return locations.filter((loc) => loc.municipalityName.toLowerCase().includes(lower));
  }, [locations, query]);

  if (!query && !selectedLocation) return null;

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Content
        side="top"
        align="start"
        sideOffset={8}
        className="absolute top-4 right-4 w-64 bg-white text-gray-800 border rounded-xl shadow-lg p-2 z-50"
      >
        {selectedLocation ? (
          <div className="max-h-60 overflow-y-auto">
            <p>{`${selectedLocation?.streetNumber} - ${selectedLocation?.streetName} , ${selectedLocation?.postalCode} , ${selectedLocation?.municipalityName} `}</p>
          </div>
        ) : (
          <ul className="max-h-60 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((loc, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                  // onClick={() => onSelect(loc.locations)}
                >
                  <>
                    <p>{`${loc.streetNumber} - ${loc.streetName} , ${loc.postalCode} , ${loc.municipalityName} `}</p>
                    <p>{loc.marketStates}</p>
                  </>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm px-2 py-2">No results</p>
            )}
          </ul>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default MapPopover;
