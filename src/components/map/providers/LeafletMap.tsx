import { useEffect } from 'react';
import { MapContainer as LeafletContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type MapContainerProps } from '@/components/map/MapContainer';
import { createQuestPinIcon } from '@/components/map/MapPin';

const ensureDefaultIconConfigured = () => {
  Reflect.deleteProperty(L.Icon.Default.prototype, '_getIconUrl');
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
};

export const LeafletMap = ({
  center,
  zoom = 13,
  markers = [],
  onMarkerClick,
}: MapContainerProps) => {
  useEffect(() => {
    ensureDefaultIconConfigured();
  }, []);

  const safeCenter = center ?? { lat: 50.0875, lng: 14.4213 };

  return (
    <LeafletContainer
      center={[safeCenter.lat, safeCenter.lng]}
      zoom={zoom}
      scrollWheelZoom
      className="sq-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker) => {
        const icon = marker.category
          ? createQuestPinIcon({ category: marker.category, emphasized: marker.emphasized })
          : undefined;
        return (
          <Marker
            key={marker.id}
            position={[marker.position.lat, marker.position.lng]}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick?.(marker.id),
            }}
          >
            {marker.popup && <Popup>{marker.popup}</Popup>}
          </Marker>
        );
      })}
    </LeafletContainer>
  );
};
