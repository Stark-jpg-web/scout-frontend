import { useTranslation } from 'react-i18next'
import { getImageUrl, TMDB_IMAGE_SIZES } from '../../utils/constants.js'
import RatingBadge from '../ui/RatingBadge.jsx'

function MediaCard({ media, mediaType }) {
  const { t } = useTranslation()
  const name = media.title || media.name
  const releaseDate = media.release_date || media.first_air_date


  return (
    <div className=" overflow-hidden rounded-2xl bg-surface border border-border p-6 flex flex-col md:flex-row gap-6 items-center">
      <img
        src={getImageUrl(media.poster_path, TMDB_IMAGE_SIZES.POSTER_CARD)}
        alt={name}
        className="w-40 rounded-xl shadow-lg shrink-0"
      />
      <div className="space-y-2 text-center md:text-start">
        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider">
          {t('media.trending')} {t('general.in')} {media.title ? t('media.movies') : t('media.shows')}
        </span>
        <h2 className="text-2xl font-bold text-foreground">{name}</h2>
        <p className="text-sm text-muted line-clamp-3">
          {media.overview || t('media.noOverview')}
        </p>
        <p className="text-xs text-muted/80">
          {t('media.release_date')}:{' '}
          {releaseDate} •{' '}
          <RatingBadge rating={media.vote_average} />
        </p>
      </div>
    </div>
  )
}
export default MediaCard
