import { Star } from "lucide-react";
import { useCityWeather } from "../useCityWeather";
import { getWeatherInfo } from "../../../utils/weatherUtils";
import type { City } from "../../../types/weather";

interface Props {
  city: City;
  onSelect: (city: City) => void;
  onRemove: (id: number) => void;
}

const FavoriteCard = ({ city, onSelect, onRemove }: Props) => {
  const { data, isLoading, isError } = useCityWeather(
    city.latitude,
    city.longitude,
  );

  const current = data?.current;
  const { emoji, label } = current
    ? getWeatherInfo(current.weather_code)
    : { emoji: "🌡️", label: "" };

  return (
    <div className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-5 relative hover:bg-gray-800 transition-colors">
      {/* Clima arriba */}
      {isLoading && <p className="text-gray-500 text-sm">Cargando...</p>}
      {isError && <p className="text-red-400 text-sm">Sin datos</p>}
      {current && (
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{emoji}</span>
            <div>
              <p className="text-3xl font-bold">
                {Math.round(current.temperature_2m)}°C
              </p>
              <p className="text-gray-500 text-xs">{label}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Sensación</p>
            <p className="text-white font-semibold">
              {Math.round(current.apparent_temperature)}°C
            </p>
          </div>
        </div>
      )}

      {/* Estrella */}
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-4 right-4 text-yellow-400 hover:text-gray-500 transition-colors"
      >
        <Star size={18} fill="#facc15" stroke="#facc15" />
      </button>

      {/* Nombre ciudad abajo */}
      <div>
        <p className="text-xl font-bold text-white">{city.name}</p>
        <p className="text-gray-500 text-sm">
          {city.admin1 && `${city.admin1}, `}
          {city.country}
        </p>
      </div>

      {/* Botón */}
      <button
        onClick={() => onSelect(city)}
        className="bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm py-2 rounded-xl font-medium"
      >
        Ver ciudad
      </button>
    </div>
  );
};

export default FavoriteCard;
