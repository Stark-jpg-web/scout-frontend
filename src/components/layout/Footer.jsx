import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { FaFilm, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const links = {
    Discover: { to: '/', label: t('navigation.discover') },
    Search: { to: '/search', label: t('navigation.search') },
    Library: { to: '/library', label: t('navigation.library') },
    Favorites: { to: '/favorites', label: t('navigation.favorites') },
    Genres: { to: '/genres', label: t('navigation.genres') },
    About: { to: '/about', label: t('navigation.about') },
    Contact: { to: '/contact', label: t('navigation.contact') },
  }

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      {/* Luxury Glassmorphic Card Container with Rim Glow */}
      <div className="relative rounded-3xl bg-surface/60 border border-border/50 backdrop-blur-md p-6 sm:p-10 shadow-[0_0_50px_-15px_rgba(215,168,71,0.15)] overflow-hidden">
        {/* Top Rim Golden Highlight Effect */}
        <div
          aria-hidden="true"
          className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent shadow-[0_0_15px_rgba(215,168,71,0.7)] pointer-events-none"
        />

        {/* Upper Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
              aria-label={t('app.name')}
            >
              <FaFilm className="text-3xl text-primary drop-shadow-[0_0_12px_rgba(215,168,71,0.6)] group-hover:scale-105 transition-transform duration-300" />
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#f3d999] to-primary">
                FrameFinder
              </h2>
            </Link>
            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 md:ps-8 lg:ps-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary/90">
              {t('footer.quickLinks')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {Object.values(links).map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs sm:text-sm text-muted hover:text-primary transition-all duration-200 hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Glowing Golden Divider Highlight */}
        <div
          aria-hidden="true"
          className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_10px_rgba(215,168,71,0.35)]"
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          {/* Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>
              © {currentYear} FrameFinder. {t('footer.rightsReserved')}
            </span>
            <span className="opacity-40">|</span>
            <Link
              to="/terms"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {t('footer.terms')}
            </Link>
            <span className="opacity-40">•</span>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {t('footer.privacy')}
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=100009122471565"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-muted hover:text-primary hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(215,168,71,0.7)] transition-all duration-200"
            >
              <FaFacebook className="text-lg" />
            </a>
            <a
              href="https://www.instagram.com/microwavable_stark/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-muted hover:text-primary hover:scale-115 hover:drop-shadow-[0_0_8px_rgba(215,168,71,0.7)] transition-all duration-200"
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
