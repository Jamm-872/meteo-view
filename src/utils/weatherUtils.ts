export const getWeatherInfo = (code: number): { label: string; emoji: string } => {
  if (code === 0) return { label: 'Despejado', emoji: '☀️' }
  if (code <= 2) return { label: 'Parcialmente nublado', emoji: '⛅' }
  if (code === 3) return { label: 'Nublado', emoji: '☁️' }
  if (code <= 49) return { label: 'Niebla', emoji: '🌫️' }
  if (code <= 59) return { label: 'Llovizna', emoji: '🌦️' }
  if (code <= 69) return { label: 'Lluvia', emoji: '🌧️' }
  if (code <= 79) return { label: 'Nieve', emoji: '❄️' }
  if (code <= 84) return { label: 'Chubascos', emoji: '🌨️' }
  if (code <= 99) return { label: 'Tormenta', emoji: '⛈️' }
  return { label: 'Desconocido', emoji: '🌡️' }
}

