import { useNavigate } from "react-router-dom";
import { CloudOff } from "lucide-react";
import { useLocationStore } from "../stores/useLocationStore";
import { useForecast } from "../features/forecast/useForecast";
import { getWeatherInfo } from "../utils/weatherUtils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const ForecastPage = () => {
  const { lat, lon, cityName, isLocating } = useLocationStore();
  const { data, isLoading, isError } = useForecast(lat ?? 0, lon ?? 0);
  const navigate = useNavigate();

  if (isLocating)
    return <p className="text-gray-400">Detectando ubicación...</p>;

  if (!lat || !lon)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-gray-900 rounded-2xl p-10 flex flex-col items-center gap-4 max-w-sm text-center">
          <CloudOff size={48} className="text-gray-600" />
          <div>
            <p className="text-white font-semibold text-lg">
              No se pudo detectar tu ubicación
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Selecciona una ciudad para consultar el pronóstico
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
    return <p className="text-red-400">Error al cargar el pronóstico</p>;

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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Pronóstico 7 días</h2>
      <p className="text-gray-400 text-sm">{cityName}</p>

      {/* Cabecera */}
      <div className="px-6 hidden md:grid grid-cols-[1.5fr_2.5rem_1fr_5rem_1fr] text-xs text-gray-500 uppercase tracking-wide">
        <span>Día</span>
        <span></span>
        <span>Estado</span>
        <span className="text-center">Máx / Mín</span>
        <span className="text-right">Lluvia · Viento · UV</span>
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
          const { label, emoji } = getWeatherInfo(day.code);
          const dayName = format(
            new Date(day.date + "T12:00:00"),
            "EEEE d MMM",
            { locale: es },
          );

          return (
            <div
              key={day.date}
              className="bg-gray-900 rounded-xl px-6 py-4 grid grid-cols-[1.5fr_2.5rem_1fr_5rem_1fr] items-center gap-4"
            >
              <p className="font-medium capitalize">{dayName}</p>
              <span className="text-2xl">{emoji}</span>
              <p className="text-gray-400 text-sm">{label}</p>
              <div className="flex items-center justify-center gap-1 text-sm">
                <span className="text-white font-semibold">{day.max}°</span>
                <span className="text-gray-600">/</span>
                <span className="text-gray-500">{day.min}°</span>
              </div>
              <div className="flex justify-end gap-4 text-sm text-gray-400">
                <span>🌧️ {day.rain}%</span>
                <span>💨 {day.wind} km/h</span>
                <span>🔆 UV {day.uv}</span>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ForecastPage;
