import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import useStore from '../../store/useStore'
import { getWikiUrl } from '../../utils/wikipedia'

export default function MediaTab({ item, mediaData }) {
  const { t } = useTranslation()
  const { locale } = useStore()

  // 관련 미디어 필터링
  const relatedMedia = item?.relatedMedia
    ? mediaData.filter((m) => item.relatedMedia.includes(m.id))
    : []

  if (relatedMedia.length === 0) {
    return <p className="media-no-data">{t('detail.noMedia')}</p>
  }

  return (
    <div className="media-list fade-in">
      {relatedMedia.map((media) => {
        const title = media.title[locale] || media.title.ko
        const creator = media.creator[locale] || media.creator.ko
        const desc = media.description[locale] || media.description.ko

        return (
          <div key={media.id} className={`media-card media-type-${media.type}`}>
            <div className="media-card-header">
              <span className="media-card-icon">{media.icon}</span>
              <span className="media-card-title">{title}</span>
              {media.year && <span className="media-card-year">{media.year}</span>}
            </div>
            <div className="media-card-creator">{creator}</div>
            <div className="media-card-desc">{desc}</div>
            <div className="media-card-links">
              {media.wikipedia?.[locale] && (
                <a
                  href={getWikiUrl(media.wikipedia[locale], locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-link"
                >
                  📖 Wiki <ExternalLink size={10} />
                </a>
              )}
              {media.externalLinks?.imdb && (
                <a
                  href={`https://www.imdb.com/title/${media.externalLinks.imdb}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="media-link"
                >
                  🎬 IMDb <ExternalLink size={10} />
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
