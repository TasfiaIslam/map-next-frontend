'use client';

import React, { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import Navbar from '@/components/navbar';
import MapArea from './map-area';
import MapPopover from '@/components/pop-over';
import { MapLocation } from './types';
import FilterPopup from '@/components/filter';

const MapWithSearchFilter = () => {
  const [open, setOpen] = useState(false);
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [maps, setMaps] = useState<MapLocation[]>([]);
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | undefined>();

  const [filters, setFilters] = useState<{
    marketStates?: string;
    unitType?: string;
  }>({});

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
      if (filters.marketStates && filters.marketStates.length) {
        console.log(filters, loc.marketStates);
        return filters.marketStates.includes(loc.marketStates.toString());
      }
      return loc.streetName && loc.streetName.toLowerCase().includes(lower);
    });
  }, [query, maps, filters]);

  console.log({ filteredLocations });

  // const filteredLocations = useMemo(() => {
  //   return maps.filter((loc) => {
  //     if (!filters.marketStates || filters.marketStates.length === 0) return true;
  //     return filters.marketStates.includes(loc.marketStates);
  //   });
  // }, [maps, filters]);

  const handleMarkerClick = (loc: MapLocation) => {
    setSelectedLocation(loc);
    setOpen(true);
  };

  return (
    <div className="relative">
      <Navbar query={query} setQuery={handleSearchChange} />
      <MapArea
        locations={maps}
        selectedLocation={selectedLocation}
        onMarkerClick={handleMarkerClick}
        appliedFilters={{
          marketStates: filters?.marketStates ? [filters?.marketStates] : [],
        }}
      />
      <div
        onClick={(e) => setOpenFilterPopup(true)}
        className="bg-white absolute right-4 top-16 z-30 rounded-md px-4 py-1 text-gray-600 text-sm cursor-pointer"
      >
        Filter
      </div>
      <MapPopover
        query={query}
        locations={filteredLocations}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedLocation(undefined);
            setQuery('');
          }
        }}
        selectedLocation={selectedLocation}
      />
      <div className="absolute top-4 right-4 z-20">
        <FilterPopup
          open={openFilterPopup}
          filters={filters}
          setFilters={setFilters}
          onOpenChange={(isOpen) => {
            setOpenFilterPopup(isOpen);
            // if (!isOpen) {
            //   setFilters({});
            // }
          }}
        />
      </div>
    </div>
  );
};

export default MapWithSearchFilter;
