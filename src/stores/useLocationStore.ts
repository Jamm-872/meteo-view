import { create } from "zustand";
import { useSettingsStore } from "./useSettingsStore";

interface LocationState {
  lat: number | null;
  lon: number | null;
  cityName: string;
  isCurrentLocation: boolean;
  isLocating: boolean;
  setLocation: (lat: number, lon: number, cityName: string) => void;
  detectLocation: () => void;
}
export const useLocationStore = create<LocationState>()((set) => ({
  lat: null,
  lon: null,
  cityName: "",
  isCurrentLocation: false,
  isLocating: true,
  setLocation: (lat, lon, cityName) =>
    set({ lat, lon, cityName, isCurrentLocation: false }),
  detectLocation: () => {
    set({ isLocating: true });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const language = useSettingsStore.getState().language;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=${language}`,
            {
              headers: {
                "User-Agent":
                  "meteo-view/1.0 (https://github.com/Jamm-872/meteo-view)",
              },
            },
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.municipality ||
            data.address?.town ||
            data.address?.village ||
            "";
          set({
            lat: latitude,
            lon: longitude,
            cityName: city,
            isCurrentLocation: true,
            isLocating: false,
          });
        } catch {
          set({
            lat: latitude,
            lon: longitude,
            cityName: "",
            isCurrentLocation: true,
            isLocating: false,
          });
        }
      },
      () => set({ lat: null, lon: null, cityName: "", isCurrentLocation: false, isLocating: false }),
      { timeout: 10000, maximumAge: 60000 }
    );
  },
}));
