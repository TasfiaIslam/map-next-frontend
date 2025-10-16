export const MARKET_STATES = {
  SOLD: 'sold',
  PENDING: 'pending',
};

type marketStateType = 'sold' | 'pending';

export interface MapLocation {
  streetId: string;
  coordinatesLng: number;
  coordinatesLat: number;
  municipalityName: string;
  boroughName: string;
  subareaName: string;
  postalCode: string;
  streetName: string;
  streetNumber: string;
  streetLetter: string;
  slug: string;
  unitType: string;
  hasLiveSales: boolean;
  isLiveSalesApproved: boolean;
  adStates: marketStateType[];
  marketStates: marketStateType[];
}

export interface MapProps {
  locations: MapLocation[];
  selectedLocationId?: string;
}
