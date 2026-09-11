import { GEO_URL, FORECAST_URL } from '../constants/api'

// Helper centralizado (hace el fetch, valida la respuesta y parsea el JSON)
const fetchJson = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Error en la API (${res.status}): ${res.statusText}`)
  }

  const data = await res.json()

  if (data.error) {
    throw new Error(data.reason ?? 'Error desconocido de Open-Meteo')
  }

  return data
}

export const searchCities = async (query: string, language: 'es' | 'en' = 'es') => {
  const data = await fetchJson(
    `${GEO_URL}/search?name=${encodeURIComponent(query)}&count=5&language=${language}&format=json`
  )
  return data.results ?? []
}

export const searchCityBilingual = async (query: string, lat: number, lon: number) => {
  const [esResults, enResults] = await Promise.all([
    fetchJson(`${GEO_URL}/search?name=${encodeURIComponent(query)}&count=5&language=es&format=json`),
    fetchJson(`${GEO_URL}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`),
  ])

  // Encontramos el resultado que coincide por coordenadas (mismo lugar, texto distinto)
  const esMatch = esResults.results?.find((r: any) => r.latitude === lat && r.longitude === lon)
  const enMatch = enResults.results?.find((r: any) => r.latitude === lat && r.longitude === lon)

  return { esMatch, enMatch }
}

export const getCurrentWeather = async (
  lat: number,
  lon: number,
  tempUnit: 'celsius' | 'fahrenheit' = 'celsius',
  windUnit: 'kmh' | 'mph' = 'kmh'
) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'wind_speed_10m',
      'uv_index',
      'precipitation_probability',
      'weather_code',
    ].join(','),
    hourly: 'temperature_2m',
    forecast_days: '2',
    timezone: 'auto',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
  })

  return fetchJson(`${FORECAST_URL}/forecast?${params}`)
}


export const getForecast = async (
  lat: number,
  lon: number,
  tempUnit: 'celsius' | 'fahrenheit' = 'celsius',
  windUnit: 'kmh' | 'mph' = 'kmh'
) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: [
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
      'weather_code',
    ].join(','),
    forecast_days: '7',
    timezone: 'auto',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
  })

  return fetchJson(`${FORECAST_URL}/forecast?${params}`)
}

export const getCityWeather = async (
  lat: number,
  lon: number,
  tempUnit: 'celsius' | 'fahrenheit' = 'celsius'
) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,apparent_temperature,weather_code',
    timezone: 'auto',
    temperature_unit: tempUnit,
  })

  return fetchJson(`${FORECAST_URL}/forecast?${params}`)
}

export const getHistoricalWeather = async (
  lat: number,
  lon: number,
  pastDays: number,
  tempUnit: 'celsius' | 'fahrenheit' = 'celsius',
  windUnit: 'kmh' | 'mph' = 'kmh'
) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'wind_speed_10m',
      'surface_pressure',
    ].join(','),
    past_days: String(pastDays),
    forecast_days: '1',
    timezone: 'auto',
    temperature_unit: tempUnit,
    wind_speed_unit: windUnit,
  })

  return fetchJson(`${FORECAST_URL}/forecast?${params}`)
}