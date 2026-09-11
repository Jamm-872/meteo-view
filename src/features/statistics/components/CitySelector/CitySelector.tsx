import { useSearchCities } from '../../../search/useSearchCities'
import type { City } from '../../../../types/weather'
import styles from './CitySelector.module.css'

interface Props {
  label: string
  selectedCity: City | null
  onSelect: (city: City) => void
  placeholder: string
}

const CitySelector = ({ label, selectedCity, onSelect, placeholder }: Props) => {
  const { query, setQuery, results, isLoading } = useSearchCities()

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>
      {selectedCity ? (
        <div className={styles.selectedChip} onClick={() => onSelect(null as unknown as City)}>
          <span>{selectedCity.name}</span>
          <span className={styles.clearIcon}>✕</span>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          {isLoading && <p className={styles.loadingText}>...</p>}
          {results.length > 0 && (
            <div className={styles.dropdown}>
              {results.map((city: City) => (
                <div
                  key={city.id}
                  className={styles.option}
                  onClick={() => onSelect(city)}
                >
                  <span className={styles.optionName}>{city.name}</span>
                  <span className={styles.optionDetail}>
                    {city.admin1 && `${city.admin1}, `}
                    {city.country}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CitySelector