import { useTranslation } from 'react-i18next'

function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-3">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {t('app.name')}
      </h1>

      <p className="text-base text-muted">{t('app.tagline')}</p>
    </div>
  )
}

export default HomePage
