import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        // UI / App State
        theme: 'dark',

        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' }),
            false,
            'toggleTheme'
          ),

        // Media Type State
        mediaType: 'movie',
        toggleMediaType: () =>
          set(
            (state) => ({
              mediaType: state.mediaType === 'movie' ? 'tv' : 'movie',
            }),
            false,
            'toggleMediaType'
          ),

        // Search & Filter State
        searchQuery: '',
        setSearchQuery: (query) =>
          set({ searchQuery: query }, false, 'setSearchQuery'),

        selectedFilter: 'all',
        setSelectedFilter: (filter) =>
          set({ selectedFilter: filter }, false, 'setSelectedFilter'),

        // Favorites Normalized Dictionary: { [id]: mediaSnapshot }
        favorites: {},
        toggleFavorite: (media) =>
          set(
            (state) => {
              if (!media?.id) return state
              const next = { ...state.favorites }
              if (next[media.id]) {
                delete next[media.id]
              } else {
                next[media.id] = {
                  id: media.id,
                  title:
                    media.title ||
                    media.name ||
                    media.original_title ||
                    media.original_name ||
                    '',
                  poster_path: media.poster_path || '',
                  vote_average: media.vote_average ?? null,
                  release_date:
                    media.release_date || media.first_air_date || '',
                  media_type:
                    media.media_type || (media.title ? 'movie' : 'tv'),
                  addedAt: Date.now(),
                  genre_ids: media.genre_ids || [],
                }
              }
              return { favorites: next }
            },
            false,
            'toggleFavorite'
          ),

        // Watchlist Normalized Dictionary: { [id]: mediaSnapshot }
        watchlist: {},
        toggleWatchlist: (media) =>
          set(
            (state) => {
              if (!media?.id) return state
              const next = { ...state.watchlist }
              if (next[media.id]) {
                delete next[media.id]
              } else {
                next[media.id] = {
                  id: media.id,
                  title:
                    media.title ||
                    media.name ||
                    media.original_title ||
                    media.original_name ||
                    '',
                  poster_path: media.poster_path || '',
                  vote_average: media.vote_average ?? null,
                  release_date:
                    media.release_date || media.first_air_date || '',
                  media_type:
                    media.media_type || (media.title ? 'movie' : 'tv'),
                  addedAt: Date.now(),
                  genre_ids: media.genre_ids || media.genres?.map((g) => g.id) || [],
                }
              }
              return { watchlist: next }
            },
            false,
            'toggleWatchlist'
          ),

        // Active / Selected items
        selectedItem: null,
        setSelectedItem: (item) =>
          set({ selectedItem: item }, false, 'setSelectedItem'),
        clearSelectedItem: () =>
          set({ selectedItem: null }, false, 'clearSelectedItem'),

        // Reset all store state
        resetStore: () =>
          set(
            {
              searchQuery: '',
              selectedFilter: 'all',
              selectedItem: null,
            },
            false,
            'resetStore'
          ),
      }),
      {
        name: 'frame-finder-storage', // name in localStorage
        partialize: (state) => ({
          theme: state.theme,
          selectedFilter: state.selectedFilter,
          favorites: state.favorites,
          watchlist: state.watchlist,
        }),
      }
    ),
    { name: 'FrameFinderStore' }
  )
)

export default useStore
