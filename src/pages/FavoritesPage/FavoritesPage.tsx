import { useFavoritesStore } from "../../stores/useFavoritesStore";
import { useLocationStore } from "../../stores/useLocationStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";
import { Star } from "lucide-react";
import type { City } from "../../types/weather";
import FavoriteCard from "../../features/favorites/components/FavoriteCard/FavoriteCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavoritesStore();
  const { setLocation } = useLocationStore();
  const t = useTranslation();
  const navigate = useNavigate();

  const handleSelect = (city: City) => {
    setLocation(city.latitude, city.longitude, `${city.name}, ${city.country}`);
    navigate("/dashboard");
  };

  if (favorites.length === 0)
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyCard}>
          <Star size={48} style={{ color: "var(--text-secondary)" }} />
          <div>
            <p className={styles.emptyTitle}>{t.favorites.emptyTitle}</p>
            <p className={styles.emptyText}>{t.favorites.emptyText}</p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className={styles.emptyButton}
          >
            {t.favorites.goSearch}
          </button>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>{t.favorites.title}</h2>
        <p className={styles.subtitle}>
          {favorites.length}{" "}
          {favorites.length !== 1
            ? t.favorites.cityPlural
            : t.favorites.citySingular}
        </p>
      </div>

      <div className={styles.grid}>
        {favorites.map((city: City, index: number) => (
          <FavoriteCard
            key={city.id}
            city={city}
            index={index}
            onSelect={handleSelect}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
