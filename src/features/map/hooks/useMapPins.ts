import { useQuery } from '@tanstack/react-query';
import { mapApi, type MapPinsQuery } from '@/features/map/api/map.api';
import { queryKeys } from '@/lib/queryClient';
import { type MapPinDto } from '@/types/dto';
import { type ApiError } from '@/services/api/errors';

export const useMapPins = (query: MapPinsQuery = {}) =>
  useQuery<MapPinDto[], ApiError>({
    queryKey: queryKeys.map.pins(query),
    queryFn: () => mapApi.getPins(query),
  });
