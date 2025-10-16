'use client';

import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import Navbar from '@/components/navbar';
import MapArea from './map-area';
import { getMaps } from '@/lib/getMapData';
import MapPopover from '@/components/pop-over';
import { MapLocation } from './types';

const MapWithSearchFilter = () => {
  const [open, setOpen] = useState(false);
  const [maps, setMaps] = useState<MapLocation[]>([]);
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();

  useEffect(() => {
    async function fetchMaps() {
      const res = await fetch('/api/maps');
      const data = await res.json();
      console.log({ data });
      setMaps(
        data.map((item: any) => ({
          streetId: item.streetId,
          streetName: item.streetName,
          streetNumber: item.streetNumber,
          coordinatesLat: item.coordinatesLat,
          coordinatesLng: item.coordinatesLng,
          municipalityName: item.municipalityName,
          boroughName: item.boroughName,
          subareaName: item.subareaName,
          postalCode: item.postalCode,
          marketStates: item.marketStates,
        })),
      );
    }

    fetchMaps();
  }, []);

  const handleSearchChange = useMemo(
    () =>
      debounce((q: string) => {
        setQuery(q);
        setOpen(q.length > 0);
      }, 300),
    [],
  );

  const filteredLocations = useMemo(() => {
    const lower = query.toLowerCase();
    return maps.filter((loc) => {
      return loc.streetName && loc.streetName.toLowerCase().includes(lower);
    });
  }, [query, maps]);

  const handleSelect = (locId: string) => {
    setSelectedLocation(locId);
    setQuery('');
  };

  return (
    <div className="relative">
      <Navbar query={query} setQuery={handleSearchChange} />
      <MapArea locations={maps} selectedLocationId={selectedLocation} />
      {query && (
        <div className="absolute top-20 left-4 z-50 pointer-events-auto">
          <MapPopover
            query={query}
            locations={filteredLocations}
            open={open}
            onOpenChange={setOpen}
            // onSelect={(loc) => handleSelect(loc.streetId)}
          />
        </div>
      )}
    </div>
  );
};

export default MapWithSearchFilter;
