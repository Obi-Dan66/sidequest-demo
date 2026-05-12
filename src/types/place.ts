export interface GeoPoint {
  lat: number;
  lng: number;
}

export type PlaceCategory =
  | 'landmark'
  | 'cafe'
  | 'viewpoint'
  | 'museum'
  | 'park'
  | 'hidden_gem'
  | 'street_art';

export interface Place {
  id: string;
  name: string;
  description?: string;
  category: PlaceCategory;
  location: GeoPoint;
  coverImageUrl?: string;
  rating?: number;
  visitedByUser?: boolean;
}
