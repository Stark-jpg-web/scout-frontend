import { useTranslation } from 'react-i18next'

function SearchPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-md">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          {t('navigation.search')}
        </h1>
        <p className="mt-2 text-base text-muted">
          Search movies, actors, and genres with real-time live queries.
        </p>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-surface/50 p-12 text-center">
        <span className="text-4xl text-primary/40 block mb-3">📚</span>
        <p className="text-muted text-sm">
          Search and Discover dashboard coming in Sprint 6.
        </p>
      </div>
    </div>
  )
}

export default SearchPage
