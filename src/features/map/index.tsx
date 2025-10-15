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
import { MapProps, MARKET_STATES } from './types';

const MapArea = ({ locations }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const features = locations.map((loc, index) => {
      console.log('loc---->', locations);
      let iconSrc = '/images/pending-marker.svg';
      if (loc.marketStates[0] === MARKET_STATES.SOLD) {
        iconSrc = '/images/sold-marker.svg';
      } else if (loc.marketStates[0] === MARKET_STATES.PENDING) {
        iconSrc = '/images/sold-marker.svg';
      }

      const feature = new Feature({
        geometry: new Point(fromLonLat([loc.coordinatesLng, loc.coordinatesLat])),
        name: loc.name,
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

    const map = new OlMap({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([locations[6]?.coordinatesLng || 0, locations[6]?.coordinatesLat || 0]),
        zoom: 12,
      }),
    });

    return () => map.setTarget(undefined);
  }, [locations]);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapArea;
