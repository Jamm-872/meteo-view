import { create } from "zustand";

interface LocationState {
  lat: number | null;
  lon: number | null;
  cityName: string;
  isLocating: boolean;
  setLocation: (lat: number, lon: number, cityName: string) => void;
  detectLocation: () => void;
}

export const useLocationStore = create<LocationState>()((set) => ({
  lat: null,
  lon: null,
  cityName: "",
  isLocating: true,
  setLocation: (lat, lon, cityName) => set({ lat, lon, cityName }),
  detectLocation: () => {
    set({ isLocating: true });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=es`,
            { headers: { "User-Agent": "meteo-view (tu-contacto)" } },
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.municipality ||
            data.address?.town ||
            data.address?.village ||
            "Mi ubicación";
          set({
            lat: latitude,
            lon: longitude,
            cityName: `📍 Ubicación actual - ${city}`,
            isLocating: false,
          });
        } catch {
          // Si falla Nominatim, igual usamos las coordenadas (el clima no depende del nombre)
          set({
            lat: latitude,
            lon: longitude,
            cityName: "📍 Ubicación actual",
            isLocating: false,
          });
        }
      },
      () => {
        set({ lat: null, lon: null, cityName: "", isLocating: false });
      },
      { timeout: 10000, maximumAge: 60000 },
    );
  },
}));
