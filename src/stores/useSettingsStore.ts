import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark'
  tempUnit: 'celsius' | 'fahrenheit'
  speedUnit: 'kmh' | 'mph'
  language: 'es' | 'en'
  setTheme: (theme: 'light' | 'dark') => void
  setTempUnit: (unit: 'celsius' | 'fahrenheit') => void
  setSpeedUnit: (unit: 'kmh' | 'mph') => void
  setLanguage: (lang: 'es' | 'en') => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'dark',
      tempUnit: 'celsius',
      speedUnit: 'kmh',
      language: 'es',
      setTheme: (theme) => set({ theme }),
      setTempUnit: (tempUnit) => set({ tempUnit }),
      setSpeedUnit: (speedUnit) => set({ speedUnit }),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'meteo-settings' }
  )
)