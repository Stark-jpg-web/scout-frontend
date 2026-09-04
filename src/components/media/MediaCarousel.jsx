import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft, FaChevronRight, FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import MediaCard from './MediaCard.jsx'
import MediaCardSkeleton from './MediaCardSkeleton.jsx'

function MediaCarousel({
  title,
  items = [],
  isLoading = false,
  seeAllLink,
  onCardClick,
}) {
  const { t } = useTranslation()
  const scrollRef = useRef(null)
  const isRTL = document.documentElement.dir === 'rtl'
  // Smooth scroll handler with bidirectional (LTR & RTL) support
  const handleScroll = (direction) => {
    if (!scrollRef.current) return
    const isRTL = document.documentElement.dir === 'rtl'

    const scrollDistance = scrollRef.current.clientWidth * 0.6
    // In RTL, standard browsers invert horizontal scroll coordinates
    const scrollDelta =
      direction === 'next'
        ? isRTL
          ? -scrollDistance
          : scrollDistance
        : isRTL
          ? scrollDistance
          : -scrollDistance
    scrollRef.current.scrollBy({
      left: scrollDelta,
      behavior: 'smooth',
    })
  }
  return (
    <section className="relative flex flex-col space-y-3 w-full py-2">
      <div className="flex items-center justify-between px-1">
        {seeAllLink ? (
          <Link
            to={seeAllLink}
            className="group inline-flex items-center gap-2 text-lg sm:text-xl font-bold text-foreground hover:text-primary transition-colors duration-200"
          >
            <span>{title}</span>
            <span className="text-sm font-semibold text-primary">
              {t('general.seeAll')}
            </span>
           {isRTL ? <FaArrowLeft className="text-lg  group-hover:translate-x-1 text-primary/70" /> : <FaArrowRight className="text-lg  group-hover:translate-x-1 text-primary/70" />}
          </Link>
        ) : (
          <div className="group inline-flex  items-center justify-center gap-2  font-bold text-foreground hover:text-primary transition-colors duration-200">
            <h2 className="text-lg scale-y-120 sm:text-xl font-bold text-foreground">
              {title}
            </h2>
            <FaArrowRight className="text-xl text-primary/70" />
          </div>
        )}
        <div className="flex  items-center gap-4">
          <button className="carousel-btn" onClick={() => handleScroll('prev')}>
            {isRTL?<FaChevronRight className="text-center text-xl text-primary/70 " />:<FaChevronLeft className="text-center text-xl text-primary/70 " />}
          </button>
          <button className="carousel-btn" onClick={() => handleScroll('next')}>
            {isRTL?<FaChevronLeft className="text-center text-xl text-primary/70 rounded-md  " />:<FaChevronRight className="text-center text-xl text-primary/70 rounded-md  " />}
          </button>
        </div>
      </div>
      {/* 2. Scroll Track: Strict Zero-CLS Layout */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-1 px-1 scroll-smooth"
      >
        {isLoading
          ? Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-36 sm:w-44 md:w-52 shrink-0 snap-start"
              >
                <MediaCardSkeleton />
              </div>
            ))
          : items.map((media) => (
              <div key={media.id} className="snap-start">
                <MediaCard media={media} onClick={() => onCardClick?.(media)} />
              </div>
            ))}
      </div>
    </section>
  )
}
export default MediaCarousel
