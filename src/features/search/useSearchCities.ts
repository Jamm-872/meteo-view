import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchCities } from '../../services/weatherService'
import { useSettingsStore } from '../../stores/useSettingsStore'

export const useSearchCities = () => {
  const [query, setQuery] = useState('')
  const language = useSettingsStore((s) => s.language)

  const { data: results = [], isLoading } = useQuery({
    queryKey: ['cities', query],
    queryFn: () => searchCities(query, language),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  })

  return { query, setQuery, results, isLoading }
}