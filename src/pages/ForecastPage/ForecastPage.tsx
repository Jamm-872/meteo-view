import { useNavigate } from "react-router-dom";
import { CloudOff } from "lucide-react";
import { useLocationStore } from "../../stores/useLocationStore";
import { useSettingsStore } from "../../stores/useSettingsStore";
import { useTranslation } from "../../hooks/useTranslation";
import { useForecast } from "../../features/forecast/useForecast";
import { getWeatherInfo } from "../../utils/weatherUtils";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import Loader from "../../components/Loader/Loader";
import styles from "./ForecastPage.module.css";

const dateLocales = { es, en: enUS };

const ForecastPage = () => {
  const { lat, lon, cityName, isLocating } = useLocationStore();
  const { data, isLoading, isError } = useForecast(lat ?? 0, lon ?? 0);
  const tempUnit = useSettingsStore((s) => s.tempUnit);
  const unitSymbol = tempUnit === "celsius" ? "°C" : "°F";
  const speedUnit = useSettingsStore((s) => s.speedUnit);
  const speedLabel = speedUnit === "kmh" ? "km/h" : "mph";
  const language = useSettingsStore((s) => s.language);
  const t = useTranslation();
  const navigate = useNavigate();

  if (isLocating) return <Loader text={t.forecast.detecting} />;

  if (!lat || !lon)
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyCard}>
          <CloudOff size={48} style={{ color: "var(--text-secondary)" }} />
          <div>
            <p className={styles.emptyTitle}>{t.forecast.locationErrorTitle}</p>
            <p className={styles.emptyText}>{t.forecast.locationErrorText}</p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className={styles.emptyButton}
          >
            {t.forecast.goSearch}
          </button>
        </div>
      </div>
    );

  if (isLoading) return <Loader text={t.forecast.loading} />;
  if (isError || !data)
    return <p className={styles.errorText}>{t.forecast.forecastError}</p>;

  const days = data.daily.time.map((date: string, i: number) => ({
    date,
    max: Math.round(data.daily.temperature_2m_max[i]),
    min: Math.round(data.daily.temperature_2m_min[i]),
    rain: data.daily.precipitation_probability_max[i],
    wind: data.daily.wind_speed_10m_max[i],
    uv: Math.round(data.daily.uv_index_max[i]),
    code: data.daily.weather_code[i],
  }));

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.forecast.title}</h2>
      <p className={styles.cityName}>{cityName}</p>

      <div className={styles.headerRow}>
        <span>{t.forecast.day}</span>
        <span></span>
        <span>{t.forecast.status}</span>
        <span className={styles.headerCenter}>{t.forecast.maxMin}</span>
        <span className={styles.headerRight}>{t.forecast.rainWindUv}</span>
      </div>

      {days.map(
        (day: {
          date: string;
          max: number;
          min: number;
          rain: number;
          wind: number;
          uv: number;
          code: number;
        }) => {
          const { key, emoji } = getWeatherInfo(day.code);
          const dayName = format(new Date(day.date + "T12:00:00"), "EEEE d MMM", {
            locale: dateLocales[language],
          });

          return (
            <div key={day.date} className={styles.dayCard}>
              <p className={styles.dayName}>{dayName}</p>
              <span className={styles.dayEmoji}>{emoji}</span>
              <p className={styles.dayLabel}>{t.weather[key]}</p>
              <div className={styles.tempRange}>
                <span className={styles.tempMax}>
                  {day.max}
                  {unitSymbol}
                </span>
                <span className={styles.tempSeparator}>/</span>
                <span className={styles.tempMin}>
                  {day.min}
                  {unitSymbol}
                </span>
              </div>
              <div className={styles.detailsRow}>
                <span>🌧️ {day.rain}%</span>
                <span>
                  💨 {day.wind} {speedLabel}
                </span>
                <span>🔆 UV {day.uv}</span>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default ForecastPage;