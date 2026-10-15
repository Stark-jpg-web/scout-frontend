import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TrendingSpotlight from '../TrendingSpotlight.jsx'
import useStore from '../../../store/useStore.js'

// Simple mock for i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key, defaultValue) => defaultValue || key,
  }),
}))

const sampleItems = [
  {
    id: 102,
    title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen.',
    vote_average: 8.5,
    release_date: '2024-03-01',
    backdrop_path: '/backdrop102.jpg',
  },
  {
    id: 103,
    title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer.',
    vote_average: 8.9,
    release_date: '2023-07-21',
    backdrop_path: '/backdrop103.jpg',
  },
]

describe('TrendingSpotlight Component', () => {
  beforeEach(() => {
    useStore.setState({
      favorites: {},
      watchlist: {},
      ratings: {},
    })
  })

  it('renders loading skeleton when isLoading is true', () => {
    const { container } = render(
      <BrowserRouter>
        <TrendingSpotlight items={[]} isLoading={true} />
      </BrowserRouter>
    )
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders null when items array is empty and not loading', () => {
    const { container } = render(
      <BrowserRouter>
        <TrendingSpotlight items={[]} isLoading={false} />
      </BrowserRouter>
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders spotlight with correct rank starting from #1', () => {
    render(
      <BrowserRouter>
        <TrendingSpotlight items={sampleItems} isLoading={false} />
      </BrowserRouter>
    )

    // Check title of first passed item (which is #1 overall trending)
    expect(
      screen.getByRole('heading', { name: 'Dune: Part Two' })
    ).toBeInTheDocument()
    // Rank label starting from #1
    expect(screen.getByText('#1 media.trending')).toBeInTheDocument()
    // Check overview
    expect(
      screen.getByText('Paul Atreides unites with Chani and the Fremen.')
    ).toBeInTheDocument()
  })

  it('invokes onCardClick when clicking View Details button', () => {
    const handleCardClick = vi.fn()
    render(
      <BrowserRouter>
        <TrendingSpotlight
          items={sampleItems}
          isLoading={false}
          onCardClick={handleCardClick}
        />
      </BrowserRouter>
    )

    const viewDetailsButtons = screen.getAllByText('media.viewDetails')
    fireEvent.click(viewDetailsButtons[0])
    expect(handleCardClick).toHaveBeenCalledWith(sampleItems[0])
  })

  it('freezes autoplay timer when scrolled out of viewport', () => {
    vi.useFakeTimers()
    render(
      <BrowserRouter>
        <TrendingSpotlight items={sampleItems} isLoading={false} />
      </BrowserRouter>
    )

    // Initially at Dune (#1)
    expect(
      screen.getByRole('heading', { name: 'Dune: Part Two' })
    ).toBeInTheDocument()

    // Advances to slide 2 (Oppenheimer) after 5.5s
    act(() => {
      vi.advanceTimersByTime(5500)
    })
    expect(
      screen.getByRole('heading', { name: 'Oppenheimer' })
    ).toBeInTheDocument()

    // Mock scrolling past the spotlight (scrolled out of view above navbar)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      top: -800,
      bottom: 60,
      left: 0,
      right: 1000,
      width: 1000,
      height: 860,
    })

    act(() => {
      fireEvent.scroll(window)
    })

    // Advance 12 seconds while out of view
    act(() => {
      vi.advanceTimersByTime(12000)
    })

    // Must still be Oppenheimer: autoplay remained frozen while scrolled below!
    expect(
      screen.getByRole('heading', { name: 'Oppenheimer' })
    ).toBeInTheDocument()

    vi.useRealTimers()
    vi.restoreAllMocks()
  })
})
