import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useStore from '../store/useStore.js'
import { useSearchMedia } from '../hooks/useMovies.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { CURATED_GENRES } from '../utils/constants.js'
import MediaGrid from '../components/media/MediaGrid.jsx'

function SearchPage() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [inputQuery, setInputQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(inputQuery, 400)

  const mediaType = useStore((state) => state.mediaType)
  const toggleMediaType = useStore((state) => state.toggleMediaType)

  // Sync debounced search with URL parameters
  useEffect(() => {
    if (debouncedQuery.trim()) {
      setSearchParams({ q: debouncedQuery.trim() }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [debouncedQuery, setSearchParams])

  // Execute TanStack Query search
  const { data, isLoading, isFetching } = useSearchMedia(
    debouncedQuery,
    mediaType
  )

  const results = data?.results || []
  const totalResults = data?.total_results || 0
  const hasSearched = debouncedQuery.trim().length > 0

  const handleClear = () => {
    setInputQuery('')
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="space-y-8">
      {/* Search Header & Input Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {t('navigation.search')}
            </h1>
            <p className="text-sm text-muted">
              {hasSearched
                ? t('search.resultsFound', {
                    count: totalResults.toLocaleString(),
                  })
                : t('search.startSearching')}
            </p>
          </div>

          {/* Media Type Switcher Tabs */}
          <div className="inline-flex rounded-xl bg-surface p-1 border border-border/50">
            <button
              onClick={() => mediaType !== 'movie' && toggleMediaType()}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mediaType === 'movie'
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {t('media.movies')}
            </button>
            <button
              onClick={() => mediaType !== 'tv' && toggleMediaType()}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                mediaType === 'tv'
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {t('media.shows')}
            </button>
          </div>
        </div>

        {/* Input Container */}
        <div className="relative">
          <span className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none text-muted">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            className="w-full h-14 ps-12 pe-12 rounded-2xl bg-surface/80 border border-border/60 text-foreground placeholder:text-muted/60 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all shadow-inner"
            autoFocus
          />

          {inputQuery && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 end-0 flex items-center pe-4 text-muted hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <span className="p-1 rounded-full hover:bg-surface-muted">✕</span>
            </button>
          )}
        </div>
      </div>

      {/* Results View */}
      {hasSearched ? (
        <div>
          {isLoading || isFetching ? (
            <MediaGrid isLoading={true} skeletonCount={12} />
          ) : results.length > 0 ? (
            <MediaGrid items={results} badgeVariant="" />
          ) : (
            /* No Results Empty State */
            <div className="py-16 text-center space-y-3 rounded-2xl bg-surface/30 border border-border/40">
              <span className="text-4xl block">🔍</span>
              <h3 className="text-xl font-bold text-foreground">
                {t('search.noResults', { query: debouncedQuery })}
              </h3>
              <p className="text-sm text-muted max-w-md mx-auto">
                {t('search.noResultsHint')}
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty Search Prompt & Curated Genre Quick Tags */
        <div className="space-y-6 pt-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            {t('search.exploreGenres')}
          </h2>

          <div className="flex flex-wrap gap-2.5">
            {CURATED_GENRES.map((genre) => (
              <Link
                key={genre.key}
                to={`/discover/${genre.key}`}
                className="px-4 py-2 text-sm font-medium rounded-xl bg-surface border border-border/50 text-foreground hover:border-primary hover:text-primary transition-colors shadow-sm"
              >
                {t(genre.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage
