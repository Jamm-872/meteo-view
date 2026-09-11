export type WeatherKey =
  | 'clear'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'showers'
  | 'storm'
  | 'unknown'

export const getWeatherInfo = (code: number): { key: WeatherKey; emoji: string } => {
  if (code === 0) return { key: 'clear', emoji: '☀️' }
  if (code <= 2) return { key: 'partlyCloudy', emoji: '⛅' }
  if (code === 3) return { key: 'cloudy', emoji: '☁️' }
  if (code <= 49) return { key: 'fog', emoji: '🌫️' }
  if (code <= 59) return { key: 'drizzle', emoji: '🌦️' }
  if (code <= 69) return { key: 'rain', emoji: '🌧️' }
  if (code <= 79) return { key: 'snow', emoji: '❄️' }
  if (code <= 84) return { key: 'showers', emoji: '🌨️' }
  if (code <= 99) return { key: 'storm', emoji: '⛈️' }
  return { key: 'unknown', emoji: '🌡️' }
}