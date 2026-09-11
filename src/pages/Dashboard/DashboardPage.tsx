import { useLocationStore } from "../../stores/useLocationStore";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useTranslation } from "../../hooks/useTranslation";
import { useCurrentWeather } from "../../features/current-weather/useCurrentWeather";
import { getWeatherInfo } from "../../utils/weatherUtils";
import TempChart from "../../features/current-weather/components/TempChart/TempChart";
import { useNavigate } from "react-router-dom";
import { MapPinOff } from "lucide-react";
import Loader from "../../components/Loader/Loader";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { lat, lon, cityName, isCurrentLocation, isLocating } =
    useLocationStore();
  const { data, isLoading, isError } = useCurrentWeather(lat ?? 0, lon ?? 0);
  const tempUnit = useSettingsStore((s) => s.tempUnit);
  const unitSymbol = tempUnit === "celsius" ? "°C" : "°F";
  const speedUnit = useSettingsStore((s) => s.speedUnit);
  const speedLabel = speedUnit === "kmh" ? "km/h" : "mph";
  const t = useTranslation();
  const navigate = useNavigate();

  if (isLocating) return <Loader text={t.dashboard.detecting} />;

  if (!lat || !lon)
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyCard}>
          <MapPinOff size={48} style={{ color: "var(--text-secondary)" }} />
          <div>
            <p className={styles.emptyTitle}>
              {t.dashboard.locationErrorTitle}
            </p>
            <p className={styles.emptyText}>{t.dashboard.locationErrorText}</p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className={styles.emptyButton}
          >
            {t.dashboard.goSearch}
          </button>
        </div>
      </div>
    );

  if (isLoading) return <Loader text={t.dashboard.loading} />;
  if (isError || !data)
    return <p className={styles.errorText}>{t.dashboard.weatherError}</p>;

  const current = data.current;
  const { key, emoji } = getWeatherInfo(current.weather_code);

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <p className={styles.cityName}>
          {isCurrentLocation
            ? `📍 ${t.dashboard.currentLocation} - ${cityName}`
            : cityName}
        </p>
        <div className={styles.weatherRow}>
          <span className={styles.emoji}>{emoji}</span>
          <div>
            <p className={styles.tempValue}>
              {Math.round(current.temperature_2m)}
              {unitSymbol}
            </p>
            <p className={styles.description}>
              {t.weather[key]} · {t.dashboard.feelsLike}{" "}
              {Math.round(current.apparent_temperature)}
              {unitSymbol}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {[
          {
            label: t.dashboard.humidity,
            value: `${current.relative_humidity_2m}%`,
            emoji: "💧",
          },
          {
            label: t.dashboard.wind,
            value: `${current.wind_speed_10m} ${speedLabel}`,
            emoji: "💨",
          },
          {
            label: t.dashboard.uvIndex,
            value: Math.round(current.uv_index),
            emoji: "🔆",
          },
          {
            label: t.dashboard.rainProb,
            value: `${current.precipitation_probability}%`,
            emoji: "🌧️",
          },
        ].map(({ label, value, emoji }) => (
          <div key={label} className={styles.metricCard}>
            <span className={styles.metricEmoji}>{emoji}</span>
            <p className={styles.metricLabel}>{label}</p>
            <p className={styles.metricValue}>{value}</p>
          </div>
        ))}
      </div>

      <TempChart
        hourlyTemps={data.hourly.temperature_2m}
        hourlyTimes={data.hourly.time}
        title={t.dashboard.tempChartTitle}
      />
    </div>
  );
};

export default DashboardPage;
