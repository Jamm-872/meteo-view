import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface Props {
  hourlyTemps: number[]
  hourlyTimes: string[]
}

const TempChart = ({ hourlyTemps, hourlyTimes }: Props) => {
  const now = new Date().getHours()

  const data = hourlyTemps.slice(now, now + 12).map((temp, i) => ({
    hour: `${(now + i) % 24}:00`,
    temp: Math.round(temp),
  }))

  return (
    <div className="bg-gray-900 rounded-2xl p-6">
      <p className="text-gray-400 text-sm mb-4">Temperatura — próximas 12 horas</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="hour" tick={{ fill: '#9ca3af', fontSize: 12 }} />
          <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} unit="°" />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: '#9ca3af' }}
            itemStyle={{ color: '#60a5fa' }}
          />
          <Line type="monotone" dataKey="temp" stroke="#60a5fa" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TempChart