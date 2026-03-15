import { useTranslation } from 'react-i18next'
import { Search, Filter, Moon, Sun, Globe2, BarChart3, X } from 'lucide-react'
import useStore from '../../store/useStore'
import './Header.css'

export default function Header({ onToggleFilter, onToggleStats }) {
  const { t } = useTranslation()
  const { theme, toggleTheme, locale, toggleLocale, filters, setFilter } = useStore()

  const handleClearSearch = () => {
    setFilter('search', '')
  }

  return (
    <header className="header glass">
      <div className="header-left">
        <div className="header-logo" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
          <Globe2 size={22} className="logo-icon" />
          <h1 className="header-title">歷地社地</h1>
        </div>
      </div>

      <div className="header-center">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t('header.search')}
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
          {filters.search && (
            <button className="search-clear-btn" onClick={handleClearSearch}>
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn" onClick={onToggleStats} title={t('stats.title')}>
          <BarChart3 size={18} />
        </button>

        <button className="header-btn" onClick={onToggleFilter} title={t('header.filter')}>
          <Filter size={18} />
        </button>

        <button className="header-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="header-btn lang-btn" onClick={toggleLocale}>
          {locale === 'ko' ? 'EN' : '한'}
        </button>
      </div>
    </header>
  )
}
