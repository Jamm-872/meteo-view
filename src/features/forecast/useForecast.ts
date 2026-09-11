import { useQuery } from '@tanstack/react-query'
import { getForecast } from '../../services/weatherService'
import { useSettingsStore } from '../../stores/useSettingsStore'

export const useForecast = (lat: number, lon: number) => {
  const tempUnit = useSettingsStore((s) => s.tempUnit)
  const speedUnit = useSettingsStore((s) => s.speedUnit)

  return useQuery({
    queryKey: ['forecast', lat, lon, tempUnit, speedUnit],
    queryFn: () => getForecast(lat, lon, tempUnit, speedUnit),
    staleTime: 1000 * 60 * 30,
  })
}