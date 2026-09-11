import { useSettingsStore } from '../stores/useSettingsStore'
import { translations } from '../i18n/translations'

export const useTranslation = () => {
  const language = useSettingsStore((s) => s.language)
  return translations[language]
}