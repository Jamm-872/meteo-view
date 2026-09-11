import { useEffect } from "react";
import { useLocationStore } from "./stores/useLocationStore";
import { useSettingsStore } from "./stores/useSettingsStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ForecastPage from "./pages/ForecastPage/ForecastPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

function App() {
  const detectLocation = useLocationStore((s) => s.detectLocation);
  const isCurrentLocation = useLocationStore((s) => s.isCurrentLocation);
  const theme = useSettingsStore((s) => s.theme);
  const language = useSettingsStore((s) => s.language);
  const hasHydrated = useSettingsStore((s) => s.hasHydrated);

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isCurrentLocation) {
      detectLocation();
    }
  }, [language]);

  if (!hasHydrated) return null;

  return (
    <>
      <div className="app-background">
        <div className="skyLayer skyLight" />
        <div className="skyLayer skyDark" />
      </div>
      {hasHydrated && (
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/forecast" element={<ForecastPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
