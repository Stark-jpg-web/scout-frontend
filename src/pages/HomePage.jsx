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
import MediaCard from '../components/media/MediaCard.jsx'
import MediaCardSkeleton from '../components/media/MediaCardSkeleton.jsx'
import MediaCarousel from '../components/media/MediaCarousel.jsx'
import HeroBanner from '../components/media/HeroBanner.jsx'
function HomePage() {
  const { t } = useTranslation()
  const mediaType = useStore((state) => state.mediaType)
  const trending = useTrending(mediaType)
  const topRated = useTopRated(mediaType)
  const popular = usePopular(mediaType)
  const isLoading =
    trending.isLoading == true ||
    topRated.isLoading == true ||
    popular.isLoading == true
  const isError = trending.isError || topRated.isError || popular.isError
  const error = trending.error || topRated.error || popular.error
  //testing api calls
  const heroItem = trending.data?.results?.[0]

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
        <div className="grid grid-cols-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <MediaCardSkeleton key={i} className="" />
          ))}
        </div>
      )}
      {/* Error State */}
      {isError && (
        <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent">
          <p className="font-semibold"></p>
          <p className="text-sm opacity-80">{error?.message}</p>
        </div>
      )}
      {/* Live Spotlight Verification */}
       <HeroBanner media={heroItem} isLoading={trending.isLoading} />

      <MediaCarousel
        title={t('media.trending')}
        items={trending.data?.results || []}
        isLoading={trending.isLoading}
        seeAllLink="/discover/trending"
      />
      <MediaCarousel
        title={t('media.popular')}
        items={popular.data?.results || []}
        isLoading={popular.isLoading}
        seeAllLink="/discover/popular"
      />
      <MediaCarousel
        title={t('media.top_rated')}
        items={topRated.data?.results || []}
        isLoading={topRated.isLoading}
        seeAllLink="/discover/top-rated"
      />
    </div>
  )
}

export default HomePage
