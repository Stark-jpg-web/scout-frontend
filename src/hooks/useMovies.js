import { useQuery } from '@tanstack/react-query'
import {
  fetchTrending,
  fetchTopRated,
  fetchPopular,
} from '../services/tmdb/movieApi'

export const mediaKeys = {
  all: ['media'],
  type: (type) => [...mediaKeys.all, type],
  trending: (type = 'movie') => [...mediaKeys.type(type), 'trending'],
  topRated: (type = 'movie') => [...mediaKeys.type(type), 'top-rated'],
  popular: (type = 'movie') => [...mediaKeys.type(type), 'popular'],
  detail: (type = 'movie', id) => [...mediaKeys.type(type), 'detail', id],
  genres: (type = 'movie') => [...mediaKeys.type(type), 'genres'],
}

export function useTrending(type = 'movie') {
  return useQuery({
    queryKey: mediaKeys.trending(type),
    queryFn: () => fetchTrending(type),
  })
}
export function useTopRated(type = 'movie') {
  return useQuery({
    queryKey: mediaKeys.topRated(type),
    queryFn: () => fetchTopRated(type),
  })
}
export function usePopular(type = 'movie') {
  return useQuery({
    queryKey: mediaKeys.popular(type),
    queryFn: () => fetchPopular(type),
  })
}

export const useTrendingMovies = () => useTrending('movie')
export const useTrendingShows = () => useTrending('tv')
export const useTopRatedMovies = () => useTopRated('movie')
export const useTopRatedShows = () => useTopRated('tv')
export const usePopularMovies = () => usePopular('movie')
export const usePopularShows = () => usePopular('tv')
