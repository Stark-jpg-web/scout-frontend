import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useStore from '../store/useStore.js'
import {
  useTrending,
  usePopular,
  useTopRated,
  useNewReleases,
  useByGenre,
} from '../hooks/useMovies.js'
import { CURATED_GENRES } from '../utils/constants.js'
import MediaGrid from '../components/media/MediaGrid.jsx'

function CategoryPage() {
  const { category, id } = useParams()
  const { t } = useTranslation()
  const mediaType = useStore((state) => state.mediaType)

  // Automatically find if the current route matches any curated genre in our constants dictionary
  const target = id || category
  const matchedGenre = CURATED_GENRES.find(
    (g) =>
      g.key === target ||
      String(g.movieId) === String(target) ||
      String(g.tvId) === String(target)
  )

  const isGenre = Boolean(matchedGenre || id)
  const resolvedGenreId = matchedGenre
    ? mediaType === 'tv'
      ? matchedGenre.tvId
      : matchedGenre.movieId
    : id

  // Server state queries
  const trending = useTrending(mediaType)
  const popular = usePopular(mediaType)
  const topRated = useTopRated(mediaType)
  const newReleases = useNewReleases(mediaType)
  const byGenre = useByGenre(mediaType, resolvedGenreId)

  let activeQuery = trending
  let title = `${t('media.trending')} ${t('general.now')}`
  let badgeVariant = 'trending'

  if (matchedGenre) {
    activeQuery = byGenre
    title = t(matchedGenre.labelKey)
    badgeVariant = matchedGenre.badgeVariant
  } else if (isGenre) {
    activeQuery = byGenre
    title = t('navigation.genres')
    badgeVariant = 'genres'
  } else if (category === 'popular') {
    activeQuery = popular
    title = `${t('media.popular')} ${t('general.now')}`
    badgeVariant = 'popular'
  } else if (category === 'top-rated') {
    activeQuery = topRated
    title = t('media.top_rated')
    badgeVariant = 'top_rated'
  } else if (category === 'new-releases') {
    activeQuery = newReleases
    title = t('media.new_releases')
    badgeVariant = 'new_releases'
  }

  const items = activeQuery.data?.results || []
  const totalCount = activeQuery.data?.total_results

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          <span className="rtl:rotate-180">←</span>
          <span>{t('general.backToDiscover')}</span>
        </Link>
      </div>

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/40">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {totalCount ? (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                {totalCount.toLocaleString()} {t('general.in')}{' '}
                {mediaType === 'movie' ? t('media.movies') : t('media.shows')}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-muted">{t('app.tagline')}</p>
        </div>
      </div>

      {/* Full-Screen Responsive Grid */}
      <MediaGrid
        items={items}
        isLoading={activeQuery.isLoading}
        skeletonCount={18}
        badgeVariant={badgeVariant}
      />
    </div>
  )
}

export default CategoryPage
