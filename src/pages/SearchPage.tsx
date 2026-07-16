import { useSearchCities } from "../features/search/useSearchCities";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import { useLocationStore } from '../stores/useLocationStore'
import { useNavigate } from 'react-router-dom'
import { Star } from "lucide-react";
import type { City } from '../types/weather'

const SearchPage = () => {
  const { query, setQuery, results, isLoading } = useSearchCities();
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const { setLocation } = useLocationStore()
  const navigate = useNavigate()

  const handleSelectCity = (city: City) => {
    setLocation(city.latitude, city.longitude, `${city.name}, ${city.country}`)
    navigate('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Buscar ciudad</h2>

      <input
        type="text"
        placeholder="Escribe una ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 text-lg outline-none focus:border-blue-500 transition-colors"
      />

      {isLoading && <p className="text-gray-400">Buscando...</p>}

      <div className="flex flex-col gap-3">
        {results.map((city: City) => (
          <div
            key={city.id}
            className="bg-gray-900 rounded-xl px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={() => handleSelectCity(city)}
          >
            <div>
              <p className="font-medium">{city.name}</p>
              <p className="text-gray-400 text-sm">{city.admin1 && `${city.admin1}, `}{city.country}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                isFavorite(city.id) ? removeFavorite(city.id) : addFavorite(city)
              }}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Star
                size={20}
                fill={isFavorite(city.id) ? '#facc15' : 'none'}
                stroke={isFavorite(city.id) ? '#facc15' : 'currentColor'}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
};

export default SearchPage;
