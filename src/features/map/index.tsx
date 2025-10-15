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
import { MapProps } from './types';

const MapArea = ({ locations }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const features = locations.map((loc) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([loc.coordinatesLng, loc.coordinatesLat])),
        name: loc.name,
      });
      feature.setStyle(
        new Style({
          image: new Icon({
            src: '/marker.png',
            scale: 0.05,
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
        center: fromLonLat([locations[0]?.coordinatesLng || 0, locations[0]?.coordinatesLat || 0]),
        zoom: 12,
      }),
    });

    return () => map.setTarget(undefined);
  }, [locations]);

  return <div ref={mapRef} className="w-full h-screen" />;
};

export default MapArea;
