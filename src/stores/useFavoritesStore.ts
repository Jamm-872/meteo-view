import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "../types/weather";

interface FavoritesState {
  favorites: City[];
  addFavorite: (city: City) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (city) =>
        set((state) => {
          if (state.favorites.some((c) => c.id === city.id)) return state;
          return { favorites: [...state.favorites, city] };
        }),
        
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== id),
        })),

      isFavorite: (id) => get().favorites.some((c) => c.id === id),
    }),
    { name: "meteo-favorites" },
  ),
);
