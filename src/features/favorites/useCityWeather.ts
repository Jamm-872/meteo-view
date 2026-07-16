import { useQuery } from '@tanstack/react-query'
import { getCityWeather } from '../../services/weatherService'

export const useCityWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['cityWeather', lat, lon],
    queryFn: () => getCityWeather(lat, lon),
    staleTime: 1000 * 60 * 10,
  })
}