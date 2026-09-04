import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaHeart, FaInfoCircle } from 'react-icons/fa'
import { getImageUrl, TMDB_IMAGE_SIZES } from '../../utils/constants.js'
import RatingBadge from '../ui/RatingBadge.jsx'

function HeroBanner({ media, isLoading = false, onFavoriteClick }) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[480px] rounded-2xl bg-surface animate-pulse mb-8 border border-border/40" />
    )
  }

  if (!media) return null

  const title =
    media.title ||
    media.name ||
    media.original_title ||
    media.original_name ||
    t('media.untitled')

  const dateStr = media.release_date || media.first_air_date
  const year = dateStr ? dateStr.slice(0, 4) : null
  const mediaType = media.title ? 'movie' : 'tv'
  const detailUrl = `/${mediaType}/${media.id}`

  return (
    <div className="relative w-full min-h-[380px] sm:min-h-[440px] md:min-h-[500px] rounded-2xl overflow-hidden bg-surface flex flex-col justify-end p-6 sm:p-8 md:p-10 mb-8 border border-border/40 shadow-xl group">
      {/* 1. Backdrop Image with High-Res Sizing */}
      {media.backdrop_path && (
        <img
          src={getImageUrl(media.backdrop_path, TMDB_IMAGE_SIZES.BACKDROP_LG)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-103"
        />
      )}

      {/* 2. Cinematic Gradient Scrim (Bottom & Side Gradient) */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent sm:bg-gradient-to-r sm:rtl:bg-gradient-to-l sm:from-background sm:via-background/80 sm:to-transparent" />

      {/* 3. Foreground Content */}
      <div className="relative z-10 max-w-2xl space-y-3 sm:space-y-4 text-start">
        {/* Rating & Year Badges */}
        <div className="flex items-center gap-2">
          {media.vote_average !== undefined && (
            <RatingBadge rating={media.vote_average} size="md" />
          )}
          {year && (
            <span className="px-2.5 py-1 rounded-lg bg-surface/80 border border-border/50 text-xs font-mono text-muted">
              {year}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-lg bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            #1 {t('media.trending')}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground line-clamp-2">
          {title}
        </h1>

        {/* Overview Excerpt */}
        {media.overview && (
          <p className="text-sm sm:text-base text-muted/90 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {media.overview}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity shadow-md text-sm"
          >
            <FaInfoCircle className="text-base" />
            <span>{t('media.viewDetails')}</span>
          </Link>

          <button
            type="button"
            onClick={() => onFavoriteClick?.(media)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface/80 hover:bg-surface border border-border text-foreground transition-colors shadow-sm text-sm cursor-pointer"
          >
            <FaHeart className="text-accent text-sm" />
            <span>{t('media.addToFavorites')}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
