import { useQuery } from '@tanstack/react-query'
import { getCityWeather } from '../../services/weatherService'
import { useSettingsStore } from '../../stores/useSettingsStore'

export const useCityWeather = (lat: number, lon: number, enabled: boolean = true) => {
  const tempUnit = useSettingsStore((s) => s.tempUnit)

  return useQuery({
    queryKey: ['cityWeather', lat, lon, tempUnit],
    queryFn: () => getCityWeather(lat, lon, tempUnit),
    staleTime: 1000 * 60 * 10,
    enabled, // nuevo
  })
}