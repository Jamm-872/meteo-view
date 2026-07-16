import { useEffect } from "react";
import { useLocationStore } from "./stores/useLocationStore";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import ForecastPage from "./pages/ForecastPage";
import StatisticsPage from "./pages/StatisticsPage";
import FavoritesPage from "./pages/FavoritesPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const detectLocation = useLocationStore((s) => s.detectLocation);

  useEffect(() => {
    detectLocation();
  }, []);
  return (
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
  );
}

export default App;
