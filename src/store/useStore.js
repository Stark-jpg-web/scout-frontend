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
            (state) => ({ mediaType: state.mediaType === 'movie' ? 'tv' : 'movie' }),
            false,
            'toggleMediaType'
          ),

        // Search & Filter State
        searchQuery: '',
        setSearchQuery: (query) => set({ searchQuery: query }, false, 'setSearchQuery'),
        
        selectedFilter: 'all',
        setSelectedFilter: (filter) => set({ selectedFilter: filter }, false, 'setSelectedFilter'),

        // Active / Selected items
        selectedItem: null,
        setSelectedItem: (item) => set({ selectedItem: item }, false, 'setSelectedItem'),
        clearSelectedItem: () => set({ selectedItem: null }, false, 'clearSelectedItem'),

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
        }), // only persist specific fields if needed
      }
    ),
    { name: 'FrameFinderStore' }
  )
)

export default useStore

