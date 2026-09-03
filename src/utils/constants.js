export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL ||'https://image.tmdb.org/t/p'



export const TMDB_IMAGE_SIZES = {
  POSTER_THUMB: 'w185',
  POSTER_CARD: 'w342',     // Default size for carousel and grid movie cards
  POSTER_DETAIL: 'w500',   // High-res poster on details page sidebar
  BACKDROP_SM: 'w780',     // Mobile / Tablet hero banner
  BACKDROP_LG: 'w1280',    // Desktop widescreen cinema hero spotlight
  PROFILE: 'w185',         // Cast & crew avatar photos
  ORIGINAL: 'original',    // Raw uploaded file
}


export const FALLBACK_POSTER =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="342" height="513" viewBox="0 0 342 513" fill="#2A2422">
      <rect width="342" height="513" fill="#2A2422"/>
      <path d="M141 226h60v60h-60z" fill="#4B3C35"/>
      <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="#B8ABA3" font-family="sans-serif" font-size="16">
        No Poster Available
      </text>
    </svg>
  `)



  export function getImageUrl(path, size=TMDB_IMAGE_SIZES.POSTER_CARD){
    if (!path || path === 'null') {
      return FALLBACK_POSTER
    }

    if (path.startsWith('http')) return path; 

    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
    

  }