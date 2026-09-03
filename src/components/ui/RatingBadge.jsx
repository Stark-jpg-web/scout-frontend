function getRatingStyles(rating) {
  if (!rating || rating === 0) {
    return 'bg-surface-muted text-muted border-border'
  }
  if (rating >= 8.0) {
    return 'bg-rating-excellent/20 text-rating-excellent border-rating-excellent/30'
  }
  if (rating >= 6.5) {
    return 'bg-rating-good/20 text-rating-good border-rating-good/30'
  }
  if (rating >= 5.0) {
    return 'bg-rating-fair/20 text-rating-fair border-rating-fair/30'
  }
  return 'bg-rating-poor/20 text-rating-poor border-rating-poor/30'
}

const SIZES = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3.5 py-1.5 gap-2 font-semibold',
  auto: 'text-xs px-2 py-0.5 gap-1 sm:text-sm sm:px-2.5 sm:py-1 sm:gap-1.5 lg:text-base lg:px-3.5 lg:py-1.5 lg:gap-2 font-medium',
}

function RatingBadge({ rating, size = 'auto', className = '' }) {
  const styles = getRatingStyles(rating)
  const sizeClass = SIZES[size] || SIZES.auto
  const isUnrated = !rating || rating === 0
  const formattedScore = isUnrated ? '--' : rating.toFixed(1)

  return (
    <span
      className={`inline-flex items-center border rounded-lg ${styles} ${sizeClass} ${className}`}
      aria-label={`Rating: ${formattedScore} out of 10`}
      title={formattedScore}
    >
      ★
      <span className="font-mono">{formattedScore}</span>
    </span>
  )
}

export default RatingBadge
