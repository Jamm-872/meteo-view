import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useTranslation } from '../../hooks/useTranslation'
import { useHistoricalWeather } from '../../features/statistics/useHistoricalWeather'
import CitySelector from '../../features/statistics/components/CitySelector/CitySelector'
import Loader from '../../components/Loader/Loader'
import type { City } from '../../types/weather'
import styles from './StatisticsPage.module.css'

const CHART_COLORS = {
  dark: { grid: '#1f2937', axisText: '#9ca3af', tooltipBg: '#111827', lineA: '#60a5fa', lineB: '#f472b6' },
  light: { grid: '#e2e8f0', axisText: '#64748b', tooltipBg: '#ffffff', lineA: '#2563eb', lineB: '#db2777' },
}

interface ChartConfig {
  key: 'temperature' | 'humidity' | 'wind' | 'pressure'
  field: 'temperature_2m' | 'relative_humidity_2m' | 'wind_speed_10m' | 'surface_pressure'
  unit: string
}

const StatisticsPage = () => {
  const [cityA, setCityA] = useState<City | null>(null)
  const [cityB, setCityB] = useState<City | null>(null)
  const [pastDays, setPastDays] = useState(7)
  const theme = useSettingsStore((s) => s.theme)
  const tempUnit = useSettingsStore((s) => s.tempUnit)
  const speedUnit = useSettingsStore((s) => s.speedUnit)
  const colors = CHART_COLORS[theme]
  const t = useTranslation()

  const unitSymbol = tempUnit === 'celsius' ? '°C' : '°F'
  const speedLabel = speedUnit === 'kmh' ? 'km/h' : 'mph'

  const weatherA = useHistoricalWeather(cityA?.latitude ?? null, cityA?.longitude ?? null, pastDays)
  const weatherB = useHistoricalWeather(cityB?.latitude ?? null, cityB?.longitude ?? null, pastDays)

  const isLoading = weatherA.isLoading || weatherB.isLoading
  const isError = weatherA.isError || weatherB.isError

  const buildChartData = (field: ChartConfig['field']) =>
    weatherA.data?.hourly.time.map((time: string, i: number) => ({
      time: time.slice(5, 16).replace('T', ' '),
      ...(cityA && weatherA.data ? { [cityA.name]: Math.round(weatherA.data.hourly[field][i]) } : {}),
      ...(cityB && weatherB.data ? { [cityB.name]: Math.round(weatherB.data.hourly[field][i]) } : {}),
    })) ?? []

  const charts: ChartConfig[] = [
    { key: 'temperature', field: 'temperature_2m', unit: unitSymbol },
    { key: 'humidity', field: 'relative_humidity_2m', unit: '%' },
    { key: 'wind', field: 'wind_speed_10m', unit: ` ${speedLabel}` },
    { key: 'pressure', field: 'surface_pressure', unit: ' hPa' },
  ]

  const daysLabel =
    pastDays === 1 ? t.statistics.daySingular : t.statistics.dayPlural.replace('{n}', String(pastDays))

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>{t.statistics.title}</h2>
        <p className={styles.subtitle}>{t.statistics.subtitle}</p>
      </div>

      <div className={styles.controls}>
        <CitySelector
          label={t.statistics.cityA}
          selectedCity={cityA}
          onSelect={setCityA}
          placeholder={t.statistics.searchPlaceholder}
        />
        <CitySelector
          label={t.statistics.cityBOptional}
          selectedCity={cityB}
          onSelect={setCityB}
          placeholder={t.statistics.searchPlaceholder}
        />
        <div className={styles.daysSelector}>
          <p className={styles.label}>{daysLabel}</p>
          <input
            type="range"
            min={1}
            max={7}
            value={pastDays}
            onChange={(e) => setPastDays(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {!cityA && !cityB && (
        <div className={styles.promptCard}>
          <p className={styles.promptText}>{t.statistics.selectCityPrompt}</p>
        </div>
      )}

      {(cityA || cityB) && isLoading && <Loader text={t.statistics.loading} />}

      {(cityA || cityB) && isError && (
        <div className={styles.promptCard}>
          <p className={styles.errorText}>{t.statistics.error}</p>
        </div>
      )}

      {(cityA || cityB) && !isLoading && !isError &&
        charts.map(({ key, field, unit }) => {
          const chartData = buildChartData(field)
          if (chartData.length === 0) return null

          return (
            <div key={key} className={styles.chartCard}>
              <p className={styles.chartTitle}>{t.statistics[key]}</p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                  <XAxis dataKey="time" tick={{ fill: colors.axisText, fontSize: 11 }} />
                  <YAxis tick={{ fill: colors.axisText, fontSize: 12 }} unit={unit} />
                  <Tooltip contentStyle={{ backgroundColor: colors.tooltipBg, border: 'none', borderRadius: '8px' }} />
                  <Legend />
                  {cityA && (
                    <Line type="monotone" dataKey={cityA.name} stroke={colors.lineA} strokeWidth={2} dot={false} />
                  )}
                  {cityB && (
                    <Line type="monotone" dataKey={cityB.name} stroke={colors.lineB} strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )
        })}
    </div>
  )
}

export default StatisticsPage