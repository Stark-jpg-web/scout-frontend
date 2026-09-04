import { useTranslation } from 'react-i18next'
import {
  FALLBACK_POSTER,
  getImageUrl,
  TMDB_IMAGE_SIZES,
} from '../../utils/constants.js'
import RatingBadge from '../ui/RatingBadge.jsx'

function MediaCard({ media, onClick }) {
  if (!media || media === null) return null

  const { t } = useTranslation()
  const title = media.title || media.name || t('media.untitled')
  const releaseDate = media.release_date || media.first_air_date
  const releaseYear = releaseDate ? releaseDate.slice(0, 4) : null

  return (
    <>
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        className="media-card-container  w-36 sm:w-44 md:w-52 shrink-0 flex flex-col group gap-3 cursor-pointer select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary  bg-surface p-2.5"
      >
        <div className="media-card-canvas relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-muted border border-border/40 shadow-sm transition-all duration-300 group-hover:scale-103 group-hover:shadow-xl group-hover:border-primary/50">
          <img
            src={getImageUrl(media.poster_path, TMDB_IMAGE_SIZES.POSTER_CARD)}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_POSTER
            }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 "
          />
          {/* Floating Rating Badge at top-end corner (RTL symmetrical) */}
          {media.vote_average !== undefined && (
            <div className="absolute  top-2 end-2 z-10 drop-shadow-md">
              <RatingBadge size="sm" rating={media.vote_average} />
            </div>
          )}
        </div>
        <div className="media-card-metadata text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors space-y-2 text-center ">
          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase ">
            {t('media.trending')} {t('general.in')}{' '}
            {media.title ? t('media.movies') : t('media.shows')}
          </span>
          <h2 className="media-card-title  text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200 text-center ">
            {title}
          </h2>
          <p className="media-card-overview text-[0.6rem] text-muted truncate  line-clamp-3">
            {media.overview || t('media.noOverview')}
          </p>
          <p className="media-card-release-date flex flex-col  text-xs text-muted font-mono ">
            {t('media.release_date')}: {releaseYear}
          </p>
        </div>
      </div>
    </>
  )
}
export default MediaCard
