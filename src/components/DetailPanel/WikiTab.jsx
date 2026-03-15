import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ExternalLink } from 'lucide-react'
import useStore from '../../store/useStore'
import { fetchWikiSummary, getWikiUrl } from '../../utils/wikipedia'

export default function WikiTab({ item }) {
  const { t } = useTranslation()
  const { locale } = useStore()
  const [wikiData, setWikiData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!item?.wikipedia?.[locale]) {
      setWikiData(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(false)

    fetchWikiSummary(item.wikipedia[locale], locale).then((data) => {
      if (!cancelled) {
        setWikiData(data)
        setLoading(false)
        if (!data) setError(true)
      }
    })

    return () => { cancelled = true }
  }, [item?.id, locale])

  if (loading) {
    return (
      <div className="wiki-loading fade-in">
        <div className="wiki-skeleton skeleton title" />
        <div className="wiki-skeleton skeleton desc" />
        <div className="wiki-skeleton skeleton desc" />
        <div className="wiki-skeleton skeleton short" />
      </div>
    )
  }

  if (error || !wikiData) {
    return (
      <div className="fade-in">
        <p className="wiki-no-data">{t('detail.noWikiData')}</p>
        {item?.description?.[locale] && (
          <p className="wiki-extract" style={{ textAlign: 'left', marginTop: 12 }}>
            {item.description[locale]}
          </p>
        )}
        {item?.wikipedia?.[locale] && (
          <a
            href={getWikiUrl(item.wikipedia[locale], locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="wiki-link"
          >
            {t('detail.viewOnWiki')} <ExternalLink size={12} />
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="fade-in">
      {wikiData.thumbnail && (
        <img
          src={wikiData.thumbnail.url}
          alt={wikiData.title}
          className="wiki-thumbnail"
        />
      )}
      <p className="wiki-extract">{wikiData.extract}</p>
      <a
        href={wikiData.pageUrl || getWikiUrl(item.wikipedia[locale], locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="wiki-link"
      >
        {t('detail.viewOnWiki')} <ExternalLink size={12} />
      </a>
    </div>
  )
}
