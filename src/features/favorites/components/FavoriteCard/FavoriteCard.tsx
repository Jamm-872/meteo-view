import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useSettingsStore } from "../../../../stores/useSettingsStore";
import { useTranslation } from "../../../../hooks/useTranslation";
import { useCityWeather } from "../../useCityWeather";
import { getWeatherInfo } from "../../../../utils/weatherUtils";
import type { City } from "../../../../types/weather";
import styles from "./FavoriteCard.module.css";

interface Props {
  city: City;
  index: number;
  onSelect: (city: City) => void;
  onRemove: (id: number) => void;
}

const FavoriteCard = ({ city, index, onSelect, onRemove }: Props) => {
  const [canFetch, setCanFetch] = useState(index === 0); 

  useEffect(() => {
    if (index === 0) return;
    const timer = setTimeout(() => setCanFetch(true), index * 600); // 600ms entre cada uno
    return () => clearTimeout(timer);
  }, [index]);

  const { data, isLoading, isError } = useCityWeather(
    city.latitude,
    city.longitude,
    canFetch 
  );
  const tempUnit = useSettingsStore((s) => s.tempUnit);
  const unitSymbol = tempUnit === "celsius" ? "°C" : "°F";
  const t = useTranslation();

  const current = data?.current;
  const { emoji, key } = current
    ? getWeatherInfo(current.weather_code)
    : { emoji: "🌡️", key: null };

  return (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.cityName}>{city.name}</p>
          <p className={styles.cityDetail}>
            {city.admin1 && `${city.admin1}, `}
            {city.country}
          </p>
        </div>
        <button
          onClick={() => onRemove(city.id)}
          className={styles.starButton}
          aria-label={t.favorites.removeFavorite}
        >
          <Star size={18} fill="#facc15" stroke="#facc15" />
        </button>
      </div>

      {isLoading && <p className={styles.loadingText}>{t.favorites.loading}</p>}
      {isError && <p className={styles.errorText}>{t.favorites.noData}</p>}
      {current && key && (
        <div className={styles.weatherRow}>
          <div className={styles.weatherLeft}>
            <span className={styles.emoji}>{emoji}</span>
            <div>
              <p className={styles.tempValue}>
                {Math.round(current.temperature_2m)}
                {unitSymbol}
              </p>
              <p className={styles.tempLabel}>{t.weather[key]}</p>
            </div>
          </div>
          <div>
            <p className={styles.feelsLikeLabel}>{t.favorites.feelsLike}</p>
            <p className={styles.feelsLikeValue}>
              {Math.round(current.apparent_temperature)}
              {unitSymbol}
            </p>
          </div>
        </div>
      )}

      <button onClick={() => onSelect(city)} className={styles.selectButton}>
        {t.favorites.viewCity}
      </button>
    </div>
  );
};

export default FavoriteCard;
