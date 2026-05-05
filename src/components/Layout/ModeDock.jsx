import { ScrollText, Globe2, BookOpen } from 'lucide-react'
import useStore from '../../store/useStore'
import './ModeDock.css'

const SINGLE_MODES = [
  { id: 'chronicle', Icon: ScrollText, ko: '연대기', en: 'Chronicle', key: 'T' },
  { id: 'globe',     Icon: Globe2,      ko: '지구본', en: 'Globe',      key: 'G' },
  { id: 'detail',   Icon: BookOpen,    ko: '상세',   en: 'Detail',     key: 'D' },
]

const SPLIT_MODES = [
  { id: 'split-cg', ko: '연+지', en: 'C+G', key: '1' },
  { id: 'split-cd', ko: '연+상', en: 'C+D', key: '2' },
  { id: 'split-gd', ko: '지+상', en: 'G+D', key: '3' },
]

export default function ModeDock({ viewMode, onSetMode, isMobile }) {
  const { locale } = useStore()

  if (isMobile) {
    return (
      <nav className="mobile-tab-bar">
        {SINGLE_MODES.map(({ id, Icon, ko, en }) => (
          <button
            key={id}
            className={`mobile-tab ${viewMode === id ? 'active' : ''}`}
            onClick={() => onSetMode(id)}
          >
            <Icon size={20} />
            <span>{locale === 'ko' ? ko : en}</span>
          </button>
        ))}
      </nav>
    )
  }

  return (
    <div className="mode-dock">
      <div className="mode-dock-pill">
        <div className="mode-group">
          {SINGLE_MODES.map(({ id, Icon, ko, en, key }) => (
            <button
              key={id}
              className={`dock-btn ${viewMode === id ? 'active' : ''}`}
              onClick={() => onSetMode(id)}
              title={`${locale === 'ko' ? ko : en} [${key}]`}
            >
              <Icon size={15} />
              <span>{locale === 'ko' ? ko : en}</span>
            </button>
          ))}
        </div>

        <div className="mode-dock-sep" />

        <div className="mode-group">
          {SPLIT_MODES.map(({ id, ko, en, key }) => (
            <button
              key={id}
              className={`dock-btn dock-btn-split ${viewMode === id ? 'active' : ''}`}
              onClick={() => onSetMode(id)}
              title={`${locale === 'ko' ? ko : en} [${key}]`}
            >
              <span>{locale === 'ko' ? ko : en}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
