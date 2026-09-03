import { useState, useEffect, act } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ThemeToggle from '../ui/ThemeToggle'
import LanguageBtn from '../ui/LanguageSwitcher'
import MediaTypeSwitcher from '../ui/MediaTypeSwitcher'


function Navbar() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()


  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const navLinks = [
    { to: '/', label: t('navigation.discover'), end: true },
    { to: '/search', label: t('navigation.search') },
    {
      to: '/favorites',
      label: t('navigation.favorites'),
    },
    { to: '/library', label: t('navigation.library') },
  ]

  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-surface-elevated text-primary font-semibold'
        : 'text-muted hover:text-foreground hover:bg-surface-elevated/50'
    }`

  const getMobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-surface-muted text-primary font-semibold'
        : 'text-foreground hover:bg-surface-elevated text-muted'
    }`

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-xl font-bold me-5 tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {t('app.name')}
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex w-full items-center gap-2"
          aria-label={t('navigation.mainLabel')}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={getNavLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Section: Grouped Controls & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {/* Grouped Theme & Language & MediaType Controls */}
          <div className="hidden md:flex items-center gap-1.5 rounded-xl bg-surface-muted/50 border border-border">
            <ThemeToggle />
            <LanguageBtn />
            <MediaTypeSwitcher />
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden  "
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <span className="text-xl leading-none">✕</span>
            ) : (
              <span className="text-xl leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-border bg-surface px-4 py-5 shadow-xl transition-all duration-200"
        >
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={getMobileNavLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Grouped Controls in Mobile Menu */}
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-muted">
              {t('language.selectorLabel')}
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-muted/50 border border-border">
              <ThemeToggle />
              <LanguageBtn />
              <MediaTypeSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
