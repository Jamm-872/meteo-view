import { useQuery } from '@tanstack/react-query'
import { getCurrentWeather } from '../../services/weatherService'

export const useCurrentWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['currentWeather', lat, lon],
    queryFn: () => getCurrentWeather(lat, lon),
    staleTime: 1000 * 60 * 10, // 10 minutos
  })
}