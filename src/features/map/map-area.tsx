'use client';

import { useEffect, useRef } from 'react';
import OlMap from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { MapLocation, MapProps, MARKET_STATES } from './types';
import { Overlay } from 'ol';

const MapArea = ({ appliedFilters, locations, onMarkerClick }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  console.log({ appliedFilters });

  function getIcon(marketState: string) {
    // if (loc.marketStates[0] === MARKET_STATES.SOLD) {
    //   iconSrc = '/images/sold-marker.svg';
    // } else if (loc.marketStates[0] === MARKET_STATES.PENDING) {
    //   iconSrc = '/images/pending-marker.svg';
    // }
    let iconSrc = '/images/pending-marker.svg';
    if (marketState === MARKET_STATES.SOLD) {
      iconSrc = '/images/sold-marker.svg';
    } else if (marketState === MARKET_STATES.PENDING) {
      iconSrc = '/images/pending-marker.svg';
    }

    return iconSrc;
  }

  useEffect(() => {
    if (!mapRef.current) return;

    const features = locations.map((loc, index) => {
      let iconSrc = '/images/pending-marker.svg';
      if (appliedFilters?.marketStates && appliedFilters?.marketStates?.length === 1) {
        iconSrc = getIcon(appliedFilters?.marketStates[0]);
      } else {
        iconSrc = getIcon(loc.marketStates[0]);
      }

      const feature = new Feature({
        geometry: new Point(fromLonLat([loc.coordinatesLng, loc.coordinatesLat])),
        name: loc.streetName,
        marketState: appliedFilters?.marketStates ?? loc.marketStates,
      });

      feature.setStyle(
        new Style({
          image: new Icon({
            src: iconSrc,
            scale: 0.3,
          }),
        }),
      );
      return feature;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features,
      }),
    });

    const overlay = new Overlay({
      element: popupRef.current!,
      autoPan: { animation: { duration: 250 } },
    });

    const map = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([locations[6]?.coordinatesLng || 0, locations[6]?.coordinatesLat || 0]),
        zoom: 12,
      }),
    });

    map.on('singleclick', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f) as Feature | undefined;
      if (feature) {
        const data = feature.get('data') as MapLocation;
        onMarkerClick(data);
      }
    });

    return () => map.setTarget(undefined);
  }, [locations, appliedFilters]);

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-screen" />
      <div
        ref={popupRef}
        className="absolute bg-white rounded-lg shadow-lg border border-gray-300"
        style={{ minWidth: 200 }}
      ></div>
    </div>
  );
};

export default MapArea;
