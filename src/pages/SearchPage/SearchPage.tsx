import { useSearchCities } from "../../features/search/useSearchCities";
import { useFavoritesStore } from "../../stores/useFavoritesStore";
import { useLocationStore } from "../../stores/useLocationStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { Star } from "lucide-react";
import Loader from "../../components/Loader/Loader";
import type { City } from "../../types/weather";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  const { query, setQuery, results, isLoading } = useSearchCities();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { setLocation } = useLocationStore();
  const t = useTranslation();
  const navigate = useNavigate();

  const handleSelectCity = (city: City) => {
    setLocation(city.latitude, city.longitude, `${city.name}, ${city.country}`);
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t.search.title}</h2>

      <input
        type="text"
        placeholder={t.search.placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {isLoading && <Loader text={t.search.searching} />}

      <div className={styles.resultsList}>
        {results.map((city: City) => (
          <div
            key={city.id}
            className={styles.resultItem}
            onClick={() => handleSelectCity(city)}
          >
            <div>
              <p className={styles.cityName}>{city.name}</p>
              <p className={styles.cityDetail}>
                {city.admin1 && `${city.admin1}, `}
                {city.country}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                isFavorite(city.id)
                  ? removeFavorite(city.id)
                  : addFavorite(city);
              }}
              className={styles.starButton}
              aria-label={isFavorite(city.id) ? t.search.removeFavorite : t.search.addFavorite}
            >
              <Star
                size={20}
                fill={isFavorite(city.id) ? "#facc15" : "none"}
                stroke={isFavorite(city.id) ? "#facc15" : "currentColor"}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;