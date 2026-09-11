import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Search,
  CloudSun,
  BarChart2,
  Star,
  Settings,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import styles from "./Layout.module.css";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
  { to: "/search", icon: Search, key: "search" as const },
  { to: "/forecast", icon: CloudSun, key: "forecast" as const },
  { to: "/statistics", icon: BarChart2, key: "statistics" as const },
  { to: "/favorites", icon: Star, key: "favorites" as const },
  { to: "/settings", icon: Settings, key: "settings" as const },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslation();

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>METEO-VIEW</h1>
        {navItems.map(({ to, icon: Icon, key }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
            }
          >
            <Icon size={18} />
            {t.nav[key]}
          </NavLink>
        ))}
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;