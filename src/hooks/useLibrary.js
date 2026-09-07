import useStore from '../store/useStore'

export function useLibrary(media) {
  const id = media?.id

  // Atomic selectors: component only re-renders when this specific item's status changes
  const isFavorite = useStore((state) => Boolean(state.favorites[id]))
  const isWatchlisted = useStore((state) => Boolean(state.watchlist[id]))

  const toggleFavorite = useStore((state) => state.toggleFavorite)
  const toggleWatchlist = useStore((state) => state.toggleWatchlist)

  return {
    isFavorite,
    isWatchlisted,
    toggleFavorite: () => toggleFavorite(media),
    toggleWatchlist: () => toggleWatchlist(media),
  }
}

export default useLibrary
