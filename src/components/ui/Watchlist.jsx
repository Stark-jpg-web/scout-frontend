import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import useLibrary from '../../hooks/useLibrary.js'

export default function Watchlist({media}) {
  const { t } = useTranslation()
  const { isWatchlisted, toggleWatchlist } = useLibrary(media)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        toggleWatchlist()
      }}
      aria-label={
        isWatchlisted
          ? t('media.removeFromWatchlist', 'Remove from watchlist')
          : t('media.addToWatchlist', 'Add to watchlist')
      }
      className="p-1.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border/50 text-foreground hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(215,168,71,0.7)] transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
    >
      {isWatchlisted ? (
        <BsBookmarkPlusFill className="text-xs sm:text-sm text-primary drop-shadow-[0_0_6px_rgba(215,168,71,0.6)]" />
      ) : (
        <BsBookmarkPlus className="text-xs sm:text-sm text-foreground/80 hover:text-primary transition-colors" />
      )}
    </button>
  )
}
