import { useTranslation } from 'react-i18next'
import { FaSearch, FaTimes, FaSortAmountDown } from 'react-icons/fa'
function CollectionFilterToolbar({
  mediaType = 'all',
  onMediaTypeChange,
  searchQuery = '',
  onSearchChange,
  sortBy = 'date_desc',
  onSortChange,
}) {
  const { t } = useTranslation()
  const mediaTypes = [
    { key: 'all', label: t('media.all') },
    { key: 'movie', label: t('media.movies') },
    { key: 'tv', label: t('media.shows') },
  ]
  const sortOptions = [
    { key: 'date_desc', label: t('library.sortDateDesc') },
    { key: 'date_asc', label: t('library.sortDateAsc') },
    { key: 'rating_desc', label: t('library.sortRatingDesc') },
    { key: 'rating_asc', label: t('library.sortRatingAsc') },
    { key: 'title_asc', label: t('library.sortTitleAsc') },
    { key: 'title_desc', label: t('library.sortTitleDesc') },
  ]
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 p-2.5 rounded-2xl bg-surface/70 border border-border/60 backdrop-blur-md shadow-sm">
      {/* 1. Media Type Segmented Pills */}
      <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-elevated/80 border border-border/40 shrink-0">
        {mediaTypes.map((type) => {
          const isActive = mediaType === type.key
          return (
            <button
              key={type.key}
              type="button"
              onClick={() => onMediaTypeChange?.(type.key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted hover:text-foreground hover:bg-surface-muted'
              }`}
            >
              {type.label}
            </button>
          )
        })}
      </div>
      {/* 2. Middle & Right Controls (Search + Sort) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 md:justify-end">
        {/* Search Input with Start Icon & Clear Button */}
        <div className="relative flex-1 max-w-full sm:max-w-xs">
          <FaSearch className="absolute start-3 top-1/2 -translate-y-1/2 text-muted/60 text-xs sm:text-sm pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={t('library.searchPlaceholder')}
            className="w-full ps-9 pe-8 py-2 rounded-xl bg-surface-elevated border border-border/60 text-foreground text-xs sm:text-sm placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange?.('')}
              className="absolute end-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>
        {/* Sort Dropdown */}
        <div className="relative flex items-center shrink-0">
          <FaSortAmountDown className="absolute start-3 top-1/2 -translate-y-1/2 text-muted/70 text-xs pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange?.(e.target.value)}
            className="ps-8 pe-6 py-2 rounded-xl bg-surface-elevated border border-border/60 text-foreground text-xs sm:text-sm cursor-pointer focus:outline-none focus:border-primary transition-colors appearance-none"
            aria-label={t('library.sortBy')}
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key} className="bg-surface text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
export default CollectionFilterToolbar