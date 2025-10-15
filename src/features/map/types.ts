export interface MapProps {
  locations: {
    streetId: string;
    name: string;
    coordinatesLng: number;
    coordinatesLat: number;
  }[];
}
