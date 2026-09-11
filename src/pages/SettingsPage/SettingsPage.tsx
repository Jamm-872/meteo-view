import { useSettingsStore } from "../../stores/useSettingsStore";
import { useTranslation } from "../../hooks/useTranslation";
import { Sun, Moon, Thermometer, Wind, Languages } from "lucide-react";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const {
    theme,
    tempUnit,
    speedUnit,
    language,
    setTheme,
    setTempUnit,
    setSpeedUnit,
    setLanguage,
  } = useSettingsStore();
  const t = useTranslation();

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>{t.settings.title}</h2>
        <p className={styles.subtitle}>{t.settings.subtitle}</p>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.labelGroup}>
          {theme === "dark" ? (
            <Moon size={22} className="text-blue-400" />
          ) : (
            <Sun size={22} className="text-yellow-400" />
          )}
          <div>
            <p className={styles.settingTitle}>{t.settings.themeTitle}</p>
            <p className={styles.settingDescription}>{t.settings.themeDescription}</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div
            className={`${styles.toggleIndicator} ${theme === "dark" ? styles.toggleIndicatorRight : ""}`}
          />
          <button
            onClick={() => setTheme("light")}
            className={`${styles.toggleButton} ${theme === "light" ? styles.toggleButtonActive : ""}`}
          >
            {t.settings.light}
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`${styles.toggleButton} ${theme === "dark" ? styles.toggleButtonActive : ""}`}
          >
            {t.settings.dark}
          </button>
        </div>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.labelGroup}>
          <Thermometer size={22} className="text-red-400" />
          <div>
            <p className={styles.settingTitle}>{t.settings.tempTitle}</p>
            <p className={styles.settingDescription}>{t.settings.unitDescription}</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div
            className={`${styles.toggleIndicator} ${tempUnit === "fahrenheit" ? styles.toggleIndicatorRight : ""}`}
          />
          <button
            onClick={() => setTempUnit("celsius")}
            className={`${styles.toggleButton} ${tempUnit === "celsius" ? styles.toggleButtonActive : ""}`}
          >
            °C
          </button>
          <button
            onClick={() => setTempUnit("fahrenheit")}
            className={`${styles.toggleButton} ${tempUnit === "fahrenheit" ? styles.toggleButtonActive : ""}`}
          >
            °F
          </button>
        </div>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.labelGroup}>
          <Wind size={22} className="text-cyan-400" />
          <div>
            <p className={styles.settingTitle}>{t.settings.windTitle}</p>
            <p className={styles.settingDescription}>{t.settings.unitDescription}</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div
            className={`${styles.toggleIndicator} ${speedUnit === "mph" ? styles.toggleIndicatorRight : ""}`}
          />
          <button
            onClick={() => setSpeedUnit("kmh")}
            className={`${styles.toggleButton} ${speedUnit === "kmh" ? styles.toggleButtonActive : ""}`}
          >
            km/h
          </button>
          <button
            onClick={() => setSpeedUnit("mph")}
            className={`${styles.toggleButton} ${speedUnit === "mph" ? styles.toggleButtonActive : ""}`}
          >
            mph
          </button>
        </div>
      </div>

      <div className={styles.settingCard}>
        <div className={styles.labelGroup}>
          <Languages size={22} className="text-green-400" />
          <div>
            <p className={styles.settingTitle}>{t.settings.languageTitle}</p>
            <p className={styles.settingDescription}>{t.settings.languageDescription}</p>
          </div>
        </div>
        <div className={styles.toggleGroup}>
          <div
            className={`${styles.toggleIndicator} ${language === "en" ? styles.toggleIndicatorRight : ""}`}
          />
          <button
            onClick={() => setLanguage("es")}
            className={`${styles.toggleButton} ${language === "es" ? styles.toggleButtonActive : ""}`}
          >
            Español
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`${styles.toggleButton} ${language === "en" ? styles.toggleButtonActive : ""}`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;