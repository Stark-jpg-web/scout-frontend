import { useQuery } from '@tanstack/react-query'
import {
  fetchTrending,
  fetchTopRated,
  fetchPopular,
} from '../services/tmdb/movieApi'
import { useCurrentLanguage } from '../utils/constants.js'

export const mediaKeys = {
  all: ['media'],
  type: (type) => [...mediaKeys.all, type],
  trending: (type = 'movie', language = 'en-US') => [
    ...mediaKeys.type(type),
    'trending',
    language,
  ],
  topRated: (type = 'movie', language = 'en-US') => [
    ...mediaKeys.type(type),
    'top-rated',
    language,
  ],
  popular: (type = 'movie', language = 'en-US') => [
    ...mediaKeys.type(type),
    'popular',
    language,
  ],
  detail: (type = 'movie', id) => [...mediaKeys.type(type), 'detail', id],
  genres: (type = 'movie', language = 'en-US') => [
    ...mediaKeys.type(type),
    'genres',
    language,
  ],
}

export function useTrending(type = 'movie') {
  const language = useCurrentLanguage()

  return useQuery({
    queryKey: mediaKeys.trending(type, language),
    queryFn: () => fetchTrending(type, 'week', language),
  })
}

export function useTopRated(type = 'movie') {
  const language = useCurrentLanguage()

  return useQuery({
    queryKey: mediaKeys.topRated(type, language),
    queryFn: () => fetchTopRated(type, 1, language),
  })
}

export function usePopular(type = 'movie') {
  const language = useCurrentLanguage()

  return useQuery({
    queryKey: mediaKeys.popular(type, language),
    queryFn: () => fetchPopular(type, 1, language),
  })
}

export const useTrendingMovies = () => useTrending('movie')
export const useTrendingShows = () => useTrending('tv')
export const useTopRatedMovies = () => useTopRated('movie')
export const useTopRatedShows = () => useTopRated('tv')
export const usePopularMovies = () => usePopular('movie')
export const usePopularShows = () => usePopular('tv')
