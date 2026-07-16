import { useQuery } from '@tanstack/react-query'
import { getForecast } from '../../services/weatherService'

export const useForecast = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['forecast', lat, lon],
    queryFn: () => getForecast(lat, lon),
    staleTime: 1000 * 60 * 30,
  })
}