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
import MediaCard from '../components/movies/MediaCard.jsx'

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
      {spotlight && !isLoading && <MediaCard media={spotlight} />}
    </div>
  )
}

export default HomePage
