const baseUrl = import.meta.env.VITE_TMDB_BASE_URL
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

export async function apiFetch(endpoint, params = {}) {
  if (!baseUrl || !accessToken) {
    throw new Error('missing TMDB configuration.')
  }

  const url = new URL(`${baseUrl}${endpoint}`)

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  }

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const messageByStatus = {
      401: 'TMDB authorization failed. Check your API Read Access Token.',
      404: 'The requested TMDB resource was not found.',
      429: 'TMDB rate limit reached. Please try again shortly.',
    }
    const message = messageByStatus[response.status] ?? 'Unknown TMDB error.'
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  const data = await response.json()
  console.log('API DATA: ', data)
  return data
}

export function fetchTrending(mediaType = 'all', timeWindow = 'week',language='en-US') {
  return apiFetch(`/trending/${mediaType}/${timeWindow}`,{language})
}
export function fetchTopRated(mediaType = 'all', page = 1,language='en-US') {
  return apiFetch(`/${mediaType}/top_rated`, { page,language })
}
export function fetchPopular(mediaType = 'all', page = 1,language='en-US') {
  return apiFetch(`/${mediaType}/popular`, { page,language })
}
