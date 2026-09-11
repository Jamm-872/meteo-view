import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../../services/weatherService";
import { useSettingsStore } from "../../stores/useSettingsStore";

export const useCurrentWeather = (lat: number, lon: number) => {
  const tempUnit = useSettingsStore((s) => s.tempUnit);
  const speedUnit = useSettingsStore((s) => s.speedUnit);

  return useQuery({
    queryKey: ["currentWeather", lat, lon, tempUnit, speedUnit],
    queryFn: () => getCurrentWeather(lat, lon, tempUnit, speedUnit),
    staleTime: 1000 * 60 * 10,
  });
};