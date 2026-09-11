
export interface City {
  id: number
  name: string
  country: string
  admin1?: string
  latitude: number
  longitude: number
}
/*
export interface City {
  id: number
  name_es: string
  name_en: string
  admin1_es?: string
  admin1_en?: string
  country_es: string
  country_en: string
  latitude: number
  longitude: number
}
*/
export interface CurrentWeather {
  temperature_2m: number
  apparent_temperature: number
  relative_humidity_2m: number
  wind_speed_10m: number
  uv_index: number
  precipitation_probability: number
  weather_code: number
}

