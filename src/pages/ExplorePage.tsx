import { MapContainer } from '@/components/map/MapContainer';
import { siteConfig } from '@/config/site';

const ExplorePage = () => {
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-bold">Explore</h1>
        <p className="text-sm text-muted-foreground">
          {siteConfig.primaryCity.name} — pan around, pick a pin, find your next quest.
        </p>
      </div>
      <MapContainer
        className="h-full overflow-hidden rounded-2xl border"
        markers={[
          {
            id: 'old-town-square',
            position: { lat: 50.0875, lng: 14.4213 },
            popup: <strong>Old Town Square</strong>,
          },
          {
            id: 'letna-park',
            position: { lat: 50.0974, lng: 14.4178 },
            popup: <strong>Letná Park viewpoint</strong>,
          },
        ]}
      />
    </div>
  );
};

export default ExplorePage;
