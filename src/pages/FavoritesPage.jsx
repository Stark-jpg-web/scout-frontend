import { useTranslation } from 'react-i18next'

function FavoritesPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-md">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          {t('navigation.favorites') || t('navigation.favorite')}
        </h1>
        <p className="mt-2 text-base text-muted">
          Your saved favorite movies and cinema hall of fame.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
        <span className="text-4xl text-accent/50 block mb-3">❤️</span>
        <p className="text-muted text-sm">
          Favorites collection coming in Sprint 8.
        </p>
      </div>
    </div>
  )
}

export default FavoritesPage
