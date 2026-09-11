import { useQuery } from '@tanstack/react-query'
import { getHistoricalWeather } from '../../services/weatherService'
import { useSettingsStore } from '../../stores/useSettingsStore'

export const useHistoricalWeather = (
  lat: number | null,
  lon: number | null,
  pastDays: number
) => {
  const tempUnit = useSettingsStore((s) => s.tempUnit)
  const speedUnit = useSettingsStore((s) => s.speedUnit)

  return useQuery({
    queryKey: ['historicalWeather', lat, lon, pastDays, tempUnit, speedUnit],
    queryFn: () => getHistoricalWeather(lat!, lon!, pastDays, tempUnit, speedUnit),
    enabled: lat !== null && lon !== null,
    staleTime: 1000 * 60 * 30,
  })
}