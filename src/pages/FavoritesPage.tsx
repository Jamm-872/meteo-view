import { useFavoritesStore } from '../stores/useFavoritesStore'
import { useLocationStore } from '../stores/useLocationStore'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react'
import type { City } from '../types/weather'
import FavoriteCard from '../features/favorites/components/favoriteCard'

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavoritesStore()
  const { setLocation } = useLocationStore()
  const navigate = useNavigate()

  const handleSelect = (city: City) => {
    setLocation(city.latitude, city.longitude, `${city.name}, ${city.country}`)
    navigate('/dashboard')
  }

  if (favorites.length === 0) return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-gray-900 rounded-2xl p-10 flex flex-col items-center gap-4 max-w-sm text-center">
        <Star size={48} className="text-gray-600" />
        <div>
          <p className="text-white font-semibold text-lg">Sin favoritos aún</p>
          <p className="text-gray-400 text-sm mt-1">Busca una ciudad y márcala con ⭐ para agregarla aquí</p>
        </div>
        <button
          onClick={() => navigate('/search')}
          className="mt-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-6 py-2 rounded-xl text-sm font-medium"
        >
          Ir a buscar
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold">Favoritos</h2>
        <p className="text-gray-400 text-sm mt-1">{favorites.length} ciudad{favorites.length !== 1 ? 'es' : ''} guardada{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites.map((city: City) => (
          <FavoriteCard
            key={city.id}
            city={city}
            onSelect={handleSelect}
            onRemove={removeFavorite}
          />
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage