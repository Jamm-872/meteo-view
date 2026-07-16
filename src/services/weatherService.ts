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

export const searchCities = async (query: string) => {
  const data = await fetchJson(
    `${GEO_URL}/search?name=${encodeURIComponent(query)}&count=5&language=es&format=json`
  )
  return data.results ?? []
}

export const getCurrentWeather = async (lat: number, lon: number) => {
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
    forecast_days: '1',
    timezone: 'auto',
  })

  return fetchJson(`${FORECAST_URL}/forecast?${params}`)
}


export const getForecast = async (lat: number, lon: number) => {
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
  })

  const res = await fetch(`${FORECAST_URL}/forecast?${params}`)
  return res.json()
}

export const getCityWeather = async (lat: number, lon: number) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: 'temperature_2m,apparent_temperature,weather_code',
    timezone: 'auto',
  })
  const res = await fetch(`${FORECAST_URL}/forecast?${params}`)
  return res.json()
}