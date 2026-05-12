import { lazy, Suspense, type ReactNode } from 'react';
import { env } from '@/config/env';
import { type GeoPoint } from '@/types/place';
import { Skeleton } from '@/components/ui/skeleton';

const LeafletMap = lazy(() =>
  import('@/components/map/providers/LeafletMap').then((m) => ({ default: m.LeafletMap })),
);

export interface MapMarker {
  id: string;
  position: GeoPoint;
  label?: string;
  popup?: ReactNode;
}

export interface MapContainerProps {
  center?: GeoPoint;
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  onMarkerClick?: (markerId: string) => void;
}

/**
 * Provider-agnostic map shell. Today it uses Leaflet; swap to Mapbox by
 * adding a `MapboxMap` component under `providers/` and switching by
 * `env.map.provider`.
 */
export const MapContainer = ({
  center = { lat: env.map.defaultLat, lng: env.map.defaultLng },
  zoom = env.map.defaultZoom,
  markers = [],
  className,
  onMarkerClick,
}: MapContainerProps) => {
  return (
    <div className={className}>
      <Suspense fallback={<Skeleton className="h-full w-full rounded-2xl" />}>
        <LeafletMap center={center} zoom={zoom} markers={markers} onMarkerClick={onMarkerClick} />
      </Suspense>
    </div>
  );
};
