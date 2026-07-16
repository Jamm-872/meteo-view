import { useLocationStore } from "../stores/useLocationStore";
import { useCurrentWeather } from "../features/current-weather/useCurrentWeather";
import { getWeatherInfo } from "../utils/weatherUtils";
import TempChart from "../features/current-weather/components/TempChart";
import { useNavigate } from "react-router-dom";
import { MapPinOff } from "lucide-react";

const DashboardPage = () => {
  const { lat, lon, cityName, isLocating } = useLocationStore();
  const { data, isLoading, isError } = useCurrentWeather(lat ?? 0, lon ?? 0);
  const navigate = useNavigate()

  if (isLocating)
    return <p className="text-gray-400">Detectando ubicación...</p>;
  if (!lat || !lon)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-gray-900 rounded-2xl p-10 flex flex-col items-center gap-4 max-w-sm text-center">
          <MapPinOff size={48} className="text-gray-600" />
          <div>
            <p className="text-white font-semibold text-lg">
              No se pudo detectar tu ubicación
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Selecciona una ciudad para consultar el clima
            </p>
          </div>
          <button
            onClick={() => navigate("/search")}
            className="mt-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-2 rounded-xl text-sm font-medium"
          >
            Ir a buscar
          </button>
        </div>
      </div>
    );
  if (isLoading) return <p className="text-gray-400">Cargando...</p>;
  if (isError || !data)
    return <p className="text-red-400">Error al cargar el clima</p>;

  const current = data.current;
  const { label, emoji } = getWeatherInfo(current.weather_code);

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-900 rounded-2xl p-6">
        <p className="text-gray-400 text-sm mb-1">{cityName}</p>
        <div className="flex items-center gap-4">
          <span className="text-6xl">{emoji}</span>
          <div>
            <p className="text-5xl font-bold">
              {Math.round(current.temperature_2m)}°C
            </p>
            <p className="text-gray-400 mt-1">
              {label} · Sensación {Math.round(current.apparent_temperature)}°C
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Humedad",
            value: `${current.relative_humidity_2m}%`,
            emoji: "💧",
          },
          {
            label: "Viento",
            value: `${current.wind_speed_10m} km/h`,
            emoji: "💨",
          },
          {
            label: "Índice UV",
            value: Math.round(current.uv_index),
            emoji: "🔆",
          },
          {
            label: "Prob. lluvia",
            value: `${current.precipitation_probability}%`,
            emoji: "🌧️",
          },
        ].map(({ label, value, emoji }) => (
          <div
            key={label}
            className="bg-gray-900 rounded-xl p-4 flex flex-col gap-1"
          >
            <span className="text-2xl">{emoji}</span>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <TempChart
        hourlyTemps={data.hourly.temperature_2m}
        hourlyTimes={data.hourly.time}
      />
    </div>
  );
};

export default DashboardPage;
