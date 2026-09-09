import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaChevronLeft, FaChevronRight, FaUserAlt } from 'react-icons/fa'
import { getImageUrl, TMDB_IMAGE_SIZES } from '../../utils/constants.js'

function CastCrewRow({ title, members = [], isCrew = false }) {
  const { t } = useTranslation()
  const scrollRef = useRef(null)
  const isRTL = document.documentElement.dir === 'rtl'

  if (!members || members.length === 0) return null

  const handleScroll = (direction) => {
    if (!scrollRef.current) return
    const scrollDistance = scrollRef.current.clientWidth * 0.6
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
    <section className="space-y-3 w-full py-2">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          {title}
        </h2>
        <div className="flex  items-center gap-4">
          <button
            type="button"
            className="carousel-btn cursor-pointer hover:scale-110  hover:ring-primary "
            onClick={() => handleScroll('prev')}
            aria-label="Previous"
          >
            {isRTL ? (
              <FaChevronRight className="text-sm sm:text-base text-primary/80" />
            ) : (
              <FaChevronLeft className="text-sm sm:text-base text-primary/80" />
            )}
          </button>
          <button
            type="button"
            className="carousel-btn cursor-pointer"
            onClick={() => handleScroll('next')}
            aria-label="Next"
          >
            {isRTL ? (
              <FaChevronLeft className="text-sm sm:text-base text-primary/80" />
            ) : (
              <FaChevronRight className="text-sm sm:text-base text-primary/80" />
            )}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-3 pt-1 px-1 scroll-smooth"
      >
        {members.map((person, idx) => {
          const key = `${person.id}-${person.credit_id || idx}`
          const role = isCrew ? person.job : person.character
          const photoUrl = person.profile_path
            ? getImageUrl(person.profile_path, TMDB_IMAGE_SIZES.PROFILE)
            : null

          return (
            <div
              key={key}
              className="w-28 sm:w-32 md:w-36 shrink-0 snap-start flex flex-col items-center text-center p-2 rounded-xl bg-surface border border-border/40 hover:border-primary/40 transition-all duration-200 group"
            >
              <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden bg-surface-muted mb-2 shadow-sm">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-surface-elevated text-muted/60">
                    <FaUserAlt className="text-2xl mb-1" />
                    <span className="text-[10px]">{t('media.untitled')}</span>
                  </div>
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-semibold text-foreground truncate w-full group-hover:text-primary transition-colors">
                {person.name}
              </h4>
              {role && (
                <p className="text-[11px] text-muted truncate w-full mt-0.5">
                  {role}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CastCrewRow
