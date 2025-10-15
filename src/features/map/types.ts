export const MARKET_STATES = {
  SOLD: 'sold',
  PENDING: 'pending',
};

type marketStateType = 'sold' | 'pending';

export interface MapProps {
  locations: {
    streetId: string;
    name: string;
    coordinatesLng: number;
    coordinatesLat: number;
    marketStates: marketStateType[];
  }[];
}
