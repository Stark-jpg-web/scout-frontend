function MediaCardSkeleton({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`media-card-skeleton relative flex flex-col rounded-xl overflow-hidden bg-surface border border-border/40 ${className}`}
    >
      {/* 1. Poster Canvas: Strict 2:3 aspect ratio guarantees zero layout shift */}
      <div className="poster-canvas aspect-2/3 w-full bg-surface-muted animate-pulse" />

      {/* 2. Metadata: Mobile-first padding (compact on mobile, spacious on tablet/desktop) */}
      <div className="metadata p-2.5 sm:p-3 space-y-2">
        {/* Title line placeholder */}
        <div className="h-4 w-3/4 rounded bg-surface-muted/80 animate-pulse" />

        {/* Subtitle / Year and Rating row */}
        <div className="container flex items-center justify-between gap-2 pt-1">
          <div className="year h-3 w-1/3 rounded bg-surface-muted/60 animate-pulse" />
          <div className="rating h-5 w-10 rounded-md bg-surface-muted/60 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default MediaCardSkeleton
