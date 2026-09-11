import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useSettingsStore } from '../../../../stores/useSettingsStore'
import styles from './TempChart.module.css'

interface Props {
  hourlyTemps: number[]
  hourlyTimes: string[]
  title: string 
}

const CHART_COLORS = {
  dark: {
    grid: '#1f2937',
    axisText: '#9ca3af',
    tooltipBg: '#111827',
    line: '#60a5fa',
  },
  light: {
    grid: '#e2e8f0',
    axisText: '#64748b',
    tooltipBg: '#ffffff',
    line: '#2563eb',
  },
}

const TempChart = ({ hourlyTemps, hourlyTimes, title }: Props) => {
  const theme = useSettingsStore((s) => s.theme)
  const colors = CHART_COLORS[theme]
  const now = new Date().getHours()

  const data = hourlyTemps.slice(now, now + 12).map((temp, i) => ({
    hour: `${(now + i) % 24}:00`,
    temp: Math.round(temp),
  }))

  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis dataKey="hour" tick={{ fill: colors.axisText, fontSize: 12 }} />
          <YAxis tick={{ fill: colors.axisText, fontSize: 12 }} unit="°" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.tooltipBg, border: 'none', borderRadius: '8px' }}
            labelStyle={{ color: colors.axisText }}
            itemStyle={{ color: colors.line }}
          />
          <Line type="monotone" dataKey="temp" stroke={colors.line} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TempChart