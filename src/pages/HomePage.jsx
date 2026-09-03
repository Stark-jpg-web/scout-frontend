import { useTranslation } from 'react-i18next'
import { useTrending } from '../hooks/useMovies.js'
import { useTopRated } from '../hooks/useMovies.js'
import { usePopular } from '../hooks/useMovies.js'
import {
  getImageUrl,
  FALLBACK_POSTER,
  TMDB_IMAGE_SIZES,
} from '../utils/constants.js'
import useStore from '../store/useStore.js'

function HomePage() {
  const { t } = useTranslation()
  const mediaType = useStore((state) => state.mediaType)
  const trending = useTrending(mediaType)
  const topRated = useTopRated(mediaType)
  const popular = usePopular(mediaType)
  const isLoading =
    trending.isLoading || topRated.isLoading || popular.isLoading
  const isError = trending.isError || topRated.isError || popular.isError
  const error = trending.error || topRated.error || popular.error
  //testing api calls
  const spotlight = popular?.data?.results?.[0]
  const name = mediaType === 'movie' ? spotlight?.title : spotlight?.name

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t('app.name')}
          </h1>
          <p className="text-base text-muted">{t('app.tagline')}</p>
        </div>
      </div>

      {/* Loading Skeleton Placeholder */}
      {isLoading && (
        <div className="w-full h-72 rounded-2xl bg-surface animate-pulse" />
      )}
      {/* Error State */}
      {isError && (
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent">
          <p className="font-semibold"></p>
          <p className="text-sm opacity-80">{error?.message}</p>
        </div>
      )}
      {/* Live Spotlight Verification */}
      {spotlight && !isLoading && (
        <div className=" overflow-hidden rounded-2xl bg-surface border border-border p-6 flex flex-col md:flex-row gap-6 items-center">
          <img
            src={getImageUrl(
              spotlight.poster_path,
              TMDB_IMAGE_SIZES.POSTER_CARD
            )}
            alt={mediaType === 'movie' ? spotlight.title : spotlight.name}
            className="w-40 rounded-xl shadow-lg shrink-0"
          />
          <div className="space-y-2 text-center md:text-start">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary uppercase tracking-wider">
              #1 Trending
            </span>
            <h2 className="text-2xl font-bold text-foreground">
              {mediaType === 'movie' ? spotlight.title : spotlight.name}
            </h2>
            <p className="text-sm text-muted line-clamp-3">
              {spotlight.overview}
            </p>
            <p className="text-xs text-muted/80">
              Release: {spotlight.release_date || spotlight.first_air_date} •
              Rating: ⭐ {spotlight.vote_average?.toFixed(1)}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
