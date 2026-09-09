import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

function VideoModal({ isOpen, onClose, videos = [],title }) {
  const { t } = useTranslation()

  const trailer = videos?.find(
    (v) =>
      (v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
      (v.site === 'YouTube' && v.type === 'Trailer') ||
      (v.site === 'YouTube' && v.type === 'Teaser')
  )
  

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const youtubeKey=trailer?.key

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t('media.trailer', { defaultValue: 'Trailer' })}
    >
      <div
        className="w-full max-w-3xl sm:max-w-4xl bg-surface rounded-2xl border border-border/50 p-4 sm:p-6 shadow-2xl space-y-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-border/40">
          <h3 className="text-lg font-bold text-foreground truncate pe-4">
            {title || t('media.trailer', { defaultValue: 'Trailer' })}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('media.close', { defaultValue: 'Close' })}
            className="rounded-full w-9 h-9 flex items-center justify-center hover:bg-white/10 text-muted hover:text-foreground transition-colors cursor-pointer shrink-0"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        {youtubeKey ? (
          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-border/30 shadow-inner">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeKey}?autoplay=1&rel=0`}
              title={trailer?.name || t('media.trailer', { defaultValue: 'Trailer' })}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-xl overflow-hidden bg-black/60 border border-border/30 flex items-center justify-center">
            <p className="text-muted text-sm">{t('media.noTrailer', { defaultValue: 'No trailer available' })}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoModal
